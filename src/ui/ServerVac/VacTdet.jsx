'use client'
import Breadcrumbs from '@/ui/Breadcrumbs/Breadcrumbs';
import Image from 'next/image';
import { Viber } from '@/svg/viber';
import { Telegram } from '@/svg/telegram';
import { WhatsApp } from '@/svg/whatsapp';
import FormCallBack from '@/ui/FormCallBack/FormCallBack';
import Useful from '@/ui/Useful/Useful';
import Managers from '@/ui/Managers/Managers';
import Footer from '@/ui/Footer/Footer';
import Navbar from '@/ui/Navbar/Navbar';
import Title from '@/ui/Title/Title';
import Card from '../Card/Card';
import SameOneVacancy from '@/ui/SameOneVacancy/SameOneVacancy';
export default function VacTdet({ vacancy, allVacancy }){
    const {
        home_descr,
        work_descr,
        grafik,
        documents,
      } = vacancy;
    
      const documentsArray = documents ? documents.split(';') : [];
      const homeDet = home_descr ? home_descr.split(';') : [];
      const workDet = work_descr ? work_descr.split(';') : [];
      const workGrafic = grafik ? grafik.split(';') : [];

    return(
        <>
        <Navbar />
        <div className='md:w-full flex flex-col items-between gap-10 px-10'>
          <div className='flex justify-between gap-3 flex-wrap'>
            <div className='py-10 flex flex-col justify-between'>
              <h1 className='text-3xl text-red-700'>{vacancy.title}</h1>
              <Breadcrumbs title={vacancy.title || 'Нет заголовка'} prev='/vacancy' prevText='Вакансии' />
              <h3 className='text-xl text-red-800'>📍 Местоположение: <strong>{vacancy.location}</strong></h3>
            </div>
            <div className='md:p-10'>
            <Image
                src={`data:${vacancy.image.contentType};base64,${Buffer.from(vacancy.image.data).toString('base64')}`}
                alt={vacancy.image.name}
                width={400}
                height={400}
            />            </div>
          </div>
          <div className='flex flex-wrap gap-5'>
            <div className="flex flex-col items-center gap-2">
              <p className='rounded-lg bg-slate-300 p-3'>Свободно</p>
              <p>Мест: {vacancy.positions_available}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className='rounded-lg bg-slate-300 p-3'>Вознаграждение</p>
              <p>{vacancy.salary}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className='rounded-lg bg-slate-300 p-3'>Проживание</p>
              <p>{vacancy.homePrice}</p>
            </div>
          </div>
          <div>
            <div className="row opisoferta no-margin m-b-20">
              <div className="col-md-12">
                <h2 className="mb-5">Информация про работу</h2>
                <ul>
                  <li><p>Требуется <strong>{vacancy.title}</strong></p></li>
                </ul>
                <ul>
                <strong>О работе:</strong>
                {workDet.map((doc, index) => (
                  <li key={index}>{doc.trim()}</li>
                ))}
              </ul>
                <ul>
                  <strong>Быт:</strong>
                </ul>
                {homeDet.map((doc, index) => (
                  <li key={index}>{doc.trim()}</li>
                ))}
                <ul>
                  <strong>График</strong>
                  </ul>
                  {workGrafic.map((gr, index) => (
                  <li key={index}>{gr.trim()}</li>
                ))}
               
  
                <p><strong>Необходимые документы</strong></p>
               
                {documentsArray.map((doc, index) => (
                  <li key={index}>{doc.trim()}</li>
                ))}
                <p><strong>Вид договора:</strong></p>
                <ul>
                  <li>гражданско-правовой – Umowa zlecenie.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <p>Контакт менеджера:</p>
            <div className="avatar flex flex-col items-center">
              <div className="rounded-full">
                <Image src={vacancy.manager || "/default-image.png"} width={200} height={200} alt='manager' />
              </div>
            </div>
            <p>{vacancy.contact}</p>
            <div className="flex gap-2 w-max justify-between mt-4">
              <a href={vacancy.manager.viber} target='blank' className="transition-transform transform hover:scale-110 "><Viber width={30} height={30} /></a>
              <a href={vacancy.manager.telegram} target='blank' className="transition-transform transform hover:scale-110 "><Telegram width={30} height={30} /></a>
              <a href={vacancy.manager.whatsapp} target='blank' className="transition-transform transform hover:scale-110 "><WhatsApp width={30} height={30} /></a>
            </div>
          </div>
        </div>
        <FormCallBack />
        <Title text='Похожие вакансии'/>
        {/* <SameOneVacancy category={vacancy.category || ""} vacancies={vacancy} /> */}
        <Card count={3} />
        <Useful />
        <Managers />
        <Footer />
      </>
    )
}