'use client';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Button from "../Buttons/Button";
import { Telegram } from '@/svg/telegram';
import { Viber } from '@/svg/viber';
import { WhatsApp } from '@/svg/whatsapp';
import Link from 'next/link';
import CategorySwitcher from '@/ui/CategorySwitcher/CategorySwitcher'; // Импорт нового компонента
import { useLoading } from '@/app/context/LoadingContext';

export default function ServerVac({ vacanciesCount, enableCategorySwitcher = false }) {
    const [vacancy, setVacancy] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const { isLoading, setLoading } = useLoading();

    const fetchVacancy = async () => {
        setLoading(true);
        try {
            // const response = await fetch('http://localhost:3000/api/vacancy');
            const response = await fetch('https://www.etalones.com/api/vacancy');
            const data = await response.json();
            console.log('VACANCY', data);

            setVacancy(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching vacancies:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchVacancy();
    }, []);

    // Функция для получения уникальных категорий
    const getCategories = (vacancies) => {
        const categories = vacancies.map(vacancy => vacancy.category);
        return ["all", ...new Set(categories)];
    };

    // Получаем уникальные категории
    const categories = getCategories(vacancy);

    // Фильтруем вакансии на основе выбранной категории
    const filteredVacancies = selectedCategory === "all" 
        ? vacancy 
        : vacancy.filter(v => v.category === selectedCategory);

    return (
        <>
            {isLoading ? (
                
                <div className="flex flex-wrap justify-center w-full">
                        {[...Array(vacanciesCount)].map((_, index) => (
                    <div key={index} className="card w-96 m-4 skeleton h-96"></div>
                ))}
            </div>        ) : (
                <div>
                    {/* Переключатель категорий */}
                    {enableCategorySwitcher && (
                        <CategorySwitcher 
                            categories={categories} 
                            selectedCategory={selectedCategory} 
                            setSelectedCategory={setSelectedCategory} 
                        />
                    )}
                    
                    <div className="flex flex-wrap justify-center w-full">
                        {filteredVacancies.slice(0, vacanciesCount).map((vacancy, index) => (
                            <div key={index} className="card w-96 glass m-4">
                                <figure>
                                    {vacancy.image ? (
                                        <Image
                                        loading='lazy'
                                            src={`data:${vacancy.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}
                                            alt={vacancy.image.name}
                                            width={400} height={400}
                                        />
                                    ) : (
                                        'No image'
                                    )}
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title font-bold">{vacancy.title}</h2>
                                    <p className="text-md font-semibold mt-2">📍<i className="bi bi-geo-alt-fill text-red-500"></i> {vacancy.location}</p>
                                    {vacancy.roof_type && (
                                        <span className="text-muted text-sm">
                                            ⚙️ <i className="bi bi-dash-lg text-red-700 font-bold">{vacancy.roof_type}</i>
                                        </span>
                                    )}
                                    <p className="text-sm font-bold">💰 <i className="bi bi-cash">Зарплата</i>&nbsp; {vacancy.salary}</p>
                                    <p className="text-sm font-bold">🏠 <i className="bi bi-cash">Проживание</i>&nbsp; {vacancy.homePrice}</p>
                                    <p className="text-sm font-bold">🚘 <i className="bi bi-cash">Транспорт</i>&nbsp; {vacancy.auto}</p>
                                    <p className="text-sm font-bold">📄 <i className="bi bi-cash">Документы:</i><br /> {vacancy.documents}</p>

                                    <div className="card-actions justify-around items-center mt-4">
                                        <a href={vacancy.manager.viber} target='blank'><Viber width={30} height={30} /></a>
                                        <a href={vacancy.manager.telegram} target='blank'><Telegram width={30} height={30} /></a>
                                        <a href={vacancy.manager.whatsapp} target='blank'><WhatsApp width={30} height={30} /></a>
                                        <div className="self-end">
                                            <Link href={`/vacancy/${vacancy._id}`}>
                                                <Button text={"Подробнее"} className='btn-outline btn-error' />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
