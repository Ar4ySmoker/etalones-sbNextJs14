// src/components/ManagerCard.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Viber } from '@/svg/viber';
import { Telegram } from '@/svg/telegram';
import { WhatsApp } from '@/svg/whatsapp';



const ManagerCard = () => {
    const [managers, setManagers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchManagers();
    }, []);
    
    const fetchManagers = async () => {
        try {
            // const response = await fetch('http://localhost:3000/api/manager');
            const response = await fetch('https://www.etalones.com/api/manager');

            const data = await response.json();
            
            console.log("Fetched managers:", data);

            // Извлекаем массив managers из полученного объекта
            const extractedManagers = data.managers;

            if (Array.isArray(extractedManagers)) {
                setManagers(extractedManagers);
                setIsLoading(false);
            } else {
                console.error("Data.managers is not an array:", data);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching managers:", error);
            setIsLoading(false);
        }
    };
    

    return (
        <div className="my-3">
            <div className="text-3xl font-bold text-center text-red-700 py-3">Наши менеджеры</div>
            <div className="flex flex-wrap gap-5 justify-center">
                {managers.map((manager) => (
                    <div key={manager._id} className="flex flex-col items-center my-5">
                        <div className="avatar flex flex-col items-center">
                            <div className="rounded-full w-[150px]">
                            {manager.image ? (
                                        <Image
                                        src={`data:${manager.image.contentType};base64,${Buffer.from(manager.image.data).toString('base64')}`}
                                        alt={manager.image.name}
                                            width={150} height={150}
                                        />
                                    ) : (
                                        'No image'
                                    )}
                            </div>
                            <p className="font-bold text-2xl py-3">{manager.name}</p>
                            <p className="font-semibold text-md py-1">{manager.phone}</p>
                        </div>
                        <div className="flex gap-2 w-max justify-between mt-4">
                            <a href={manager.viber} className="transition-transform transform hover:scale-110">
                                <Viber width={30} height={30} />
                            </a>
                            <a href={manager.telegram} className="transition-transform transform hover:scale-110">
                                <Telegram width={30} height={30} />
                            </a>
                            <a href={manager.whatsapp} className="transition-transform transform hover:scale-110">
                                <WhatsApp width={30} height={30} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManagerCard;
