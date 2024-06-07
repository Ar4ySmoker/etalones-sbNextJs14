import React from 'react';
import Card from "../Card/Card";
import Button from '../Buttons/Button';

function getCurrentDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}

const VacancyFresh: React.FC = () => {
    return (
        <div className='flex flex-col'>
            <h2 className='text-center py-5 text-2xl'>Актуальные вакансии на {getCurrentDate()}</h2>
            <div className="flex flex-wrap gap-3 justify-center">
                <Card count={5}/>
                
            </div>
                <Button text={"Посмотреть все"}/>
        </div>
    );
}

export default VacancyFresh;
