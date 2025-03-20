import "./ProgressBar.css"

const ProgressBar = ({ firstPercentage, secondPercentage }) => {
    return (
        <div className="progress-container">
            <div className="progress-bar">
                <div
                    className="progress-segment firstPercentage"
                    style={{ width: `${firstPercentage}%` }}
                ></div>
                <div
                    className="progress-segment secondPercentage"
                    style={{ width: `${secondPercentage}%` }}
                ></div>
            </div>
            
        </div>
    );
};

export default ProgressBar
