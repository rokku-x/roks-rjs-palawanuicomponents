#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Minimal CLI parsing
const argv = process.argv.slice(2);
if (argv.length === 0) {
    console.error('Usage: node scripts/render-logo.js <ComponentName> [--out output.png] [--height 1000] [--prop key=value] [--props "{...}"]');
    console.error('If no --out provided, output files will be placed in `./logoOutput/` in the current working directory.');
    process.exit(1);
}

const componentName = argv[0];
let out = null;
let height = null;
let width = null;
let props = {};
let svgOut = null;
let writeSvg = false;

for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out' || a === '-o') {
        out = argv[++i];
        continue;
    }
    if (a === '--height') {
        height = parseInt(argv[++i], 10);
        continue;
    }
    if (a === '--width') {
        width = parseInt(argv[++i], 10);
        continue;
    }
    if (a === '--props') {
        try {
            const raw = argv[++i];
            props = JSON.parse(raw);
        } catch (err) {
            console.error('Failed to parse --props JSON', err);
            process.exit(1);
        }
        continue;
    }
    if (a === '--prop') {
        const kv = argv[++i];
        const eq = kv.indexOf('=');
        if (eq === -1) continue;
        const k = kv.slice(0, eq);
        let v = kv.slice(eq + 1);
        // try to coerce numbers and booleans
        if (/^\d+$/.test(v)) v = parseInt(v, 10);
        else if (v === 'true') v = true;
        else if (v === 'false') v = false;
        props[k] = v;
        continue;
    }
    if (a === '--svg-out') {
        svgOut = argv[++i];
        continue;
    }
    if (a === '--write-svg') {
        writeSvg = true;
        continue;
    }
}

// If height/width were provided, put them into props (component often uses `height` prop)
if (height !== null) props.height = height;
if (width !== null) props.width = width;

// Default output path -> use ./logoOutput in cwd
const DEFAULT_DIR = path.join(process.cwd(), 'logoOutput');
// Default output path
if (!out) {
    out = path.join(DEFAULT_DIR, `${componentName}.png`);
}

// Ensure output dir exists
fs.mkdirSync(path.dirname(out), { recursive: true });

// If svgOut requested and not absolute, resolve relative to cwd
if (svgOut && !path.isAbsolute(svgOut)) svgOut = path.join(process.cwd(), svgOut);

// If writeSvg is true and svgOut not provided, derive from out by replacing extension with .svg
if (writeSvg && !svgOut) {
    const parsed = path.parse(out);
    svgOut = path.join(parsed.dir, `${parsed.name}.svg`);
}

// Ensure svgOut dir exists if requested
if (svgOut) fs.mkdirSync(path.dirname(svgOut), { recursive: true });

// Register esbuild to allow require() of TSX
require('esbuild-register/dist/node').register({
    // Use default settings; this will transpile TSX/TS on the fly
});

const React = require('react');
const ReactDOMServer = require('react-dom/server');

const compPath = path.join(process.cwd(), 'src', 'components', componentName, 'index.tsx');
if (!fs.existsSync(compPath)) {
    console.error('Component file not found:', compPath);
    process.exit(1);
}

let mod;
try {
    mod = require(compPath);
} catch (err) {
    console.error('Failed to require component:', err);
    process.exit(1);
}

const Comp = (mod && (mod.default || mod)) || mod;
if (!Comp) {
    console.error('Component default export not found in', compPath);
    process.exit(1);
}

// Render to static markup
let svgString;
try {
    const element = React.createElement(Comp, props);
    svgString = ReactDOMServer.renderToStaticMarkup(element);
    // Ensure xml header and xmlns present
    if (!svgString.trim().startsWith('<svg')) {
        // If the component returned React fragment or wrapper, try to extract svg
        const m = svgString.match(/<svg[\s\S]*<\/svg>/);
        if (m) svgString = m[0];
    }
    if (!svgString.includes('xmlns=') && svgString.startsWith('<svg')) {
        svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    svgString = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgString;
} catch (err) {
    console.error('Failed to render component to SVG:', err);
    process.exit(1);
}

// Use sharp to rasterize
(async () => {
    // If svgOut requested, write the SVG string to disk
    if (svgOut) {
        try {
            await fs.promises.writeFile(svgOut, svgString, 'utf8');
            console.log('Wrote', svgOut);
        } catch (err) {
            console.error('Failed to write SVG file:', err);
            process.exit(1);
        }
    }

    try {
        // If the output requested is an SVG (out ends with .svg) and no PNG is desired, skip rasterize
        const outExt = path.extname(out || '').toLowerCase();
        if (outExt === '.svg') {
            // write svg to out
            await fs.promises.writeFile(out, svgString, 'utf8');
            console.log('Wrote', out);
            return;
        }

        let img = sharp(Buffer.from(svgString));
        if (height || width) {
            img = img.resize(width || null, height || null, { fit: 'contain' });
        }
        await img.png({ quality: 100 }).toFile(out);
        console.log('Wrote', out);
    } catch (err) {
        console.error('Failed to rasterize SVG to PNG:', err);
        process.exit(1);
    }
})();
