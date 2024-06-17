'use client'
import vacancies from '@/lib/vacancy.json';
import Navbar from '@/ui/Navbar/Navbar';
import Footer from '@/ui/Footer/Footer';
import FormCallBack from '@/ui/FormCallBack/FormCallBack';
import FormSubscribe from '@/ui/FormSubscribe/FormSubscribe';
import userfullData from '@/lib/userfull.json';
import Card from '@/ui/Card/Card';
import Title from '@/ui/Title/Title';
import Useful from '@/ui/Useful/Useful';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { News } from "@/lib/definitions"
import Loading from '../Loading';
import CardUserfull from '@/ui/CardUserfull/CardUserfull';
import { count } from 'console';



const UserfullPage = () => {
  const [userfull, setUserfull] = useState<News[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
      if (category) {
          const filteredNews = userfull.filter(news => news.category === category);
          setUserfull(filteredNews);
      } else {
          setUserfull(userfull);
      }
  }, [category]);
  return (
      <>
  <Navbar/>
  <Title text='Полезно знать'/>            
            <Suspense fallback={<Loading/>}>
            <CardUserfull userfullData={userfullData} count={8}/>
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