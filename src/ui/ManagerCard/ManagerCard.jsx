// src/components/ManagerCard.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Viber } from '@/svg/viber';
import { Telegram } from '@/svg/telegram';
import { WhatsApp } from '@/svg/whatsapp';



const ManagerCard = ({ managers }) => {
    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {
        if (managers.image && managers.image.data) {
          // Создание URL для изображения из Base64 данных
          const base64Data = Buffer.from(managers.image.data).toString('base64');
          const imageUrl = `data:${managers.image.contentType};base64,${base64Data}`;
          setImageSrc(imageUrl);
        }
      }, [managers]);
    return (
        <div className="my-3">
            <div className="text-3xl font-bold text-center text-red-700 py-3">Наши менеджеры</div>
            <div className="flex flex-wrap gap-5 justify-center">
                {managers.map((manager) => (
                    <div key={manager._id} className="flex flex-col items-center my-5">
                        <div className="avatar flex flex-col items-center">
                            <div className="rounded-full">
                            {imageSrc ? (
          <Image
            src={imageSrc}
            alt={manager.image.name}
            width={400}
            height={400}
          />
        ) : (
          'No image available'
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
