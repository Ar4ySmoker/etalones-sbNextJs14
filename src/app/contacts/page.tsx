'use client'; // Добавляем директиву 'use client' перед компонентом

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import Card from "@/ui/Card/Card";
import Footer from "@/ui/Footer/Footer";
import FormCallBack from "@/ui/FormCallBack/FormCallBack";
import Managers from "@/ui/Managers/Managers";
import Navbar from "@/ui/Navbar/Navbar";
import Useful from "@/ui/Useful/Useful";
import { Vacancy } from "@/lib/definitions";
import vacanciesData from "@/lib/vacancy.json"; // Import vacanciesData here
import Title from "@/ui/Title/Title";

function VacanciesComponent() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    if (category) {
      const filteredVacancies = vacanciesData.filter((vacancy: Vacancy) => vacancy.category === category); // Explicitly type vacancy as Vacancy
      setVacancies(filteredVacancies);
    } else {
      setVacancies(vacanciesData);
    }
  }, [category]);

  return (
    <>
      <Title text={"Похожие объявления"} />
      <Card count={3} vacancies={vacancies} />
    </>
  );
}

export default function Page() {
  return (
    <>
      <Navbar />
      <Managers />
      <FormCallBack />
      <Useful />
      <Suspense fallback={<div>Loading...</div>}>
        <VacanciesComponent />
      </Suspense>
      <Footer />
    </>
  );
}
