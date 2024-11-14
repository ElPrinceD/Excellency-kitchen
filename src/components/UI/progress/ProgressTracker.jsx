import React from "react";
import "../../../styles/progresstracker.css"; // Import the CSS for additional styling

const ProgressTracker = ({ currentStep, totalSteps, stepNames }) => {
    const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

    return (
        <div className="stepper-wrapper">
            {steps.map((step, index) => {
                const isActive = currentStep === step;
                const isCompleted = currentStep > step;

                return (
                    <div
                        key={step}
                        className={`stepper-item ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
                    >
                        <div className="step-counter">{step}</div>
                        <div className="step-name">{stepNames[step - 1]}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProgressTracker;
