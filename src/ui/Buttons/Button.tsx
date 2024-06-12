import React from 'react';

interface ButtonProps {
    text: string;
    isSubmit?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, isSubmit = false }) => {
    return (
        <button type={isSubmit ? "submit" : "button"} className="btn btn-outline btn-error w-max mx-auto my-3">
            {text}
        </button>
    );
}

export default Button;
