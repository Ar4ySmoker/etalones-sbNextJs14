import { redirect } from 'next/navigation';
import vacancies from '@/lib/vacancy.json';

type Vacancy = {
  _id: string;
  job_title: string;
  // Добавьте здесь другие поля, если они есть в вашей структуре данных
};

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

  return (
    <>
      <div>Детали по вакансии с ID: {id}</div>
      <h1>{vacancy.job_title}</h1>
    </>
  );
}
