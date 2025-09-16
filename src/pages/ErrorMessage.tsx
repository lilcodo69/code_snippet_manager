
type ErrorMessageProps = {
  title?: string;
  message: string;
};

export const ErrorMessage = ({ title = 'An Error Occurred', message }: ErrorMessageProps) => {
  return (
    <div role="alert" className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg my-8">
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-5h2v2h-2v-2zm0-8h2v6h-2V5z"/>
        </svg>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};