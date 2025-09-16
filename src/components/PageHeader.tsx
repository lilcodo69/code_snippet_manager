import React from 'react';

type PageHeaderProps = {
  title: string;
  children?: React.ReactNode; 
};

export const PageHeader = ({ title, children }: PageHeaderProps) => {
  return (

    <header className="sticky  top-[4.2rem] z-30 bg-gray-900 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white truncate pr-4">
          {title}
        </h2>
        <div>
          {children}
        </div>
      </div>
    </header>
  );
};