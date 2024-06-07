import React from 'react';
import Image from "next/image";
import Button from "../Buttons/Button";
import { Telegram } from '@/svg/telegram';
import { Viber } from '@/svg/viber';
import { WhatsApp } from '@/svg/whatsapp';
import vacancies from '@/lib/vacancy.json'; 

interface Vacancy {
    image: string;
    job_title: string;
    location: string;
    work_type?: string;
    roof_type?: string;
    salary: string;
    viber?: string;
    telegram?: string;
    whatsapp?: string;
}

interface CardProps {
    count: number;
}

const Card: React.FC<CardProps> = ({ count }) => {
    return (
        <div className="flex flex-wrap justify-center">
            {vacancies.slice(0, count).map((vacancy: Vacancy, index: number) => (
                <div key={index} className="card w-96 glass m-4">
                    <figure>
                        <Image width={400} height={400} src={vacancy.image} alt={vacancy.job_title} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold">{vacancy.job_title}</h2>
                        <p className="text-md font-semibold mt-2">📍<i className="bi bi-geo-alt-fill text-red-500"></i> {vacancy.location}</p>
                        <span className="text-muted text-sm">⚙️ <i className="bi bi-dash-lg text-red-700 font-bold">{vacancy.work_type || vacancy.roof_type}</i> </span>
                        <p className="text-sm font-bold">💰 <i className="bi bi-cash ">Зарплата</i>&nbsp; {vacancy.salary}</p>
                        <div className="card-actions justify-around items-center mt-4">
                            <a href={vacancy.viber}><Viber width={30} height={30} /></a>
                            <a href={vacancy.telegram}><Telegram width={30} height={30} /></a>
                            <a href={vacancy.whatsapp}><WhatsApp width={30} height={30} /></a>
                            <div className="self-end"><Button text={"Подробнее"} /></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;
