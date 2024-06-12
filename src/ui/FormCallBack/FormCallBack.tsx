'use client'
import { useState, useEffect } from "react";
import Button from "../Buttons/Button";
import { sendMessage } from "@/api/telegram/telegram";

export default function FormCallBack() {
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
                Страница: ${currentPage} // включаем текущую страницу в сообщение
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
        <div className="container mx-auto px-4">
            <div className="w-full">
                <h3 className="text-2xl">Оставьте свой номер телефона и мы сразу свяжемся с Вами.</h3>
                <p>Назначьте время разговора с нами и мы поможем Вам выбрать вакансию и ответим на Ваши вопросы.</p>
                <form onSubmit={handleSubmit} className="flex flex-wrap justify-center w-max items-center">
                    <input 
                        className="input input-bordered" 
                        placeholder="Имя" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange} 
                    />
                    {errors.name && <span className="text-red-500">{errors.name}</span>}
                    
                    <input 
                        className="input input-bordered" 
                        placeholder="Номер телефона" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange} 
                    />
                    {errors.phone && <span className="text-red-500">{errors.phone}</span>}
                    
                    <select 
                        className="select select-bordered" 
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                    >
                        <option disabled value="">Время звонка</option>
                        <option>8:00-10:00</option>
                        <option>10:00-12:00</option>
                        <option>12:00-14:00</option>
                        <option>14:00-16:00</option>
                        <option>16:00-18:00</option>
                        <option>После работы</option>
                    </select>
                    {errors.time && <span className="text-red-500">{errors.time}</span>}
                    
                    <Button text="Заказать звонок" isSubmit={true} />

                </form>
            </div>
        </div>
    );
}
