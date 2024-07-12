'use client'
// app/context/VacancyContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

// Создаем контекст
const vacancyContext = createContext<any>({});

// Интерфейс для детей провайдера
interface Props {
  children: React.ReactNode;
}

// Компонент провайдера контекста
export const VacancyContextProvider = ({ children }: Props) => {
  // Состояние для хранения данных о вакансиях
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [urgentVacancies, setUrgentVacancies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Функция для загрузки всех вакансий
  const fetchAllVacancies = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/vacancy");
      const data = await response.json();
      setVacancies(data);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке всех вакансий:", error);
      setLoading(false);
    }
  };

  // Функция для загрузки срочных вакансий
  const fetchUrgentVacancies = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/vacancy/urgently");
      const data = await response.json();
      setUrgentVacancies(data);
    } catch (error) {
      console.error("Ошибка при загрузке срочных вакансий:", error);
    }
  };

  // useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    fetchAllVacancies();
    fetchUrgentVacancies();
  }, []);

  return (
    <vacancyContext.Provider value={{ vacancies, urgentVacancies, loading }}>
      {children}
    </vacancyContext.Provider>
  );
};

// Хук для использования контекста в других компонентах
export const useVacancyContext = () => useContext(vacancyContext);
