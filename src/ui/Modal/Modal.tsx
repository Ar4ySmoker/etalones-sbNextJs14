'use client';
import React, { ReactNode, useEffect } from 'react';
interface ChildProps {
    onClose: () => void;
  }
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed box-border inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100] p-2  h-full">
      <div className="rounded shadow-lg relative  overflow-y-auto  max-h-[80vh] w-full max-w-md">
       
        {React.Children.map(children, child => {
          return React.isValidElement(child)
            ? React.cloneElement(child, { onClose } as Partial<ChildProps>) // Передаем onClose в дочерний элемент
            : child;
        })}
      </div>
    </div>
  );
};

export default Modal;
