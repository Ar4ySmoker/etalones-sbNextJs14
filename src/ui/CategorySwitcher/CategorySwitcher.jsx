'use client'
import React from 'react';

export default function CategorySwitcher({ categories, selectedCategory, setSelectedCategory }) {
    return (
        <div className="mb-4 flex justify-center flex-wrap">
            {categories.map((category) => (
                <button 
                    key={category} 
                    className={`btn ${selectedCategory === category ? 'btn-active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                >
                    {
                        category === 'undefined' ? 'без категории' :
                    category === 'santehnic' ? 'Сантехник' :
                    category === 'derevo' ? 'Дерево' :
                    category === 'zavod' ? 'Производство' :
                    category === 'undefined' ? 'без категории' :

                    category === 'tehnic' ? 'Техника' :
                    category === 'kamen' ? 'Каменьщик' : 
                    category === 'indor' ? 'Внутренняя отделка' : 
                    category === 'beton' ? 'Бетон' : 
                    category === 'electric' ? 'Электрика' : 
                    category === 'metal' ? 'Метал' : 
                    category === 'noexp' ? 'Без опыта' : 
                    category === 'outdor' ? 'Уличные работы' : category
                    }
                </button>
            ))}
        </div>
    );
}
