import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { PopoverProps } from './types';

const Popover: React.FC<PopoverProps> = ({ 
  trigger, 
  title, 
  children, 
  position = 'top',
  width = '',
  className = '',
  closebtn = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const positionClasses = {
    top: 'bottom-full mb-2',
    right: 'left-full -ml-5 -mt-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className={`absolute ${positionClasses[position]} ${width} origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 overflow-visible`}
        >
          <div className="p-2">
              <div className="mb-2 flex items-center justify-between">
               {title && <h3 className="font-medium text-gray-900 px-2">
                  { title}
                </h3>}
                {closebtn && <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>}
              </div>
            
            <div>{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;