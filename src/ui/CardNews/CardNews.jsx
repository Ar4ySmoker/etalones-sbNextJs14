// import Link from 'next/link';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';



// const CardNews = (count) => {
//   const [news, setNews] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const fetchNews = async () => {
//         try {
//             const response = await fetch('/api/news'); // Убедитесь, что путь корректный
//             const data = await response.json();
//             setNews(data);
//             setIsLoading(false);
//         } catch (error) {
//             console.error("Error fetching news:", error);
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchNews();
//     }, []);

//   return (
//     <>
//       <div className="h-[800px] pt-5 pb-10 lg:pt-[20px] lg:pb-20">
//         <div className="container mx-auto">
//           <div className="mx-4 flex flex-wrap">
//             {news.slice( 0, count).map(news => (
//               <div key={news._id} className="w-full px-4 md:w-1/2 lg:w-1/3">
//                 <div className="mx-auto mb-10 max-w-[370px]">
//                   <div className="mb-8 overflow-hidden rounded">
//                   {news.image ? (
//                                     <Image
//                                         src={`data:${news.image.contentType};base64,${Buffer.from(news.image.data).toString('base64')}`}
//                                         alt={news.image.name}
//                                         width={400}
//                                         height={400}
//                                         className="rounded-lg"
//                                     />
//                                 ) : (
//                                     'No image'
//                                 )}
//                   </div>
//                   <div>
//                     <span className="bg-primary mb-5 inline-block rounded py-1 px-4 text-center text-xs font-semibold leading-loose text-white">
//                       {news.date}
//                     </span>
//                     <h3>
//                       <Link href={`/news/${news._id}`} passHref className="text-dark hover:text-primary mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl">
//                           {news.title}
//                       </Link>
//                     </h3>
//                     <p className="text-body-color text-base">
//                      {news.description?.substring(0,100)}...
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CardNews;
'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function NewsCard() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNews = async () => {
        try {
            const response = await fetch('/api/news'); // Убедитесь, что путь корректный
            const data = await response.json();
            setNews(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching news:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="overflow-x-auto flex flex-col items-center">
            {isLoading ? (
                <p><span className="loading loading-spinner loading-md"></span> Загрузка...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {news.map((newsItem) => (
                    <Link href={`/news/${news._id}`} passHref className="text-dark  mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl">
                        <div key={newsItem._id} className="card w-96 glass m-4 p-4">
                            <figure>
                                {newsItem.image ? (
                                    <Image
                                        src={`data:${newsItem.image.contentType};base64,${Buffer.from(newsItem.image.data).toString('base64')}`}
                                        alt={newsItem.image.name}
                                        width={400}
                                        height={300}
                                        className="rounded-lg"
                                    />
                                ) : (
                                    'No image'
                                )}
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title font-bold">{newsItem.title}</h2>
                                <p className="text-sm">{newsItem.description.length > 100 ? `${newsItem.description.substring(0, 100)}...` : newsItem.description}</p>                             
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NewsCard;
