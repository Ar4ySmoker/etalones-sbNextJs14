import React from 'react';
import Image from 'next/image';
import Button from '../Buttons/Button';
import { Telegram } from '@/svg/telegram';
import { Viber } from '@/svg/viber';
import { WhatsApp } from '@/svg/whatsapp';
import Link from 'next/link';
import { useVacancyContext } from '@/app/context/VacancyContext';
import { Vacancy } from '@/lib/definitions';

// Определяем интерфейс для пропсов
interface CardProps {
    count: number; // Тип для count
}

// Функция для разделения строки документов на массив
const splitDocuments = (documents: string): string[] => {
    return documents ? documents.split(';') : [];
};

const Card: React.FC<CardProps> = ({ count }) => {
    const { urgentVacancies, loading } = useVacancyContext(); // Используем срочные вакансии

    if (loading) {
        return <p>Загрузка...</p>;
    }

    return (
        <div className="flex flex-wrap justify-center w-full">
            {urgentVacancies.slice(0, count).map((vacancy: Vacancy) => {
                const documentsArray = splitDocuments(vacancy.documents);

                return (
                    <div key={vacancy._id} className="card w-96 glass m-4">
                        <figure>
                            {vacancy.image ? (
                                <Image
                                    width={400}
                                    height={400}
                                    src={`data:${vacancy.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}
                                    alt={vacancy.job_title}
                                />
                            ) : (
                                <Image
                                    width={400}
                                    height={400}
                                    src="/default-image.png"
                                    alt="Default Image"
                                />
                            )}
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-bold">{vacancy.job_title}</h2>
                            <p className="text-md font-semibold mt-2">📍<i className="bi bi-geo-alt-fill text-red-500"></i> {vacancy.location}</p>
                            {vacancy.roof_type && (
                                <span className="text-muted text-sm">
                                    ⚙️ <i className="bi bi-dash-lg text-red-700 font-bold">{vacancy.roof_type}</i>
                                </span>
                            )}
                            <p className="text-sm font-bold">💰 <i className="bi bi-cash ">Зарплата</i>&nbsp; {vacancy.salary}</p>
                            <p className="text-sm font-bold">🏠 <i className="bi bi-cash ">Проживание</i>&nbsp; {vacancy.homePrice}</p>
                            <p className="text-sm font-bold">🚘 <i className="bi bi-cash ">Транспорт</i>&nbsp; {vacancy.auto}</p>
                            <p className="text-sm font-bold">📄 <i className="bi bi-cash ">Документы:</i></p>
                            <ul>
                                {documentsArray.map((doc, index) => (
                                    <li key={index}>{doc.trim()}</li>
                                ))}
                            </ul>

                            <div className="card-actions justify-around items-center mt-4">
                                <a href={vacancy.viber} target='blank'><Viber width={30} height={30} /></a>
                                <a href={vacancy.telegram} target='blank'><Telegram width={30} height={30} /></a>
                                <a href={vacancy.whatsapp} target='blank'><WhatsApp width={30} height={30} /></a>
                                <div className="self-end">
                                    <Link href={`/vacancy/${vacancy._id}`}>
                                        <Button text={"Подробнее"} className='btn-outline btn-error' />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Card;
