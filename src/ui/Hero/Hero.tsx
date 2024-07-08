// pages/index.js (или файл твоей главной страницы)

'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';

export default function Home() {
  const [vacancyCount, setVacancyCount] = useState(0);
  const [totalPositionsAvailable, setTotalPositionsAvailable] = useState(0);

  const fetchVacancies = async () => {
    try {
      const response = await fetch('https://www.etalones.com/api/vacancy');
      const data = await response.json();

      const vacancyCount = data.length;
      const totalPositionsAvailable = data.reduce((acc: number, vacancy: { positions_available: string; }) => acc + parseInt(vacancy.positions_available), 0);

      setVacancyCount(vacancyCount);
      setTotalPositionsAvailable(totalPositionsAvailable);
    } catch (error) {
      console.error("Ошибка при загрузке вакансий:", error);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

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
