import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import PalawanLoading from './components/PalawanLoading'
import PPayText from './components/PPayText';
import PPPEPPPPayLogo from './components/PPSPEPPPPayLogo';

function App() {

    const [size, setSize] = useState<number>(100);
    const [isGreen, setIsGreen] = useState<boolean>(false);
    const [speed, setSpeed] = useState<number>(1);
    const [glow, setGlow] = useState<boolean>(true);
    const [shadow, setShadow] = useState<boolean>(true);
    const [spin, setSpin] = useState<boolean>(true);
    const [starAnim, setStarAnim] = useState<boolean>(true);
    const [useRawCircleElements, setUseRawCircleElements] = useState<boolean>(false);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 font-sans px-4">
            <div className="mt-8">
                <div className="w-full max-w-xl flex flex-col gap-3">
                    <label className="flex items-center justify-between text-sm text-zinc-700">
                        <span>Circle size</span>
                        <span className="font-mono text-zinc-500">{size}px</span>
                    </label>
                    <input
                        type="range"
                        min={10}
                        max={2000}
                        step={10}
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        className="w-full cursor-pointer"
                    />
                    <label className="mt-4 flex items-center justify-between text-sm text-zinc-700">
                        <span>Animation speed</span>
                        <span className="font-mono text-zinc-500">{speed.toFixed(1)}×</span>
                    </label>
                    <input
                        type="range"
                        min={0.2}
                        max={3}
                        step={0.1}
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="w-full cursor-pointer"
                    />
                </div>
                <div className="flex gap-3 flex-wrap mt-6 justify-center max-w-xl">
                    <button
                        type="button"
                        onClick={() => setIsGreen((prev) => !prev)}
                        className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                        Toggle color: <span className="font-mono ml-1">{isGreen ? "Green" : "Gold"}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setGlow((prev) => !prev)}
                        className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                        Glow: <span className="font-mono ml-1">{glow ? "On" : "Off"}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setShadow((prev) => !prev)}
                        className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                        Shadow: <span className="font-mono ml-1">{shadow ? "On" : "Off"}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setSpin((prev) => !prev)}
                        className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                        Spin: <span className="font-mono ml-1">{spin ? "On" : "Off"}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setStarAnim((prev) => !prev)}
                        className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                        Star Animation: <span className="font-mono ml-1">{starAnim ? "On" : "Off"}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setUseRawCircleElements((prev) => !prev)}
                        className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                        Use Raw Circle Elements: <span className="font-mono ml-1">{useRawCircleElements ? "On" : "Off"}</span>
                    </button>
                </div>

            </div>

            <div className="mt-8">
                <PalawanLoading size={size} isGreen={isGreen} speed={speed} hasGlow={glow} hasShadow={shadow} stopSpin={!spin} stopStarAnim={!starAnim} useRawCircleElements={useRawCircleElements} />
            </div>
            <div className="mt-8">
                <PPPEPPPPayLogo height={size} />
            </div>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* <LoadingProvider wrapperStyle={{ backdropFilter: 'blur(3px)' }} animationType={AnimationType.Spin} animationDuration={1} > */}
        <App />
        {/* </LoadingProvider> */}
    </React.StrictMode>,
)