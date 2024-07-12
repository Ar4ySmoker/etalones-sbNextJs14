import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const Home: React.FC = () => {
  const [vacancyCount, setVacancyCount] = useState<number>(0);
  const [totalPositionsAvailable, setTotalPositionsAvailable] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setVacancyCount(data.vacancyCount);
        setTotalPositionsAvailable(data.availablePositions);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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
            На данный момент открыто <strong>
              <CountUp end={vacancyCount} duration={4} />
            </strong> вакансий,<br />
            и <strong>
              <CountUp end={totalPositionsAvailable} duration={4} />
            </strong> свободных мест
          </p>

          <Link href='/vacancy' className="btn bg-gradient-red text-white">Смотреть предложения</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
