import React, { useEffect, useState, useRef } from "react";
import { FaCheck } from "react-icons/fa";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const [isMobile, setIsMobile] = useState(false); // Tracks whether the user is on mobile
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;

    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          Highlighted: true,
          selected: true,
          completed: true,
        };
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          Highlighted: false,
          selected: true,
          completed: true,
        };
      } else {
        newSteps[count] = {
          ...newSteps[count],
          Highlighted: false,
          selected: false,
          completed: false,
        };
      }
      count++;
    }
    return newSteps;
  };

  // Check window width to toggle between mobile and desktop views
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Set breakpoint for mobile (768px)
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Trigger on initial render
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const stepState = steps.map((step, index) => ({
      description: step,
      completed: false,
      Highlighted: index === 0,
      selected: index === 0,
    }));

    stepRef.current = stepState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => (
    <div
      key={index}
      className={index !== newStep.length - 1 ? "w-full flex items-center" : "flex items-center"}
    >
      <div className="relative flex flex-col items-center text-teal-600">
        <div
          className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-6 w-6 flex items-center justify-center text-center ${
            step.selected ? " bg-primary text-white font-bold border border-primary" : " "
          }`}
        >
          {step.completed ? (
            <span className="text-white font-bold text-xl flex justify-center items-center text-[10px]">
              <FaCheck color="#fff" size={10} />
            </span>
          ) : (
            <p className="text-[10px]">{index + 1}</p>
          )}
        </div>
        {!isMobile && (
          <div
            className={`absolute top-0 text-center mt-8 text-xs font-semibold uppercase ${
              step.Highlighted ? " text-primary" : " text-gray-400"
            }`}
          >
            {step.description}
          </div>
        )}
      </div>
      <div
        className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
          step.completed ? " border-primary" : " border-gray-300"
        }`}
      ></div>
    </div>
  ));

  return (
    <div className="mx-4 p-4 flex flex-col justify-between items-center">
      {isMobile ? (
        <div className="flex items-center text-gray-600">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <span
                className={`font-bold ${
                  currentStep === index + 1 ? "text-primary" : "text-gray-600"
                }`}
              >
                {index + 1}
              </span>
              {index !== steps.length - 1 && <span className="mx-2">-</span>}
            </React.Fragment>
          ))}
          <span className="ml-2 text-sm"></span>
        </div>
      ) : (
        <div className="flex justify-between items-center w-full">{displaySteps}</div>
      )}

      {/* Show the label of the selected step in mobile view */}
      {isMobile && (
        <div className="mt-4 text-center text-sm text-gray-700">
          <div className="font-semibold text-primary">
            Step {currentStep}: {steps[currentStep - 1]}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stepper;
