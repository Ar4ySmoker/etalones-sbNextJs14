'use client'

import Footer from '@/ui/Footer/Footer';
import FormCallBack from '@/ui/FormCallBack/FormCallBack';
import FormSubscribe from '@/ui/FormSubscribe/FormSubscribe';
import Title from '@/ui/Title/Title';
import Useful from '@/ui/Useful/Useful';
import { Suspense } from 'react';
import Loading from '../Loading';
import ServerVac from '@/ui/ServerVac/ServerVac';
// import NewsList from '@/ui/NewsPrimary/NewsPrimary';
import CardNews from '@/ui/CardNews/CardNews';



const NewsPage = () => {

  return (
      <>
  <Title text='Новости'/>

            {/* <NewsList/> */}
            <Suspense fallback={<Loading/>}>
            <CardNews category={undefined} currentNewsId={undefined}  />
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