import "./index.css";
import type React from "react";

function PalawanCircle({ cx, cy, r, strokeWidth, stroke, fill = "none" }: { cx: number, cy: number, r: number, strokeWidth: number, stroke: string, fill?: string }) {
    return (
        <circle cx={cx} cy={cy} r={r} stroke={stroke} strokeWidth={strokeWidth} fill={fill} />
    );
}

function PalawanCirclePath({ d, strokeWidth, stroke, fill = "none" }: { d: string, strokeWidth: number, stroke: string, fill?: string }) {
    return (
        <path className="star-seg" pathLength="1000" d={d} stroke={stroke} strokeWidth={strokeWidth} fill={fill} />
    );
}

function PalawanStarPath({ d, strokeWidth, stroke, fill = "none" }: { d: string, strokeWidth: number, stroke: string, fill?: string }) {
    return (
        <path className="star-seg" pathLength="1000" d={d} stroke={stroke} strokeWidth={strokeWidth} fill={fill} strokeLinejoin="round" strokeLinecap="round" />
    );
}

const ringA = [
    { cx: 200.00, cy: -40.38, r: 166.86, strokeWidth: 16.34, stroke: "url(#gradientWarm)" },
    { cx: 200.00, cy: 440.38, r: 166.86, strokeWidth: 16.34, stroke: "url(#gradientWarm)" }
]

const ringAA = [
    { cx: 200.00, cy: -40.38, r: 166.86, strokeWidth: 16.34, stroke: "url(#gradientWarm)" },
    { cx: 200.00, cy: 440.38, r: 166.86, strokeWidth: 16.34, stroke: "url(#gradientSoft)" }
]

const ringB = [
    { cx: -40.38, cy: 200.00, r: 166.86, strokeWidth: 16.34, stroke: "url(#gradientSoft)" },
    { cx: 440.38, cy: 200.00, r: 166.86, strokeWidth: 16.34, stroke: "url(#gradientSoft)" }
];

const ringBA = [
    { cx: -40.38, cy: 200.00, r: 166.86, strokeWidth: 16.34, stroke: "url(#gradientSoft)" },
    { cx: 440.38, cy: 200.00, r: 166.86, strokeWidth: 16.34, stroke: "url(#gradientWarm)" }
];

const ringPathAA = [
    { d: "M 76.49, 328.14 A 166.86, 166.86 0 0 1 323.51, 328.14", strokeWidth: 16.34, stroke: "url(#gradientWarm)" },
    { d: "M 323.51, 71.86 A 166.86, 166.86 0 0 1 76.49, 71.86", strokeWidth: 16.34, stroke: "url(#gradientWarm)" }
];

const ringPathAB = [
    { d: "M 76.49, 328.14 A 166.86, 166.86 0 0 1 323.51, 328.14", strokeWidth: 16.34, stroke: "url(#gradientSoft)" },
    { d: "M 323.51, 71.86 A 166.86, 166.86 0 0 1 76.49, 71.86", strokeWidth: 16.34, stroke: "url(#gradientWarm)" }
];

const ringPathBA = [
    { d: "M 76.49, 328.14 A 166.86, 166.86 0 0 1 323.51, 328.14", strokeWidth: 16.34, stroke: "url(#gradientWarm)" },
    { d: "M 323.51, 71.86 A 166.86, 166.86 0 0 1 76.49, 71.86", strokeWidth: 16.34, stroke: "url(#gradientSoft)" }
];

const ringPathBB = [
    { d: "M 76.49, 328.14 A 166.86, 166.86 0 0 1 323.51, 328.14", strokeWidth: 16.34, stroke: "url(#gradientSoft)" },
    { d: "M 323.51, 71.86 A 166.86, 166.86 0 0 1 76.49, 71.86", strokeWidth: 16.34, stroke: "url(#gradientSoft)" }
];

const starPaths = [
    { d: "M200.000,33.159 L247.018,84.341 L317.078,81.988", strokeWidth: 16.34, stroke: "url(#goldGradStar)" },
    { d: "M317.078,81.988 L314.664,151.050 L366.027,200.000", strokeWidth: 16.34, stroke: "url(#goldGradStar)" },
    { d: "M366.027,200.000 L314.664,248.950 L317.078,317.912", strokeWidth: 16.34, stroke: "url(#goldGradStar)" },
    { d: "M317.078,317.912 L247.018,315.559 L200.000,366.841", strokeWidth: 16.34, stroke: "url(#goldGradStar)" },
    { d: "M200.000,366.841 L152.982,315.559 L82.922,317.912", strokeWidth: 16.34, stroke: "url(#goldGradStar)" },
    { d: "M82.922,317.912 L85.336,248.950 L33.973,200.000", strokeWidth: 16.34, stroke: "url(#goldGradStar)" },
    { d: "M33.973,200.000 L85.336,151.050 L82.922,81.988", strokeWidth: 16.34, stroke: "url(#goldGradStar)" },
    { d: "M82.922,81.988 L152.982,84.341 L200.000,33.159", strokeWidth: 16.34, stroke: "url(#goldGradStar)" }
];

export default function PalawanLoading({ className, style, size = 100, isGreen = false, speed = 1, hasGlow = true, hasShadow = true, stopSpin = false, stopStarAnim = false, useRawCircleElements = false }: {
    style?: React.CSSProperties, className?: string, size?: string | number, isGreen?: boolean, speed?: number, hasGlow?: boolean, hasShadow?: boolean, stopSpin?: boolean, stopStarAnim?: boolean, useRawCircleElements?: boolean
}) {

    const svgClass = `${hasGlow ? "has-glow" : ""} ${hasShadow ? "has-shadow" : ""} ${stopSpin ? "stop-spin" : ""} ${isGreen ? "pgc-green" : "pgc-gold"}`;
    const mainRingClass = `pgc-main-ring ${stopSpin ? "" : "rot-mid"}`;
    const ringsBClass = `pgc-ring-b ${stopSpin ? "" : "rot-slow"}`;
    const ringsAClass = `pgc-ring-a ${stopSpin ? "" : "rot-fast"}`;
    const starPathsClass = `pgc-star-paths ${stopSpin ? "" : "rot-mid"} ${stopStarAnim ? "" : "star-seg-anim"}`;

    return (
        <div className={`pgc-loading-container ${className ? className : ""}`} style={{ minWidth: size, maxWidth: size, width: "100%", "--pgc-speed-multiplier": speed ? speed : 1, ...style } as React.CSSProperties}>
            <svg className={svgClass} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                preserveAspectRatio="xMidYMid meet" style={{ overflow: "visible" }}>
                <defs>
                    {useRawCircleElements && <clipPath id="clipInner"><circle cx="200.00" cy="200.00" r="175" /></clipPath>}
                    <linearGradient id="goldGradStar" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={"rgb(var(--pgc-bright-rgb))"} />
                        <stop offset="45%" stopColor={`rgb(var(--pgc-base-rgb))`} />
                        <stop offset="75%" stopColor={`rgb(var(--pgc-warm-rgb))`} />
                        <stop offset="100%" stopColor={`rgb(var(--pgc-bright-rgb))`} />
                    </linearGradient>
                    <linearGradient id="gradientWarm" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={`rgb(var(--pgc-base-rgb))`} />
                        <stop offset="100%" stopColor={`rgb(var(--pgc-warm-rgb))`} />
                    </linearGradient>

                    <linearGradient id="gradientSoft" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={`rgb(var(--pgc-soft-rgb))`} />
                        <stop offset="100%" stopColor={`rgb(var(--pgc-base-rgb))`} />
                    </linearGradient>

                </defs>

                <g clipPath="url(#clipInner)" id="clipGroup" className="breath">
                    <g id="ringsA" className={ringsAClass}>
                        {useRawCircleElements && ringA.map((ring, index) => <PalawanCircle key={index} {...ring} />)}
                        {useRawCircleElements && <g transform="rotate(45 200.00 200.00)" opacity=".5">{ringAA.map((ring, index) => <PalawanCircle key={index} {...ring} />)}</g>}
                        {!useRawCircleElements && <g >{ringPathAA.map((ring, index) => <PalawanCirclePath key={index} {...ring} />)}</g >}
                        {!useRawCircleElements && <g transform="rotate(45 200.00 200.00)" opacity=".5">{ringPathAB.map((ring, index) => <PalawanCirclePath key={index} {...ring} />)}</g>}
                    </g>

                    <g id="starPaths" className={starPathsClass} transform="rotate(22.5 200.00 200.00)" fill="none" stroke="url(#goldGradStar)" strokeWidth="16.34"
                        strokeLinejoin="round" strokeLinecap="round">
                        {starPaths.map((path, index) => <PalawanStarPath key={index} {...path} />)}
                    </g>

                    <g id="ringsB" className={ringsBClass}>
                        {useRawCircleElements && ringB.map((ring, index) => <PalawanCircle key={index} {...ring} />)}
                        {useRawCircleElements && <g transform="rotate(45 200.00 200.00)">{ringBA.map((ring, index) => <PalawanCircle key={index} {...ring} />)}</g>}
                        {!useRawCircleElements && <g transform="rotate(90 200.00 200.00)" >{ringPathBA.map((ring, index) => <PalawanCirclePath key={index} {...ring} />)}</g >}
                        {!useRawCircleElements && <g transform="rotate(135 200.00 200.00)" opacity=".5">{ringPathBA.map((ring, index) => <PalawanCirclePath key={index} {...ring} />)}</g>}
                    </g>
                </g>
                <circle id="mainRing" cx="200.00" cy="200.00" r="185" stroke="url(#gradientWarm)" strokeWidth="32.67" fill="none" className={mainRingClass} />
            </svg>
        </div>
    )
}