
interface LoadingSpinnerProps {
  sizeClass?: string;
  message?:string;
}

export const LoadingSpinner = ({ sizeClass = "h-5 w-5" ,message = "Loading..."}: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p>
        {message}
      </p>
       <div
      className={`
        ${sizeClass} 
        border-4 border-gray-600 border-t-blue-500 
        rounded-full animate-spin
      `}
      aria-hidden="true"
      role="status"
    />
    </div>
   
  );
};