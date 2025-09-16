
type LoadingSpinnerProps = {
  message?: string;
};

export const LoadingSpinner = ({ message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-400 py-16" role="status" aria-live="polite">
      <div 
        className="w-10 h-10 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mb-4"
        aria-hidden="true" 
      />
      <span className="text-lg font-semibold">{message}</span>
    </div>
  );
};