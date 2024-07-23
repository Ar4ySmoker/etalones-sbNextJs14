'use client'
import Navbar from "@/ui/Navbar/Navbar";
import Image from "next/image";
import {Star} from '@/svg/star'
import {Medal} from '@/svg/medal'
import {Box} from '@/svg/box'
import Button from "@/ui/Buttons/Button";
import { sendMessage } from "@/app/api/telegram/telegram";
import { useState, useEffect } from "react";
import Link from "next/link";
import FormCallBack from "@/ui/FormCallBack/FormCallBack";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
      name: '',
      phone: '',
      time: '',
      currentPage: '', // добавляем поле для текущей страницы
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
      setFormData((prevData) => ({
          ...prevData,
          currentPage: window.location.href // получаем текущий URL при монтировании компонента
      }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
      setErrors({
          ...errors,
          [e.target.name]: ''
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { name, phone, time, currentPage } = formData;

      if (!name.trim()) {
          setErrors({ ...errors, name: 'Введите имя' });
          return;
      }
      if (!phone.trim()) {
          setErrors({ ...errors, phone: 'Введите телефон' });
          return;
      }
      if (!time.trim()) {
          setErrors({ ...errors, time: 'Выберите время звонка' });
          return;
      }

      try {
          const message = `
              Имя: ${name}
              Телефон: ${phone}
              Время звонка: ${time}
              Страница: ${currentPage} 
          `;
          setIsLoading(true);
          await sendMessage(message);
          alert('Запрос на звонок отправлен!');
          setFormData({ name: '', phone: '', time: '', currentPage: '' });
      } catch (error) {
          setErrors({ ...errors, name: 'Ошибка при отправке сообщения' });
      } finally {
          setIsLoading(false);
      }
  };

    return (
        <>
     <div className="hero  bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
  <div className="max-w-sm rounded-lg shadow-2xl overflow-hidden">
            <Image src="/images/women-2.jpg" width={400} height={400} alt="" className="w-full h-full object-cover" />
        </div>

    <div>
      <h1 className="text-5xl font-bold">Etalones S&B</h1>
      <p className="py-6">Присоединяйтесь к нашей уникальной партнерской программе и откройте новые возможности для вашего бизнеса с Etalones S&B! Рекомендуйте наши качественные услуги и зарабатывайте вместе с нами.</p>
      <Link href="#form"><Button text={"Подать заявку на партнерство"} className="btn btn-outline btn-error"/> </Link>
    </div>
  </div>
  
</div>

<div className="flex flex-wrap gap-3 justify-center p-3  md:flex-nowrap">
  <div className="flex flex-col items-center gap-3 bg-base-300 rounded-lg glass text-center place-content-center p-5 w-full md:w-1/3">
    <Star width={100} height={100} fill={"#A60000"}/>
    <p className="font-bold text-[#A60000]">Лучшее предложение на рынке рекрутинга.</p>
  </div> 
  <div className="flex flex-col items-center gap-3 bg-base-300 rounded-lg glass text-center place-content-center p-5 w-full md:w-1/3">
    <Medal width={100} height={100} fill={"#A60000"}/>
    <p className="font-bold text-[#A60000]">Без скрытых условий и нюансов</p>
  </div> 
  <div className="flex flex-col items-center gap-3 bg-base-300 rounded-lg glass text-center place-content-center p-5 w-full md:w-1/3">
    <Box width={100} height={100} fill={"#A60000"}/>
    <p className="font-bold text-[#A60000]">Бонусы от 200€ до 500€ уже с первого месяца работы</p>
  </div>
</div>
<div id="form">
<FormCallBack />
</div>
        </>
      
    );
  }
  