import React from 'react';

interface ButtonProps {
    text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
    return (
        <button className="btn btn-outline btn-error w-max mx-auto my-3">
            {text}
        </button>
    );
}

export default Button;
