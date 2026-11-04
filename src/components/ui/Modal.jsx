'use client';
import { useEffect, useId, useRef } from 'react';
import sanitizeHtml from 'sanitize-html';

export default function CustomModal({ isOpen, onClose, title, foodAndDescription, children }) {
  const ref = useRef(null);
  const titleId = useId();
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);
  useEffect(() => {
    const dialog = ref.current;
    if (!isOpen) return;
    const previousFocus = document.activeElement;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.paddingRight = (window.innerWidth - document.documentElement.clientWidth) + 'px';
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    const cancel = event => { event.preventDefault(); closeRef.current(); };
    dialog.addEventListener('cancel', cancel);
    return () => {
      dialog.removeEventListener('cancel', cancel);
      dialog.close();
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previousFocus?.focus();
    };
  }, [isOpen]);
  return (
    <dialog ref={ref} aria-labelledby={titleId} aria-modal="true"
      className="m-auto w-[calc(100%-2rem)] max-w-2xl max-h-[90vh] rounded-xl bg-white p-0 shadow-xl backdrop:bg-black/60"
      onClick={event => { if (event.target === ref.current) onClose(); }}>
      <div className="flex max-h-[90vh] flex-col" onClick={event => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b p-4">
          <h2 id={titleId} className="text-xl font-semibold text-gray-900">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close dialog" className="rounded px-3 py-2 text-gray-700">?</button>
        </div>
        <div className="overflow-y-auto p-4 text-gray-800">
          {children || (Array.isArray(foodAndDescription) && foodAndDescription.length ? foodAndDescription.map(item => (
            <div key={item.id} className="mb-4 rounded border p-4">
              <h3 className="text-lg font-bold">{item.facilty_name || item.facility_name || ''}</h3>
              <div className="custom-content mt-2" dangerouslySetInnerHTML={{ __html: sanitizeHtml(String(item.value || '')) }} />
            </div>
          )) : <p>No travel description is available yet. Please contact us for details.</p>)}
        </div>
        <div className="flex justify-end border-t p-4">
          <button type="button" onClick={onClose} className="rounded bg-blue-900 px-4 py-2 text-white">Close</button>
        </div>
      </div>
    </dialog>
  );
}
