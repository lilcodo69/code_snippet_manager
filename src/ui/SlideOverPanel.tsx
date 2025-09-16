import React from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";


import clsx from "clsx";

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const SlideOverPanel = ({
  isOpen,
  onClose,
  title,
  children,
}: SlideOverProps) => {
  return createPortal(
    <>
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 bg-black z-[60] transition-opacity duration-300",
          isOpen ? "bg-opacity-30" : "bg-opacity-0 pointer-events-none"
        )}
      />

      <div
        className={clsx(
          "fixed top-0 bottom-0 right-0 w-full max-w-[40rem] bg-gray-800 text-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
          <h3 className="text-xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-700"
          >
            <HiXMark size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4">{children}</div>
      </div>
    </>,
    document.body
  );
};

export default SlideOverPanel;
