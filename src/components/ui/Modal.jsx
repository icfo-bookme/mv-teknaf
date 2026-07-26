'use client';

import { useEffect } from 'react';

const CustomModal = ({ isOpen, onClose, title, foodAndDescription }) => {
  useEffect(() => {
    if (isOpen) {
      // Fix background scroll and prevent "jump"
      const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarCompensation}px`; 
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full bg-black bg-opacity-50"
      onClick={onClose} 
    >
      <div
        className="relative w-full max-w-2xl h-[90vh] flex flex-col bg-white dark:bg-gray-700 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
          <h3 className="text-xl text-center font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-4 overflow-y-auto">
          {foodAndDescription?.map((item) => (
            <div key={item.id} className="p-4 border rounded mb-4">
              <h3 className="font-bold text-lg">{item.facilty_name || ""}</h3>
              <div
                className="mt-2 text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.value }}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 border-t dark:border-gray-600 border-gray-200">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-[#313881] to-[#0678B4] text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
