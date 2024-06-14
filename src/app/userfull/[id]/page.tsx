import { redirect } from 'next/navigation';
import userfull from '@/lib/userfull.json';
import Breadcrumbs from '@/ui/Breadcrumbs/Breadcrumbs';
import Image from 'next/image';
import { Userfull } from '@/lib/definitions';
import FormCallBack from '@/ui/FormCallBack/FormCallBack';
import Useful from '@/ui/Useful/Useful';
import Managers from '@/ui/Managers/Managers';
import Footer from '@/ui/Footer/Footer';
import Navbar from '@/ui/Navbar/Navbar';
import CardNews from '@/ui/CardNews/CardNews';
import Title from '@/ui/Title/Title';
import Link from 'next/link'; // Импортируем компонент Link для навигации

// Функция для загрузки конкретной новости по идентификатору
async function fetchNews(id: string): Promise<Userfull | null> {
  const selectedNews = userfull.find((n: Userfull) => n._id === id);
  return selectedNews || null;
}

// Тип пропсов страницы
type PageProps = {
  params: {
    id: string;
  };
};

// Основная функция страницы
export default async function Page({ params }: PageProps) {
  const { id } = params;

  // Логирование полученного id
  console.log("Полученный ID:", id);

  // Загрузка выбранной новости
  const selectedNews = await fetchNews(id);

  // Проверка наличия выбранной новости
  if (!selectedNews) {
    redirect('/404'); // Перенаправление на страницу 404, если новость не найдена
    return null; // Возвращаем null, чтобы избежать ошибки компиляции
  }

  return (
    <>
      <Navbar />
      <div className="tabs justify-center flex flex-wrap mb-6 font-bold">
        {/* Используем компонент Link для перехода на другие страницы */}
        <Link href="/userfull/1">
          <p className='tab'>Как купить билет</p>
        </Link>
        <Link href="/userfull/2">
          <p className='tab'>Как открыть евро счёт в банке</p>
        </Link>
        <Link href="/userfull/3">
          <p className='tab'>Как открыть Pesel (налоговый номер)</p>
        </Link>
        <Link href="/userfull/4">
          <p className='tab'>Как податься на карту Побыта</p>
        </Link>
        <Link href="/userfull/5">
          <p className='tab'>Как просмотреть на карте в каких городах есть вакансии</p>
        </Link>
        <Link href="/userfull/6">
          <p className='tab'>Как открыть и продлить визу</p>
        </Link>
      </div>
      <div className="mx-auto lg:p-16 md:p-8 sm:p-4 min-w-0 md:w-[800px] flex-auto lg:static lg:max-h-full lg:overflow-visible">
        <div className="w-full flex">
          <div className="min-w-0 flex-auto items-center px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{selectedNews.title}</h1>
            <Breadcrumbs prev='/userfull' title={selectedNews.title || 'Нет заголовка'} prevText='Полезно знать' />

            <div className='flex justify-center'>
              {selectedNews.image && (
                <Image src={selectedNews.image || '/default-image.png'} width={400} height={400} alt={selectedNews.title || "noImage"} />
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{selectedNews.h2}</h2>
            <div className="mt-5 text-base  text-center">
              {selectedNews.content?.article?.map((article, index) => (
                <div key={index}>
                  <h3 className='font-bold mb-5'>{article.title}</h3>
                  {article.image && (
                    <Image src={article.image} width={400} height={400} alt={article.title || ""} />
                  )}
                  <p className='font-medium mb-3'>{article.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div>Источник: <a href={selectedNews.source} target='blank'>{selectedNews.source}</a></div>
        </div>
      </div>
      <Title text='Другие новости' />
      <FormCallBack />
      <Useful />
      <Managers />
      <Footer />
    </>
  );
}
