"use client";
import "./index.css";
import type React from "react";

export default function PalawanLoading({ size, isGreen, speed, glow = true, hasShadow = false, stopSpin = false }: { size?: string | number, isGreen?: boolean, speed?: number, glow?: boolean, hasShadow?: boolean, stopSpin?: boolean }) {

    const svgClass = `${glow ? "has-glow" : ""} ${hasShadow ? "has-shadow" : ""} ${stopSpin ? "stop-spin" : ""} ${isGreen ? "pgc-green" : "pgc-gold"}`;
    const mainRingClass = `pgc-main-ring ${stopSpin ? "" : "rot-mid"}`;
    const ringsBClass = `pgc-ring-b ${stopSpin ? "" : "rot-slow"}`;
    const ringsAClass = `pgc-ring-a ${stopSpin ? "" : "rot-fast"}`;
    const starPathsClass = `pgc-star-paths ${stopSpin ? "" : "rot-mid"}`;

    return (
        <div className="pgc-loading-container" style={{ maxWidth: size, width: "100%", "--pgc-speed-multiplier": speed ? speed : 1 } as React.CSSProperties}>
            <svg className={svgClass} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                preserveAspectRatio="xMidYMid meet" style={{ overflow: "visible" }}>
                <defs>
                    <clipPath id="clipInner">
                        <circle cx="200.00" cy="200.00" r="175" />
                    </clipPath>

                    <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4.5" result="b" />
                        <feComposite in="b" in2="SourceGraphic" operator="over" />
                    </filter>

                    <filter id="insetShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
                        <feOffset in="blur" dx="0" dy="1.5" result="off" />
                        <feComposite in="off" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="inner" />
                        <feColorMatrix in="inner" type="matrix" values="0 0 0 0 0.0  0 0 0 0 0.0  0 0 0 0 0.0  0 0 0 0.6" />
                        <feMerge>
                            <feMergeNode in="inner" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

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

                <g clip-path="url(#clipInner)" id="clipGroup" className="breath">
                    <g id="ringsA" className={ringsAClass}>
                        <circle cx="200.00" cy="-40.38" r="166.86" stroke="url(#gradientWarm)" stroke-width="16.34" fill="none" />
                        <circle cx="200.00" cy="440.38" r="166.86" stroke="url(#gradientWarm)" stroke-width="16.34" fill="none" />
                        <g transform="rotate(45 200.00 200.00)" opacity=".5">
                            <circle cx="200.00" cy="-40.38" r="166.86" stroke="url(#gradientWarm)" stroke-width="16.34" fill="none" />
                            <circle cx="200.00" cy="440.38" r="166.86" stroke="url(#gradientSoft)" stroke-width="16.34" fill="none" />
                        </g>

                    </g>

                    <g id="starPaths" className={starPathsClass} transform="rotate(22.5 200.00 200.00)" fill="none" stroke="url(#goldGradStar)" stroke-width="16.34"
                        stroke-linejoin="round" stroke-linecap="round">
                        <path className="star-seg" pathLength="1000" d="M200.000,33.159 L247.018,84.341 L317.078,81.988" />
                        <path className="star-seg" pathLength="1000" d="M317.078,81.988 L314.664,151.050 L366.027,200.000" />
                        <path className="star-seg" pathLength="1000" d="M366.027,200.000 L314.664,248.950 L317.078,317.912" />
                        <path className="star-seg" pathLength="1000" d="M317.078,317.912 L247.018,315.559 L200.000,366.841" />
                        <path className="star-seg" pathLength="1000" d="M200.000,366.841 L152.982,315.559 L82.922,317.912" />
                        <path className="star-seg" pathLength="1000" d="M82.922,317.912 L85.336,248.950 L33.973,200.000" />
                        <path className="star-seg" pathLength="1000" d="M33.973,200.000 L85.336,151.050 L82.922,81.988" />
                        <path className="star-seg" pathLength="1000" d="M82.922,81.988 L152.982,84.341 L200.000,33.159" />
                    </g>

                    <g id="ringsB" className={ringsBClass}>
                        <circle cx="-40.38" cy="200.00" r="166.86" stroke="url(#gradientSoft)" stroke-width="16.34" fill="none" />
                        <circle cx="440.38" cy="200.00" r="166.86" stroke="url(#gradientSoft)" stroke-width="16.34" fill="none" />
                        <g transform="rotate(45 200.00 200.00)" opacity=".5">
                            <circle cx="-40.38" cy="200.00" r="166.86" stroke="url(#gradientSoft)" stroke-width="16.34" fill="none" />
                            <circle cx="440.38" cy="200.00" r="166.86" stroke="url(#gradientWarm)" stroke-width="16.34" fill="none" />
                        </g>
                    </g>
                </g>
                <circle id="mainRing" cx="200.00" cy="200.00" r="185" stroke="url(#gradientWarm)" stroke-width="32.67" fill="none" className={mainRingClass} />
            </svg>
        </div>
    )
}