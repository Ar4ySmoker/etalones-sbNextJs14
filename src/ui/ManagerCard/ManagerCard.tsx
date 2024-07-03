// src/components/ManagerCard.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { Viber } from '@/svg/viber';
import { Telegram } from '@/svg/telegram';
import { WhatsApp } from '@/svg/whatsapp';
import { ManagerField } from '@/lib/definitions';

interface Props {
    managers: ManagerField[];
}

const ManagerCard: React.FC<Props> = ({ managers }) => {
    return (
        <div className="my-3">
            <div className="text-3xl font-bold text-center text-red-700 py-3">Наши менеджеры</div>
            <div className="flex flex-wrap gap-5 justify-center">
                {managers.map((manager) => (
                    <div key={manager._id} className="flex flex-col items-center my-5">
                        <div className="avatar flex flex-col items-center">
                            <div className="rounded-full">
                                <Image
                                    src={`/images/managers/${manager.name.toLowerCase().replace(/\s/g, '')}.jpg`}
                                    alt={manager.name}
                                    width={120}
                                    height={120}
                                />
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
