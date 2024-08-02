'use client';
import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useNewsContext } from '@/app/context/NewsContext'; // Предполагаемый путь к вашему контексту

interface INews {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
    image?: {
        contentType: string;
        data: Buffer;
        name: string;
    };
}

const LastNews = () => {
    const { news } = useNewsContext();

    // Отбираем последние три новости
    const latestNews = news.slice(1,3).reverse(); // Берем последние три и переворачиваем порядок

    return (
        <div className="flex flex-wrap justify-center w-full">
            {latestNews && latestNews.length > 0 ? (
                latestNews.map((newsItem: INews, index: number) => (
                    <div key={index} className="card w-96 glass m-4">
                        <figure>
                            {newsItem.image ? (
                                <Image
                                    loading='lazy'
                                    src={`data:${newsItem.image.contentType};base64,${Buffer.from(newsItem.image.data).toString('base64')}`}
                                    alt={newsItem.image.name}
                                    width={400} height={400}
                                />
                            ) : (
                                'No image'
                            )}
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-bold">{newsItem.title}</h2>
                            <p className="text-md font-semibold mt-2">🗓 {new Date(newsItem.createdAt).toLocaleDateString()}</p>
                            <p className="text-sm font-bold">📄 Описание:</p>
                            <p>{newsItem.description}</p>

                            <div className="card-actions justify-around items-center mt-4">
                                <div className="self-end">
                                    <Link href={`/news/${newsItem._id}`}>
                                        <button className='btn-outline btn-error'>Подробнее</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Нет новостей для отображения</p>
            )}
        </div>
    );
}

export default LastNews;
