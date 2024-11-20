import React from "react";
import { Link } from "react-router-dom";
import { useProgress } from "../../../context/ProgressContext"; // Import the context
import "../../../styles/progresstracker.css"; // Import the CSS for additional styling

const ProgressTracker = ({ stepNames }) => {
  const { currentStep } = useProgress(); // Get the current step from context

  // Define the steps with associated paths
  const stepsWithPaths = [
    { path: "/subscription", step: 1 },
    { path: "/options/cuisine#cuisine", step: 2 },
    { path: "/options/cuisine#spice-level", step: 3 },
    { path: "/options/cuisine#chutney", step: 4 },
    { path: "/pizzas/salads", step: 5 },
    { path: "/pizzas/starters", step: 6 },
    { path: "/pizzas/rice-dishes", step: 7 },
    { path: "/pizzas/curries", step: 8 },
    { path: "/pizzas/desserts", step: 9 },
    { path: "/notes", step: 10 },
    { path: "/summary", step: 11 },
  ];

  return (
    <div className="stepper-wrapper">
      {stepsWithPaths.map(({ path, step }, index) => {
        const isActive = currentStep === step;
        const isCompleted = currentStep > step;

        return (
          <div
            key={step}
            className={`stepper-item ${isCompleted ? "completed" : ""} ${
              isActive ? "active" : ""
            }`}
          >
            <Link to={path} className="step-counter">
              {step}
            </Link>
            <div className="step-name">{stepNames[step - 1]}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressTracker;
