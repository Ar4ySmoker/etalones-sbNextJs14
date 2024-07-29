'use client'
import Footer from '@/ui/Footer/Footer';
import FormCallBack from '@/ui/FormCallBack/FormCallBack';
import FormSubscribe from '@/ui/FormSubscribe/FormSubscribe';
import Title from '@/ui/Title/Title';
import Useful from '@/ui/Useful/Useful';
import { Suspense } from 'react';
import Loading from '../Loading';
import ServerVac from '@/ui/ServerVac/ServerVac';
import CardNews from '@/ui/CardNews/CardNews';



const UserfullPage = () => {

  return (
      <>
  <Title text='Полезно знать'/>            
            <Suspense fallback={<Loading/>}>
            {/* <CardUserfull userfullData={userfullData} count={8}/> */}
            <CardNews category='Полезно знать' currentNewsId={undefined}/>
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