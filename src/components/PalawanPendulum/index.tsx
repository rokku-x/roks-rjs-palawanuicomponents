import PalawanLoading from "../PalawanLoading";
import "./index.css";
export default function PalawanPendulum(props?: React.ComponentProps<typeof PalawanLoading>) {
    return (
        <div className="pendulum-wrapper">

            <div className="pendulum-hanger">
                <div className="pendulum-arm left" />
                <div className="pendulum-arm center" />
                <div className="pendulum-arm right" />
                <div className="pendulum-bob">
                    <PalawanLoading {...props} />
                </div>
            </div>
        </div>
    );
} 