import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '../Buttons/Button';
import { Telegram } from '@/svg/telegram';
import { Viber } from '@/svg/viber';
import { WhatsApp } from '@/svg/whatsapp';
import Link from 'next/link';

interface Vacancy {
    _id: string;
    job_title: string;
    location: string;
    roof_type?: string;
    salary: string;
    homePrice: string;
    auto: string;
    documents: string;
    viber: string;
    telegram: string;
    whatsapp: string;
    image?: {
        contentType: string;
        data: string;
        name: string;
    };
}

const Card: React.FC = () => {
    const [vacancy, setVacancy] = useState<Vacancy[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchVacancies = async () => {
        try {
            // const response = await fetch('https://www.candidat.store/api/vacancy');
            const response = await fetch('/api/vacancy');

            const data = await response.json();
            setVacancy(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching vacancies:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVacancies();
    }, []);

    return (
        <div className="flex flex-wrap justify-center w-full">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                vacancy.map((vacancy) => (
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
                            <p className="text-md font-semibold mt-2">Location: {vacancy.location}</p>
                            {vacancy.roof_type && (
                                <p className="text-sm font-bold">Roof Type: {vacancy.roof_type}</p>
                            )}
                            <p className="text-sm font-bold">Salary: {vacancy.salary}</p>
                            <p className="text-sm font-bold">Home Price: {vacancy.homePrice}</p>
                            <p className="text-sm font-bold">Auto: {vacancy.auto}</p>
                            <p className="text-sm font-bold">Documents: {vacancy.documents}</p>
                            <div className="card-actions justify-around items-center mt-4">
                                <a href={vacancy.viber} target='_blank'><Viber width={30} height={30} /></a>
                                <a href={vacancy.telegram} target='_blank'><Telegram width={30} height={30} /></a>
                                <a href={vacancy.whatsapp} target='_blank'><WhatsApp width={30} height={30} /></a>
                                <div className="self-end">
                                    <Link href={`/vacancy/${vacancy._id}`}>
                                        <Button text="Details" className="btn-outline btn-error" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Card;
