// hooks/useKeyboardShortcuts.ts - Custom hook for keyboard shortcuts
import { useEffect, type RefObject } from 'react';

interface KeyboardShortcutsProps {
  searchInputRef: RefObject<HTMLInputElement>;
  isModalOpen: boolean;
  
}

export const useKeyboardShortcuts = ({
  searchInputRef,
  isModalOpen,
}: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isTyping = (event.target as HTMLElement)?.tagName?.match(/INPUT|TEXTAREA|SELECT/);
      
      if (
        event.key === '/' && 
        !isModalOpen && 
        !isTyping
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
        return;
      }
     
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchInputRef]);
};
