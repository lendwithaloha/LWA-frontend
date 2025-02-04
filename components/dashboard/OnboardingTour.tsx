import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setCurrentStep, setShowTour, setHasCompletedTour } from '@/store/onboarding/OnboardingSlice';

interface TourStep {
  target: string;
  content: string;
  position: 'top' | 'right' | 'bottom' | 'left';
  name: string;
}

const tourSteps: TourStep[] = [
  { target: '[data-tour="dashboard"]', content: 'This is your home base, where you can get a quick overview of your loan applications, key updates, and tasks. Navigate here anytime to stay informed.', position: 'right', name: 'Dashboard' },
  { target: '[data-tour="loans"]', content: 'In the Loan Requests section, you can view all your submitted loan applications, track the progress of new applications, and see details of each request. Separate tabs show active and closed loans.', position: 'right', name: 'Loans' },
  { target: '[data-tour="borrower-profile"]', content: 'Access your profile, team, and real estate schedule.', position: 'right', name: 'Borrower Profile' },
  { target: '[data-tour="broker-application"]', content: 'Apply as a broker.', position: 'right', name: 'Broker Application' },
  { target: '[data-tour="settings"]', content: 'Manage your account settings.', position: 'right', name: 'Settings' },
  { target: '[data-tour="membership"]', content: 'View your membership details.', position: 'right', name: 'Membership' },
  { target: '[data-tour="refer"]', content: 'Refer a friend to our platform.', position: 'right', name: 'Refer' },
];

const OnboardingTour: React.FC = () => {
  const dispatch = useDispatch();
  const { showTour, currentStep } = useSelector((state: RootState) => state.onboarding);

  useEffect(() => {
    if (!showTour || currentStep >= tourSteps.length) return;
    // Highlight the current step
    const currentElement = document.querySelector(tourSteps[currentStep]?.target);

    if (currentElement) {
      currentElement.classList.add('onboarding-highlight');
    }

    // Cleanup previous highlights
    return () => {
      const allElements = document.querySelectorAll('.onboarding-highlight');
      allElements.forEach((element) =>
        element.classList.remove('onboarding-highlight')
      );
    };
  }, [currentStep,showTour]);


  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      dispatch(setCurrentStep(currentStep + 1));
    } else {
      // Cleanup highlight styles
      const allElements = document.querySelectorAll('.onboarding-highlight');
      allElements.forEach((element) =>
        element.classList.remove('onboarding-highlight')
      );
  
      // End the tour
      dispatch(setShowTour(false));
      dispatch(setHasCompletedTour(true));
    }
  };
  
  const handleSkip = () => {
    // Cleanup highlight styles
    const allElements = document.querySelectorAll('.onboarding-highlight');
    allElements.forEach((element) =>
      element.classList.remove('onboarding-highlight')
    );
  
    // End the tour
    dispatch(setShowTour(false));
    dispatch(setHasCompletedTour(true));
  };
  

  const handlePrev = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };



  if (!showTour) return null;

  const currentTourStep = tourSteps[currentStep];

  const currentElement = document.querySelector(currentTourStep?.target);

  const boundingRect = currentElement?.getBoundingClientRect();

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div
        className="absolute pointer-events-auto bg-white p-6 rounded-lg shadow-xl min-w-[448px] max-w-md border border-gray-200 space-y-4"
        style={{
          left: boundingRect ? `${boundingRect.right + 16}px` : '50%',
          top: boundingRect ? `${boundingRect.top}px` : '50%',
          transform: boundingRect ? 'translateY(0)' : 'translate(-50%, -50%)',
        }}
      >
        <button
          onClick={handleSkip}
          className="absolute top-2 right-2 text-3xl text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          &times;
        </button>


        <h3 className="text-md  text-gray-800">{`${currentTourStep?.name}  ${currentStep + 1}/${tourSteps.length}`}</h3>
        <p className="mb-4 text-gray-800 font-light">{currentTourStep?.content}</p>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="w-1/3 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          <button
            onClick={handleNext}
            className="w-1/3 px-4 py-2 bg-primaryColor text-white rounded hover:bg-sky-600"
          >
            {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;

