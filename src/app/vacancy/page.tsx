'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Card from '@/ui/Card/Card';
import Footer from '@/ui/Footer/Footer';
import Navbar from '@/ui/Navbar/Navbar';
import vacanciesData from '@/lib/vacancy.json';
import { Vacancy } from '@/lib/definitions';
import Title from '@/ui/Title/Title';

export default function VacancyPage() {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        if (category) {
            const filteredVacancies = vacanciesData.filter(vacancy => vacancy.category === category);
            setVacancies(filteredVacancies);
        } else {
            setVacancies(vacanciesData);
        }
    }, [category]);

    return (
        <>
            <Navbar />
<Title text={'Наши вакансии'}/>
            <div className="tabs justify-center mb-6">
                <a className={`tab ${!category ? 'tab-active' : ''}`} onClick={() => router.push('/vacancy')}>Все</a>
                <a className={`tab ${category === 'internal' ? 'tab-active' : ''}`} onClick={() => router.push('/vacancy?category=indor')}>Внутренняя отделка</a>
                <a className={`tab ${category === 'outdoor' ? 'tab-active' : ''}`} onClick={() => router.push('/vacancy?category=outdoor')}>Улица/Земляные работы</a>
                <a className={`tab ${category === 'outdoor' ? 'tab-active' : ''}`} onClick={() => router.push('/vacancy?category=krovl')}>Кровля/Фасады</a>
                <a className={`tab ${category === 'outdoor' ? 'tab-active' : ''}`} onClick={() => router.push('/vacancy?category=mehan')}>Сварщики/Механики</a>
                <a className={`tab ${category === 'outdoor' ? 'tab-active' : ''}`} onClick={() => router.push('/vacancy?category=voditel')}>Водители</a>
                <a className={`tab ${category === 'no-experience' ? 'tab-active' : ''}`} onClick={() => router.push('/vacancy?category=no-exp')}>Без опыта</a>
            </div>
            <Card count={vacancies.length} vacancies={vacancies} />
            <Footer />
        </>
    );
}
