import PalawanPayLogo from "../PalawanPayLogo";
import PEPPLLogo from "../PEPPLogo";
import PPayText from "../PPayText";
import PPSLogo from "../PPSLogo";

interface PPSPEPPPayLogoProps {
    height?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function PPSPEPPLogo({ height = 100, className, style }: PPSPEPPPayLogoProps) {
    return (
        <div className={className} style={{ height: height, display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#fec805", paddingLeft: `${height / 8}px`, paddingTop: `${height / 8}px`, paddingBottom: `${height / 8}px`, ...style }}>
            <PPSLogo height={height * 0.8} />
            <div style={{ height: height, display: "flex", alignItems: "center", marginLeft: -1, paddingRight: `${height / 5}px` }} >
                <PEPPLLogo height={height * .7} />
            </div>
            <div className="bg-green-900 flex flex-col justify-center align-items-center" style={{ height: height, width: height }}>
                <div className="flex flex-col justify-center align-items-center" style={{ borderRadius: height / 10, width: height / 2, height: height / 2, backgroundColor: "#fff", alignSelf: "center", marginBottom: height / 10 }} >
                    <PalawanPayLogo height={"60%"} />
                </div>
                <PPayText height={height * 0.12} fillColor="#FEC905" />
            </div>
        </div >
    );
}