'use client'; // Добавляем директиву 'use client' перед компонентом

import { useEffect, useState } from "react";
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

export default  function Page() {
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
      <Navbar />
      <Managers/>
      <FormCallBack/>
      <Useful/>
      <Title text={"Похожие объявления"}/>
      <Card count={3} vacancies={vacancies}/>
      <Footer />
    </>
  );
}
