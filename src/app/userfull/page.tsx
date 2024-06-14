'use client'
import vacancies from '@/lib/vacancy.json';
import Navbar from '@/ui/Navbar/Navbar';
import Footer from '@/ui/Footer/Footer';
import FormCallBack from '@/ui/FormCallBack/FormCallBack';
import FormSubscribe from '@/ui/FormSubscribe/FormSubscribe';
import userfull from '@/lib/userfull.json';
import Card from '@/ui/Card/Card';
import Title from '@/ui/Title/Title';
import Useful from '@/ui/Useful/Useful';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { News } from "@/lib/definitions"
import Loading from '../Loading';



const UserfullPage = () => {
  const [userfull, setUserful] = useState<News[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
      if (category) {
          const filteredNews = userfull.filter(news => news.category === category);
          setUserful(filteredNews);
      } else {
          setUserful(userfull);
      }
  }, [category]);
  return (
      <>
  <Navbar/>
  <Title text='Полезно знать'/>
  <div className="tabs justify-center flex flex-wrap mb-6 font-bold">
                <a className={`tab ${category === 'travel' ? 'tab-active' : ''}`} onClick={() => router.push('/userfull?category=travel')}>Как купить билет</a>
                <a className={`tab ${category === 'environment' ? 'tab-active' : ''}`} onClick={() => router.push('/news?category=environment')}>Охрана окружающей среды</a>
                <a className={`tab ${category === 'business' ? 'tab-active' : ''}`} onClick={() => router.push('/news?category=business')}>Бизнес</a>
            </div>
            <Suspense fallback={<Loading/>}>
            </Suspense>
  <FormCallBack/>
  <Title text={'Подобные вакансии'}/>
  <Suspense fallback={<Loading/>}>
  <Card count={3} vacancies={vacancies}/>
  </Suspense>
  <Useful/>
  <FormSubscribe/>
  <Footer/>
  </>
  );
};

export default UserfullPage