import React, { useEffect, useRef } from 'react';

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void; title: string }> = ({ children, onClose, title }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Focus trapping
    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
            const focusableElements = modalElement.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            firstElement?.focus();

            const handleTabKey = (event: KeyboardEvent) => {
                if (event.key === 'Tab') {
                    if (event.shiftKey && document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement?.focus();
                    } else if (!event.shiftKey && document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement?.focus();
                    }
                }
            };

            modalElement.addEventListener('keydown', handleTabKey);
            return () => modalElement.removeEventListener('keydown', handleTabKey);
        }
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-16"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4 max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 id="modal-title" className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} aria-label="Close modal" className="text-gray-500 hover:text-gray-800 text-2xl leading-none">&times;</button>
                </div>
                <div className="p-4 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
