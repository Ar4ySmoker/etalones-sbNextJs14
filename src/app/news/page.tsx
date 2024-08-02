'use client'

import FormCallBack from '@/ui/FormCallBack/FormCallBack';
import FormSubscribe from '@/ui/FormSubscribe/FormSubscribe';
import Title from '@/ui/Title/Title';
import Useful from '@/ui/Useful/Useful';
import { Suspense } from 'react';
import Loading from '../Loading';
// import NewsList from '@/ui/NewsPrimary/NewsPrimary';
import CardNews from '@/ui/CardNews/CardNews';
import Card from '@/ui/VacancyUrgently/VacancyUrgently';



const NewsPage = () => {

  return (
      <>
  <Title text='Новости'/>
            {/* <NewsList/> */}
            <Suspense fallback={<Loading/>}>
            <CardNews newsCount={undefined} />
            </Suspense>
  <FormCallBack/>
  <Title text={'Подобные вакансии'}/>
  <Suspense fallback={<Loading/>}>
<Card count={3}/>
  </Suspense>
  <Useful/>
  <FormSubscribe/>
  </>
  );
};

export default NewsPage