import PEPPLLogo from "../PEPPLogo";
import PPSLogo from "../PPSLogo";

interface PPSPEPPPayLogoProps {
    height?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function PPPEPPPPayLogo({ height = 100, className, style }: PPSPEPPPayLogoProps) {
    return (
        <div className={className} style={{ height: height, display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#fec805", paddingLeft: `${height / 8}px`, paddingTop: `${height / 8}px`, paddingBottom: `${height / 8}px`, ...style }}>
            <PPSLogo height={height * 0.8} />
            <div style={{ height: height, display: "flex", alignItems: "center", marginLeft: -1, paddingRight: `${height / 5}px` }} >
                <PEPPLLogo height={height * .7} />
            </div>
        </div >
    );
}