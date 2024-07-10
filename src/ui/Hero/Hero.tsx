// pages/index.tsx

import Link from 'next/link';
import React, { useEffect } from 'react';
import CountUp from 'react-countup';
import { useVacancyContext } from '@/app/context/VacancyContext';

const Home: React.FC = () => {
  const { vacancies, loading } = useVacancyContext();

  // Вычисляем количество вакансий и свободных мест
  const vacancyCount = vacancies.length;
  const totalPositionsAvailable = vacancies.reduce(
    (acc: number, vacancy: { positions_available: string; }) => acc + parseInt(vacancy.positions_available),
    0
  );

  // Используем useEffect только для загрузки данных при монтировании компонента
  useEffect(() => {
    // Тут можно оставить пустое тело, так как данные уже загружены через контекст
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="hero min-h-[500px]" style={{ backgroundImage: 'url(/images/primary.jpg)' }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-10 text-5xl font-bold">Ищете работу в Европе?</h1>
          <p className="mb-5 text-xl text-shadow-xl">
            На данный момент открыто <strong><CountUp end={vacancyCount} duration={4} /></strong> вакансий,<br />
            и <strong><CountUp end={totalPositionsAvailable} duration={4} /></strong> свободных мест
          </p>

          <Link href='/vacancy' className="btn bg-gradient-red text-white">Смотреть предложения</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
