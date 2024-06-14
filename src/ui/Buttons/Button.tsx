import React from 'react';

interface ButtonProps {
    text: string;
    isSubmit?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, isSubmit = false, className }) => {
    return (
        <button type={isSubmit ? "submit" : "button"}  className={`btn  ${className ?? 'btn-inline btn-success'} my-3`} // Используем пропс color для указания класса цвета
>
            {text}
        </button>
    );
}

export default Button;
