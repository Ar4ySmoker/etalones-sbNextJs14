'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CategorySwitcher from '@/ui/CategorySwitcher/CategorySwitcher';

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  image?: {
    contentType: string;
    data: Buffer;
    name: string;
  };
  createdAt: string;
}

interface NewsListProps {
  enableCategorySwitcher?: boolean;
}

const NewsList: React.FC<NewsListProps> = ({ enableCategorySwitcher = true }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Функция для получения уникальных категорий
  const getCategories = (newsItems: NewsItem[]): string[] => {
    const categories = newsItems.map(newsItem => newsItem.category);
    return Array.from(new Set(categories));
  };

  // Функция для получения новостей
  const fetchNews = async (category: string) => {
    setIsLoading(true);
    try {
      // const response = await fetch(`http://localhost:3000/api/news?category=${category}`);
      const response = await fetch(`https://www.etalones.com/api/news?category=${category}`);

      const data = await response.json();
      setNews(data.news);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // const response = await fetch('http://localhost:3000/api/news');
        const response = await fetch('https://www.etalones.com/api/news');

        const data = await response.json();
        const uniqueCategories = getCategories(data.news);
        setCategories(uniqueCategories);
        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0]); // Устанавливаем первую категорию по умолчанию
          await fetchNews(uniqueCategories[0]);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchNews(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div className="container mx-auto">
      <div className=" pb-10  lg:pb-20">
        <div className="container mx-auto">
          {enableCategorySwitcher && (
            <CategorySwitcher
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
          
          <div className="mx-4 flex flex-wrap">
            {isLoading ? (
              <p>Загрузка...</p>
            ) : (
              news.map(newsItem => (
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
                        <Link href={`/news/${newsItem._id}`} passHref>
                          <p className="text-dark hover:text-primary mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl">
                            {newsItem.title}
                          </p>
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

export default NewsList;
