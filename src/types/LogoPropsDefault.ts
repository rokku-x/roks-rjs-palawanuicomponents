import LogoVariant from "./LogoVariant";

export default interface LogoProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    variant?: LogoVariant;
    width?: number | string;
    height?: number | string;
}