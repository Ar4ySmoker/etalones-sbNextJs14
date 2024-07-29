import React from 'react';

const convertLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
        if (urlRegex.test(part)) {
            return (
                <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {part}
                </a>
            );
        }
        return part;
    });
};

export default convertLinks;
