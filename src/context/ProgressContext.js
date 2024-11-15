import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const location = useLocation();

  // State to keep track of the current step
  const [currentStep, setCurrentStep] = useState(1);

  // Define the steps with associated paths, adjusting for `Pizzas` steps
    const stepsWithPaths = [
      { path: "/book-event", step: 1 },
    { path: "/subscription", step: 2 },
    { path: "/options/cuisine", step: 3 },
    { path: "/options/spice-level", step: 4 },
    { path: "/options/chutney", step: 5 },
    { path: "/pizzas/salads", step: 6 },       // Pizzas side steps begin here
    { path: "/pizzas/starters", step: 7 },
    { path: "/pizzas/rice-dishes", step: 8 },
    { path: "/pizzas/curries", step: 9 },
    { path: "/pizzas/desserts", step: 10 },
    // { path: "/pizzas/extra-note", step: 11 },
    { path: "/summary", step: 11 }
  ];

  // Function to update the current step manually or based on the route
  const updateCurrentStep = (step) => {
    if (step >= 1 && step <= stepsWithPaths.length) {
      setCurrentStep(step);
    }
  };

  // Update current step automatically based on the route path
  useEffect(() => {
    const matchingStep = stepsWithPaths.find((step) => step.path === location.pathname);
    if (matchingStep) {
      setCurrentStep(matchingStep.step);
    }
  }, [location]);

  return (
    <ProgressContext.Provider value={{ currentStep, setCurrentStep: updateCurrentStep }}>
      {children}
    </ProgressContext.Provider>
  );
};
