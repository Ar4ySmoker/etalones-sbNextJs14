'use client'
import vacancies from '@/lib/vacancy.json';
import Navbar from '@/ui/Navbar/Navbar';
import Footer from '@/ui/Footer/Footer';
import FormCallBack from '@/ui/FormCallBack/FormCallBack';
import FormSubscribe from '@/ui/FormSubscribe/FormSubscribe';
import newsData from '@/lib/news.json';
import Card from '@/ui/Card/Card';
import Title from '@/ui/Title/Title';
import Useful from '@/ui/Useful/Useful';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { News } from "@/lib/definitions"
import CardNews from '@/ui/CardNews/CardNews';
import Loading from '../Loading';
import ServerVac from '@/ui/ServerVac/ServerVac';



const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
      if (category) {
          const filteredNews = newsData.filter(news => news.category === category);
          setNews(filteredNews);
      } else {
          setNews(newsData);
      }
  }, [category]);
  return (
      <>
  <Title text='Новости'/>
  <div className="tabs justify-center flex flex-wrap mb-6 font-bold">
                <a className={`tab ${!category ? 'tab-active' : ''}`} onClick={() => router.push('/news')}>Все</a>
                <a className={`tab ${category === 'industry' ? 'tab-active' : ''}`} onClick={() => router.push('/news?category=home')}>Дом</a>
                <a className={`tab ${category === 'technology' ? 'tab-active' : ''}`} onClick={() => router.push('/news?category=journeys')}>Путешествия</a>
                <a className={`tab ${category === 'environment' ? 'tab-active' : ''}`} onClick={() => router.push('/news?category=environment')}>Охрана окружающей среды</a>
                <a className={`tab ${category === 'business' ? 'tab-active' : ''}`} onClick={() => router.push('/news?category=business')}>Бизнес</a>
            </div>
            <Suspense fallback={<Loading/>}>
            <CardNews newsData={newsData} count={4}/>
            </Suspense>
  <FormCallBack/>
  <Title text={'Подобные вакансии'}/>
  <Suspense fallback={<Loading/>}>
  <ServerVac vacanciesCount={3}/>
  </Suspense>
  <Useful/>
  <FormSubscribe/>
  <Footer/>
  </>
  );
};

export default NewsPage