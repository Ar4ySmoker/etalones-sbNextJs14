'use client'
import Navbar from '@/ui/Navbar/Navbar';
import Footer from '@/ui/Footer/Footer';
import FormCallBack from '@/ui/FormCallBack/FormCallBack';
import FormSubscribe from '@/ui/FormSubscribe/FormSubscribe';
import userfullData from '@/lib/userfull.json';
import Title from '@/ui/Title/Title';
import Useful from '@/ui/Useful/Useful';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { News } from "@/lib/definitions"
import Loading from '../Loading';
import CardUserfull from '@/ui/CardUserfull/CardUserfull';
import ServerVac from '@/ui/ServerVac/ServerVac';



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
  <Title text='Полезно знать'/>            
            <Suspense fallback={<Loading/>}>
            <CardUserfull userfullData={userfullData} count={8}/>
            </Suspense>
  <FormCallBack/>
  <Title text={'Актуальные вакансии'}/>
  <Suspense fallback={<Loading/>}>
  <ServerVac vacanciesCount={3}/>
  </Suspense>
  <Useful/>
  <FormSubscribe/>
  <Footer/>
  </>
  );
};

export default UserfullPage