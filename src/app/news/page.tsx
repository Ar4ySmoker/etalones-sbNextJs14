'use client'
import vacancies from '@/lib/vacancy.json';
import Navbar from '@/ui/Navbar/Navbar';
import Footer from '@/ui/Footer/Footer';
import FormCallBack from '@/ui/FormCallBack/FormCallBack';
import FormSubscribe from '@/ui/FormSubscribe/FormSubscribe';
import Card from '@/ui/Card/Card';
import Title from '@/ui/Title/Title';
import Useful from '@/ui/Useful/Useful';



const NewsPage = () => {
  return (
  <>
  <Navbar/>
  <FormCallBack/>
  <Title text='Актуальные вакансии'/>
  <Card count={3} vacancies={vacancies}/>
  <Useful/>
  <FormSubscribe/>
  <Footer/>
  </>
  );
};

export default NewsPage