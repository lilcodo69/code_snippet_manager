// src/components/Empty.tsx
import React from 'react';

interface EmptyProps {
  title: string;
  message: string;
  children?: React.ReactNode;
}

export const Empty = ({ title, message, children }: EmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 max-w-md mx-auto text-center p-12 space-y-6 bg-zinc-900 border border-zinc-500 rounded-xl shadow-lg">
   
      <svg   className="mx-auto h-16 w-16 text-zinc-500"   fill="none"   viewBox="0 0 24 24"   stroke="currentColor"   strokeWidth={1}   aria-hidden="true" >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>

    
      <div className=" space-y-2">
        <h3 className="text-2xl font-semibold text-zinc-200">
          {title}
        </h3>
        <p className="text-zinc-400">
          {message}
        </p>
      </div>

      
      {children}
    </div>
  );
};