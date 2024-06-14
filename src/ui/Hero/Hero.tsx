// pages/index.js (or your homepage file)

import Link from 'next/link';
import vacanciesData from '@/lib/vacancy.json';

export default function Home() {
  // Counting the number of vacancies
  const vacancyCount = vacanciesData.length;
  const totalPositionsAvailable = vacanciesData.reduce((acc, vacancy) => acc + vacancy.positions_available, 0);

  return (
    <div className="hero min-h-[500px]" style={{backgroundImage: 'url(/images/primary.jpg)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-10 text-5xl font-bold">Ищете работу в Европе?</h1>
          <p className="mb-5 text-xl text-shadow-xl">На данный момент открыто <strong>{vacancyCount}</strong> вакансий,<br />и <strong>{totalPositionsAvailable}</strong> свобонных мест</p>

          <Link href='/vacancy' className="btn bg-gradient-red text-white">Смотреть предложения</Link>
        </div>
      </div>
    </div>
  );
}
