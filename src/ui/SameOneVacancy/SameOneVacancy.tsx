import React from 'react';
import Image from 'next/image';
import { Telegram } from '@/svg/telegram';
import { Viber } from '@/svg/viber';
import { WhatsApp } from '@/svg/whatsapp';
import { Vacancy } from '@/lib/definitions';
import Link from 'next/link';
import Button from '../Buttons/Button';

interface CardProps {
  category: string;
  vacancies: Vacancy[];
}

const SameOneVacancy: React.FC<CardProps> = ({ category, vacancies }) => {
  // Фильтрация вакансий по категории
  const filteredVacancies = vacancies.filter((vacancy: Vacancy) => vacancy.category === category);

  return (
    <div className="flex flex-wrap justify-center w-full">
      {filteredVacancies.map((vacancy: Vacancy, index: number) => (
        <div key={index} className="card w-96 glass m-4">
          <figure>
            <Image width={400} height={400} src={vacancy.image || '/default-image.png'} alt={vacancy.job_title || 'noImg'} />
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
            <p className="text-sm font-bold">📄 <i className="bi bi-cash ">Документы:</i><br /> {vacancy.documents}</p>

            <div className="card-actions justify-around items-center mt-4">
              <a href={vacancy.viber} target='blank'><Viber width={30} height={30} /></a>
              <a href={vacancy.telegram} target='blank'><Telegram width={30} height={30} /></a>
              <a href={vacancy.whatsapp} target='blank'><WhatsApp width={30} height={30} /></a>
              <div className="self-end">
                <Link href={`/vacancy/${vacancy._id}`}>
                  <Button text={"Подробнее"} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SameOneVacancy;