'use client'
import React from 'react';
import Image from "next/image";
import Button from "../Buttons/Button";
import { useEffect, useState } from 'react';
import { Telegram } from '@/svg/telegram';
import { Viber } from '@/svg/viber';
import { WhatsApp } from '@/svg/whatsapp';
import Link from 'next/link';


export default function ServerVac(){
    const [vacancy, setVacancy] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchVacany = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/vacancy');
            // const response = await fetch('https://www.candidat.store/api/vacancy');
            const data = await response.json();
            console.log('VACANCY',data)

            setVacancy(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching vacancies:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVacany();
    }, []);
    return(
        <>
        <div>Вакансии</div>
        {isLoading ? (
                <p><span className="loading loading-spinner loading-md"></span> Загрузка...</p>
            ) : (
        <div className="flex flex-wrap justify-center w-full">
            {vacancy.map((vacancy, index) => (
                <div key={index} className="card w-96 glass m-4">
                    <figure>
                    {vacancy.image ? (
                                        <Image
                                        src={`data:${vacancy.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}                                            alt={vacancy.image.name}
                                            width={400} height={400}
                                        />
                                    ) : (
                                        'No image'
                                    )}                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold">{vacancy.title}</h2>
                        <p className="text-md font-semibold mt-2">📍<i className="bi bi-geo-alt-fill text-red-500"></i> {vacancy.location}</p>
                        {vacancy.roof_type && (
        <span className="text-muted text-sm">
          ⚙️ <i className="bi bi-dash-lg text-red-700 font-bold">{vacancy.roof_type}</i>
        </span>
      )}                        <p className="text-sm font-bold">💰 <i className="bi bi-cash ">Зарплата</i>&nbsp; {vacancy.salary}</p>
                        <p className="text-sm font-bold">🏠 <i className="bi bi-cash ">Проживание</i>&nbsp; {vacancy.homePrice}</p>
                        <p className="text-sm font-bold">🚘 <i className="bi bi-cash ">Транспорт</i>&nbsp; {vacancy.auto}</p>
                        <p className="text-sm font-bold">📄 <i className="bi bi-cash ">Документы:</i><br /> {vacancy.documents}</p>

                        <div className="card-actions justify-around items-center mt-4">
                            <a href={vacancy.manager.viber} target='blank'><Viber width={30} height={30} /></a>
                            <a href={vacancy.manager.telegram} target='blank'><Telegram width={30} height={30} /></a>
                            <a href={vacancy.manager.whatsapp} target='blank'><WhatsApp width={30} height={30} /></a>
                            <div className="self-end">
  <Link href={`/vacT/${vacancy._id}`}>
    <Button text={"Подробнее"} className='btn-outline btn-error'/>
  </Link>
</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
  )}

        </>
    )
}