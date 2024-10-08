// 'use client';
// import React, { ReactNode, useEffect } from 'react';
// interface ChildProps {
//     onClose: () => void;
//   }
// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }

//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed box-border inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100] p-2  h-full">
//       <div className="rounded shadow-lg relative   max-h-[80vh] w-full max-w-md">
       
//         {React.Children.map(children, child => {
//           return React.isValidElement(child)
//             ? React.cloneElement(child, { onClose } as Partial<ChildProps>) // Передаем onClose в дочерний элемент
//             : child;
//         })}
//       </div>
//     </div>
//   );
// };

// export default Modal;
'use client';
import React, { ReactNode, useEffect, useState } from 'react';

interface ChildProps {
  onClose: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 300); // Длительность анимации
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300); // Задержка перед вызовом onClose
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100] p-2 h-full transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`rounded shadow-lg relative max-h-[80vh] w-full max-w-md transition-transform duration-300 ${isAnimating ? 'scale-100' : 'scale-95'}`}>
        {React.Children.map(children, child => {
          return React.isValidElement(child)
            ? React.cloneElement(child, { onClose: handleClose } as Partial<ChildProps>)
            : child;
        })}
      </div>
    </div>
  );
};

export default Modal;
