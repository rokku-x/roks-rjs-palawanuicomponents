#!/usr/bin/env python3
import sys
import re
from xml.etree import ElementTree as ET

if len(sys.argv) < 4:
    print("Usage: scale_svg.py <in.svg> <out.svg> <target_height>")
    sys.exit(2)

infile = sys.argv[1]
outfile = sys.argv[2]
target_h = float(sys.argv[3])

# Parse SVG
ET.register_namespace("", "http://www.w3.org/2000/svg")
tree = ET.parse(infile)
root = tree.getroot()

# read viewBox
vb = root.get("viewBox")
if not vb:
    print("No viewBox found")
    sys.exit(2)
minx, miny, width, height = [float(x) for x in vb.split()]
scale = target_h / height

new_w = width * scale
new_h = target_h
root.set("viewBox", f"{minx} {miny} {new_w:.6f} {new_h:.6f}")


# helper to parse translate(tx,ty)
def parse_translate(t):
    if not t:
        return 0.0, 0.0
    m = re.search(r"translate\(([^)]+)\)", t)
    if not m:
        return 0.0, 0.0
    parts = m.group(1).replace(",", " ").split()
    if len(parts) == 1:
        tx = float(parts[0])
        ty = 0.0
    else:
        tx = float(parts[0])
        ty = float(parts[1])
    return tx, ty


# helper to scale path d
num_re = re.compile(r"[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?")
cmd_re = re.compile(r"([a-zA-Z])")

for elem in root.iter():
    # if element has transform, parse translate and remove later
    t = elem.get("transform")
    tx, ty = parse_translate(t)

    d = elem.get("d")
    if d:
        # We'll tokenize by commands, keep commands
        parts = cmd_re.split(d)
        out_parts = []
        cur_cmd = None
        for part in parts:
            if not part:
                continue
            if len(part) == 1 and part.isalpha():
                cur_cmd = part
                out_parts.append(part)
            else:
                # replace all numbers in this part by scaled numbers
                nums = num_re.findall(part)
                if not nums:
                    out_parts.append(part)
                    continue
                # We'll replace numbers in order: pair them as x,y
                new_part = part
                # iterate matches from end to start to not affect indices
                matches = list(num_re.finditer(part))
                # collect numeric values
                vals = [float(m.group(0)) for m in matches]
                # transform pairs
                new_vals = []
                i = 0
                # Many commands here are absolute X,Y pairs (M,L). We'll assume numbers come in pairs.
                while i < len(vals):
                    x = vals[i]
                    if i + 1 < len(vals):
                        y = vals[i + 1]
                        x2 = (x + tx) * scale
                        y2 = (y + ty) * scale
                        new_vals.extend([x2, y2])
                        i += 2
                    else:
                        # single coordinate (e.g., horizontal/vertical) - scale and also add tx/ty as appropriate
                        v = vals[i]
                        # heuristics: if command is H (horizontal) or h -> x only
                        if cur_cmd in ("H", "h"):
                            x2 = (v + tx) * scale
                            new_vals.append(x2)
                        elif cur_cmd in ("V", "v"):
                            y2 = (v + ty) * scale
                            new_vals.append(y2)
                        else:
                            # fallback: treat as x
                            x2 = (v + tx) * scale
                            new_vals.append(x2)
                        i += 1
                # now replace matches with formatted new_vals
                # build new_part by iterating through matches
                new_part_out = ""
                last_idx = 0
                for m, nv in zip(matches, new_vals):
                    new_part_out += part[last_idx : m.start()]
                    # format nv with up to 3 decimal places, strip trailing zeros
                    s = f"{nv:.3f}".rstrip("0").rstrip(".")
                    new_part_out += s
                    last_idx = m.end()
                new_part_out += part[last_idx:]
                out_parts.append(new_part_out)
        new_d = "".join(out_parts)
        elem.set("d", new_d)
        # remove transform
        if t:
            elem.attrib.pop("transform", None)

# Also remove transform from elements that have it but no d (e.g., groups)
for elem in root.iter():
    if "transform" in elem.attrib:
        elem.attrib.pop("transform")

# Write out the new SVG
ET.indent(tree, space="    ")
with open(outfile, "w", encoding="utf-8") as f:
    tree.write(f, encoding="unicode", xml_declaration=True)

print("Wrote", outfile)
