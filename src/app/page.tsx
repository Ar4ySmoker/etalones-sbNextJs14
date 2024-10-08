'use client'
import FormCallBack from "../ui/FormCallBack/FormCallBack";
import FormSubscribe from "../ui/FormSubscribe/FormSubscribe";
import Hero from "../ui/Hero/Hero";
import News from "../ui/News/News";
import Title from "@/ui/Title/Title";
import Button from "@/ui/Buttons/Button";
import Link from "next/link";
import Useful from '@/ui/Useful/Useful';
import Card from "@/ui/VacancyUrgently/VacancyUrgently";
import { useEffect, useState } from 'react';
import SplashScreen from "@/ui/SplashScreen/SplashScreen";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLoadingComplete = () => {
    setIsAnimating(true); // Начинаем анимацию сворачивания
    setTimeout(() => {
      setIsLoading(false); // Скрываем сплэш-экран после анимации
    }, 1000); // Длительность анимации
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');

    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true'); // Запоминаем, что пользователь уже посещал сайт
    }

    const timer = setTimeout(() => {
      setIsLoading(false); // Скрываем сплэш-экран через 3 секунды
    }, 3000); // 3 секунды

    return () => clearTimeout(timer);
  }, []);



  function getCurrentDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  }

  const categories = ['indor', 'outdoor', 'krovl', 'no-experience', 'santehnic', 'derevo', 'zavod', 'tehnic', 'kamen', 'beton', 'electric', 'metal', 'outdor', 'noexp'];

  return (
    <>
    
    <SplashScreen onComplete={handleLoadingComplete} isAnimating={isAnimating} />
    <div className="bg-base-200">
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
      
    </div>
    </>
  );
}
