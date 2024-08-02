// 'use client'
// import Link from 'next/link';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';

// const CardNews = ({ category, currentNewsId }) => {
//   const [news, setNews] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchNews = async (category = '') => {
//     try {
//       // const response = await fetch(`http://localhost:3000/api/news${category ? `?category=${category}` : ''}`);
//       const response = await fetch(`https://www.etalones.com/api/news${category ? `?category=${category}` : ''}`);

//       const data = await response.json();
//       setNews(data.news); 
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNews(category);
//   }, [category]);
//   const filteredNews = news.filter(newsItem => newsItem._id !== currentNewsId);

//   return (
//     <>
//       <div className="container mx-auto">
//         <div className=" pt-5 pb-10 lg:pt-[20px] lg:pb-20">
//           <div className="container mx-auto">
//             <div className="mx-4 flex flex-wrap">
//               {isLoading ? (
//                 <p>Загрузка...</p>
//               ) : (
//                 filteredNews.map(newsItem => (
//                   <div key={newsItem._id} className="w-full px-4 md:w-1/2 lg:w-1/3">
//                     <div className="mx-auto mb-10 max-w-[370px]">
//                       <div className="mb-8 overflow-hidden rounded">
//                         {newsItem.image ? (
//                           <Image
//                             src={`data:${newsItem.image.contentType};base64,${Buffer.from(newsItem.image.data).toString('base64')}`}
//                             alt={newsItem.image.name}
//                             width={400}
//                             height={400}
//                             className="rounded-lg"
//                           />
//                         ) : (
//                           'No image'
//                         )}
//                       </div>
//                       <div>
//                         <span className="bg-primary mb-5 inline-block rounded py-1 px-4 text-center text-xs font-semibold leading-loose text-white">
//                         <p>{new Date(newsItem.createdAt).toLocaleDateString()}</p>
//                         </span>
//                         <h3>
//                           <Link href={`/news/${newsItem._id}`} passHref className="text-dark hover:text-primary mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl">
//                             {newsItem.title}
//                           </Link>
//                         </h3>
//                         <p className="text-body-color text-base">
//                           {newsItem.description?.substring(0, 100)}...
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
  
// }

// export default CardNews;
'use client';
import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import Button from "../Buttons/Button";
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

interface CardNewsProps {
    newsCount?: number; // Явное указание типа, допускающее undefined
}

export default function CardNews({ newsCount }: CardNewsProps) {
    const { news, loading, setPage } = useNewsContext(); // Используем useContext для получения данных о новостях

    // Логируем данные из контекста
    console.log('news:', news);
    console.log('loading:', loading);

    // Используем IntersectionObserver для бесконечной прокрутки
    const observer = useRef<IntersectionObserver>();
    const lastNewsElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage((prevPage: number) => prevPage + 1);
            }
        });
        if (lastNewsElementRef.current) {
            observer.current.observe(lastNewsElementRef.current);
        }
    }, [lastNewsElementRef.current]);

    // Определяем, сколько новостей отображать
    const displayedNews = newsCount !== undefined ? news.slice(0, newsCount) : news;

    return (
        <>
            {loading ? (
                <div className="flex flex-wrap justify-center w-full">
                    {[...Array(newsCount || 1)].map((_, index) => (
                        <div key={index} className="card w-96 m-4 skeleton h-96"></div>
                    ))}
                </div>
            ) : (
                <div>
                    <div className="flex flex-wrap justify-center w-full">
                        {displayedNews && displayedNews.length > 0 ? (
                            displayedNews.map((newsItem: INews, index: number) => (
                                <div
                                    key={index}
                                    className="card w-96 glass m-4"
                                    ref={index === displayedNews.length - 1 ? lastNewsElementRef : null}
                                >
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
                                                    <Button text={"Подробнее"} className='btn-outline btn-error' />
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
                </div>
            )}
        </>
    );
}
