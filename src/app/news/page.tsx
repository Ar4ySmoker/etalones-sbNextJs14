'use client'

import Footer from '@/ui/Footer/Footer';
import FormCallBack from '@/ui/FormCallBack/FormCallBack';
import FormSubscribe from '@/ui/FormSubscribe/FormSubscribe';
import Title from '@/ui/Title/Title';
import Useful from '@/ui/Useful/Useful';
import { Suspense } from 'react';
import CardNews from '@/ui/CardNews/CardNews';
import Loading from '../Loading';
import ServerVac from '@/ui/ServerVac/ServerVac';



const NewsPage = () => {

  return (
      <>
  <Title text='Новости'/>
  {/* <div className="tabs justify-center flex flex-wrap mb-6 font-bold">
                <a className={`tab ${!category ? 'tab-active' : ''}`} onClick={() => router.push('/news')}>Все</a>
                <a className={`tab ${category === 'industry' ? 'tab-active' : ''}`} onClick={() => router.push('/news?category=home')}>Дом</a>
                <a className={`tab ${category === 'technology' ? 'tab-active' : ''}`} onClick={() => router.push('/news?category=journeys')}>Путешествия</a>
                <a className={`tab ${category === 'environment' ? 'tab-active' : ''}`} onClick={() => router.push('/news?category=environment')}>Охрана окружающей среды</a>
                <a className={`tab ${category === 'business' ? 'tab-active' : ''}`} onClick={() => router.push('/news?category=business')}>Бизнес</a>
            </div> */}
            
            <Suspense fallback={<Loading/>}>
            <CardNews />
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