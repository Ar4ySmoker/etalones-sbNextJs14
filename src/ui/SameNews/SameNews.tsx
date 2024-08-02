'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  image?: {
    contentType: string;
    data: Buffer;
    name: string;
  };
}

interface SameNewsProps {
  category: string;
  currentNewsId: string;
}

const SameNews = ({ category, currentNewsId }: SameNewsProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNews = async (category: string) => {
    try {
      const response = await fetch(`/api/news${category ? `?category=${category}` : ''}`);
      const data = await response.json();
      setNews(data.news); 
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  const filteredNews = news.filter(newsItem => newsItem._id !== currentNewsId);

  return (
    <div className="container mx-auto">
          <div className="pt-5 pb-10 lg:pt-[20px] lg:pb-20">
        <div className="container mx-auto">
            <div className="mx-4 flex flex-wrap">
                {isLoading ? (
                    <p>Загрузка...</p>
                ) : (
                    filteredNews.map(newsItem => (
                        <div key={newsItem._id} className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div className="mx-auto mb-10 max-w-[370px]">
                                <div className="mb-8 overflow-hidden rounded">
                                    {newsItem.image ? (
                                        <Image
                                            src={`data:${newsItem.image.contentType};base64,${Buffer.from(newsItem.image.data).toString('base64')}`}
                                            alt={newsItem.image.name}
                                            width={400}
                                            height={400}
                                            className="rounded-lg"
                                        />
                                    ) : (
                                        'No image'
                                    )}
                                </div>
                                <div>
                                    <span className="bg-primary mb-5 inline-block rounded py-1 px-4 text-center text-xs font-semibold leading-loose text-white">
                                        <p>{new Date(newsItem.createdAt).toLocaleDateString()}</p>
                                    </span>
                                    <h3>
                                        <Link href={`/news/${newsItem._id}`} passHref className="text-dark hover:text-primary mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl">
                                            {newsItem.title}
                                        </Link>
                                    </h3>
                                    <p className="text-body-color text-base">
                                        {newsItem.description?.substring(0, 100)}...
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  </div>
  );
}

export default SameNews;
