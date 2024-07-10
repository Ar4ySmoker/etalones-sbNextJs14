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
  const [loading, setLoading] = useState<boolean>(true);

  // Функция для загрузки вакансий
  const fetchVacancies = async () => {
    try {
      const response = await fetch("https://www.etalones.com/api/vacancy");
    //   const response = await fetch("http://localhost:3000/api/vacancy");

      const data = await response.json();
      setVacancies(data);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке вакансий:", error);
      setLoading(false);
    }
  };

  // useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    fetchVacancies();
  }, []);

  return (
    <vacancyContext.Provider value={{ vacancies, loading }}>
      {children}
    </vacancyContext.Provider>
  );
};

// Хук для использования контекста в других компонентах
export const useVacancyContext = () => useContext(vacancyContext);
