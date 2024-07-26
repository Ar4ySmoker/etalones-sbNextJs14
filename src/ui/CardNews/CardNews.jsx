'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

async function fetchNews(category) {
  try {
    // const response = await fetch(`https://etalones.com/api/news?category=${category}`);
    const response = await fetch(`http://localhost:3000/api/news?category=${category}`);
 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.news;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}
useEffect(() => {
  async function loadData() {
    try {
      const newsJourney = await fetchNews('journey'); 
      const newsUserfull = await fetchNews('userfull'); 

      setDataJourney(newsJourney);
      setDataUserfull(newsUserfull);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  loadData();
}, []);

if (loading) return <div>Загрузка...</div>;
if (error) return <div>Ошибка: {error}</div>;


function NewsCard() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNews = async () => {
        try {
            const response = await fetch('/api/news'); 
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
                    <Link href={`/news/${newsItem._id}`} key={newsItem._id} className="text-dark  mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl">
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
