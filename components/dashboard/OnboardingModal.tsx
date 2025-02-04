import React from 'react';
import { useDispatch } from 'react-redux';
import { setShowTour, setHasCompletedTour } from '@/store/onboarding/OnboardingSlice';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tourOptions = [
  {
    title: "How to Submit a Loan Inquiry",
    description: "Learn the simple steps to start your loan application process."
  },
  {
    title: "Track Loan Status and Updates",
    description: "See how to monitor the progress of your loan at every stage."
  },
  {
    title: "Upload and Manage Documents",
    description: "Understand how to upload, preview, and manage your loan-related documents."
  },
  {
    title: "Communicate with Administrators",
    description: "Discover how to reach out for help and stay informed."
  }
];

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleFullTour = () => {
    dispatch(setShowTour(true));
    dispatch(setHasCompletedTour(false));
    onClose();
  };

  const handleSkip = () => {
    dispatch(setHasCompletedTour(true));
    dispatch(setShowTour(false))
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Choose a tour to explore key features. Select where you&apos;d like to begin:</h2>
        <div className="space-y-4">
          {tourOptions.map((option, index) => (
            <button
              key={index}
              className="w-full p-4 border rounded-lg flex justify-between items-center hover:bg-gray-100"
            >
              <div className="text-left">
                <p className="font-bold">{option.title}</p>
                <p className="text-sm text-gray-600 w-5/6">{option.description}</p>
              </div>
              <span className="text-xl">&gt;</span>
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleSkip}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Skip Tour
          </button>
          <button
            onClick={handleFullTour}
            className="px-4 py-2 bg-primaryColor text-white rounded hover:bg-sky-600"
          >
            Take Full Tour
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
