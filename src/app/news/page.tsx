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

            
            <Suspense fallback={<Loading/>}>
            <CardNews  />
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