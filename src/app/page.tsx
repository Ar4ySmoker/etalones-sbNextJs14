'use client';

import Footer from "../ui/Footer/Footer";
import FormCallBack from "../ui/FormCallBack/FormCallBack";
import FormSubscribe from "../ui/FormSubscribe/FormSubscribe";
import Hero from "../ui/Hero/Hero";
import Navbar from "../ui/Navbar/Navbar";
import News from "../ui/News/News";
import Title from "@/ui/Title/Title";
import Button from "@/ui/Buttons/Button";
import Link from "next/link";
import Useful from '@/ui/Useful/Useful';
import Card from "@/ui/VacancyUrgently/VacancyUrgently";

export default function Home() {



  function getCurrentDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  }

  const categories = ['indor', 'outdoor', 'krovl', 'no-experience', 'santehnic', 'derevo', 'zavod', 'tehnic', 'kamen', 'beton', 'electric', 'metal', 'outdor', 'noexp'];

  return (
    <div className="bg-base-200">
      <Navbar />
      <Hero />
      <FormCallBack />
      <Title text={`Актуальные вакансии на ${getCurrentDate()}`} />
      <Card count={3}/>
      <Link href="/vacancy" className="flex justify-center">
        <Button text={"Больше"} className="btn btn-outline btn-error mx-auto" />
      </Link>
      <Useful />
      <News />
      <FormSubscribe />
      <Footer />
    </div>
  );
}
