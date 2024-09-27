import "./index.css";
const ProgressSteps = ({ completedPercentage = [0, 0, 0] }) => {
  return (
    <div className="progress-container">
      {completedPercentage?.map((percentage, index) => (
        <div className="progress-bar" key={index}>
          <div
            className="progress-completed"
            style={{ width: `${percentage}%` }}
          />
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
