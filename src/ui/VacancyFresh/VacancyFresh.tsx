'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Card from "../Card/Card";
import Button from '../Buttons/Button';
import Title from '../Title/Title';
import { Vacancy } from "@/lib/definitions";
import vacanciesData from "@/lib/vacancy.json"; // Import vacanciesData here
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function getCurrentDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}

const VacanciesList: React.FC = () => {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const searchParams = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        if (category) {
            const filteredVacancies = vacanciesData.filter((vacancy: Vacancy) => vacancy.category === category);
            setVacancies(filteredVacancies);
        } else {
            setVacancies(vacanciesData);
        }
    }, [category]);

    return (
        <>
            <Title text={`Актуальные вакансии на ${getCurrentDate()}`} />
            <div className="flex flex-wrap gap-3 justify-center">
                <Card count={5} vacancies={vacancies} />
            </div>
            <Link href={'/vacancy'} className='mx-auto'>
                <Button text={"Посмотреть все вакансии"} className='btn-error btn-outline'/>
            </Link>
        </>
    );
}

const VacancyFresh: React.FC = () => {
    return (
        <div className='flex flex-col'>
            <Suspense fallback={<div>Loading...</div>}>
                <VacanciesList />
            </Suspense>
        </div>
    );
}

export default VacancyFresh;
