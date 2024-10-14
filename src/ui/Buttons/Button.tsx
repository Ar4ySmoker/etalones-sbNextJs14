// import React from 'react';

// interface ButtonProps {
//     text: string;
//     isSubmit?: boolean;
//     className?: string;
//     onClick?: () => void;
// }

// const Button: React.FC<ButtonProps> = ({ text, isSubmit = false, className, onClick }) => {
//     return (
//         <button type={isSubmit ? "submit" : "button"} onClick={onClick} className={`btn  ${className ?? 'btn-inline btn-success'} my-3`} // Используем пропс color для указания класса цвета
// >            {text}
//         </button>
//     );
// }

// export default Button;

import React from 'react';

interface ButtonProps {
    text?: string; // Теперь этот пропс не обязателен
    isSubmit?: boolean;
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode; // Дочерние элементы
}

const Button: React.FC<ButtonProps> = ({ text, isSubmit = false, className, onClick, children }) => {
    return (
        <button type={isSubmit ? "submit" : "button"} onClick={onClick} className={`btn ${className ?? 'btn-inline btn-success'} my-3`}>
            {text || children} {/* Если text не указан, используем детей */}
        </button>
    );
}

export default Button;

