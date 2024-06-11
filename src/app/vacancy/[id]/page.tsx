import { redirect } from 'next/navigation';
import vacancies from '@/lib/vacancy.json';
import Breadcrumbs from '@/ui/Breadcrumbs/Breadcrumbs';
import Image from 'next/image';
import { Vacancy } from '@/lib/definitions';
import { Viber } from '@/svg/viber';
import { Telegram } from '@/svg/telegram';
import { WhatsApp } from '@/svg/whatsapp';
import FormCallBack from '@/ui/FormCallBack/FormCallBack';
import Useful from '@/ui/Useful/Useful';
import Managers from '@/ui/Managers/Managers';
import Footer from '@/ui/Footer/Footer';
import Navbar from '@/ui/Navbar/Navbar';

// type Vacancy = {
//   _id: string;
//   job_title: string;
//   location: string;
//   image: string;

// };

async function fetchVacancy(id: string): Promise<Vacancy | null> {
  const vacancy = vacancies.find((v: Vacancy) => v._id === id);
  return vacancy || null;
}

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { id } = params;

  // Логирование полученного id
  console.log("Полученный ID:", id);

  const vacancy = await fetchVacancy(id);

  if (!vacancy) {
    redirect('/404'); // Перенаправление на страницу 404, если вакансия не найдена
  }
  const documents = vacancy.documents ? vacancy.documents.split(',') : [];
  const homeDet = vacancy.home_descr ? vacancy.home_descr.split(',') : [];
  const workDet = vacancy.work_descr ? vacancy.work_descr.split(',') : [];
  

  return (


    <>
      <Navbar />
      <div className='md:w-full flex flex-col items-between gap-10 px-10'>
        <div className='flex justify-between gap-3 flex-wrap'>
          <div className='py-10 flex flex-col justify-between'>
            <h1 className='text-3xl text-red-700'>{vacancy.job_title}</h1>
            <Breadcrumbs title={vacancy.job_title || 'Нет заголовка'} />
            <h3 className='text-xl text-red-800'>📍 Местоположение: <strong>{vacancy.location}</strong></h3>
          </div>
          <div className='md:p-10'>
            <Image src={vacancy.image || '/default-image.png'} width={300} height={300} alt={vacancy.job_title || "noImage"} />
          </div>
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
                <li><p>Требуется <strong>{vacancy.job_title}</strong></p></li>
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
                <p><strong>График</strong></p>
                <li>{vacancy.grafik}</li>
              </ul>

              <p><strong>Необходимые документы</strong></p>
             
                {documents.map((doc, index) => (
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
              <Image src={vacancy.managerImg || "/default-image.png"} width={200} height={200} alt='manager' />
            </div>
          </div>
          <p>{vacancy.contact}</p>
          <div className="flex gap-2 w-max justify-between mt-4">
            <a href={vacancy.viber} className="transition-transform transform hover:scale-110 "><Viber width={30} height={30} /></a>
            <a href={vacancy.telegram} className="transition-transform transform hover:scale-110 "><Telegram width={30} height={30} /></a>
            <a href={vacancy.whatsapp} className="transition-transform transform hover:scale-110 "><WhatsApp width={30} height={30} /></a>
          </div>
        </div>
      </div>
      <FormCallBack />
      <Useful />
      <Managers />
      <Footer />
    </>



  );
}
