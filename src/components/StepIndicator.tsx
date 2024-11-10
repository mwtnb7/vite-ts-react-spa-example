import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className='c-forms__step'>
      <div className='c-forms__step-label'>
        <span>STEP</span>
        <span className='is-num'>{String(currentStep).padStart(2, '0')}</span>
      </div>
      <div className='c-forms__step-progress'>
        {Array.from({ length: totalSteps }, (_, index) => (
          <span
            key={index}
            className={`c-forms__step-progress-dot ${
              index < currentStep ? 'is-active' : ''
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
