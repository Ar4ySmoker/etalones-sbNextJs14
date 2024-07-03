'use client'
import React, { useEffect, useState } from 'react';
import Card from '../Card/Card'; // Используем существующий компонент Card для отображения вакансий

export default function SameOneVacancy({ category, currentVacancyId, count = 3 }) {
    const [relatedVacancies, setRelatedVacancies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRelatedVacancies = async () => {
            setIsLoading(true); // Устанавливаем isLoading в true перед запросом
            setRelatedVacancies([]); // Очищаем relatedVacancies перед запросом

            try {
                console.log(`Fetching vacancies for category: ${category}`);
                const response = await fetch(`/api/vacancy?category=${category}`);
                const data = await response.json();
                console.log("Fetched vacancies:", data);

                // Исключаем текущую вакансию из списка связанных
                const filteredVacancies = data.filter(vacancy => vacancy._id !== currentVacancyId && vacancy.category === category);
                const selectedVacancies = filteredVacancies.slice(0, count);
                
                setRelatedVacancies(selectedVacancies);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching related vacancies:", error);
                setIsLoading(false);
            }
        };

        fetchRelatedVacancies();
    }, [category, currentVacancyId, count]);

    useEffect(() => {
        console.log("Current category:", category);
        console.log("Current currentVacancyId:", currentVacancyId);
        console.log("Current count:", count);
    }, [category, currentVacancyId, count]);

    return (
        <>
            {isLoading ? (
                <p><span className="loading loading-spinner loading-md"></span> Загрузка...</p>
            ) : relatedVacancies.length === 0 ? (
                <p className='flex justify-center font-bold'>Эта вакансия уникальна в своей категории</p>
            ) : (
                <div className="flex flex-wrap justify-center w-full">
                    <Card vacancies={relatedVacancies} />
                </div>
            )}
        </>
    );
}
