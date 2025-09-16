import React from 'react';

type EmptyStateProps = {
  title: string;
  message: string;
  imageUrl?: string; 
  children?: React.ReactNode; 
};

export const Empty = ({ title, message, imageUrl, children }: EmptyStateProps) => {
  return (
    <div className="text-center py-16 px-4 bg-gray-800/50 rounded-lg">
      <div className="mb-6 flex justify-center items-center">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-48 h-48 object-cover rounded-lg"
          />
        ) : (
          <div className="text-8xl">📝</div>
        )}
      </div>
<div className='flex flex-col justify-center items-center gap-4 '>
  <h3 className="text-2xl font-bold text-white mb-4">
        {title}
      </h3>
      <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
        {message}
      </p>

      {children && <div className="mt-4">{children}</div>}
</div>
    
    </div>
  );
};