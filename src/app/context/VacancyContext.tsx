'use client'
// // app/context/VacancyContext.tsx
// import { createContext, useContext, useState, useEffect } from "react";

// // Создаем контекст
// const vacancyContext = createContext<any>({});

// // Интерфейс для детей провайдера
// interface Props {
//   children: React.ReactNode;
// }

// // Компонент провайдера контекста
// export const VacancyContextProvider = ({ children }: Props) => {
//   // Состояние для хранения данных о вакансиях
//   const [vacancies, setVacancies] = useState<any[]>([]);
//   const [urgentVacancies, setUrgentVacancies] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Функция для загрузки всех вакансий
//   const fetchAllVacancies = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/vacancy");
//       // const response = await fetch("https://www.etalones.com/api/vacancy");

//       const data = await response.json();
//       setVacancies(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Ошибка при загрузке всех вакансий:", error);
//       setLoading(false);
//     }
//   };

//   // Функция для загрузки срочных вакансий
//   const fetchUrgentVacancies = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/vacancy/urgently");
//       // const response = await fetch("https://www.etalones.com/api/vacancy/urgently");

//       const data = await response.json();
//       setUrgentVacancies(data);
//     } catch (error) {
//       console.error("Ошибка при загрузке срочных вакансий:", error);
//     }
//   };

//   // useEffect для загрузки данных при монтировании компонента
//   useEffect(() => {
//     fetchAllVacancies();
//     fetchUrgentVacancies();
//   }, []);

//   return (
//     <vacancyContext.Provider value={{ vacancies, urgentVacancies, loading }}>
//       {children}
//     </vacancyContext.Provider>
//   );
// };

// // Хук для использования контекста в других компонентах
// export const useVacancyContext = () => useContext(vacancyContext);
// app/context/VacancyContext.tsx
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
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  // Функция для загрузки вакансий с сервера
  const fetchVacancies = async (page: number) => {
    try {
      const response = await fetch(`/api/vacancy?page=${page}&limit=1`);
      const data = await response.json();
      setVacancies(prevVacancies => [...prevVacancies, ...data]);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке вакансий:", error);
      setLoading(false);
    }
  };

  // Функция для загрузки срочных вакансий с сервера
  const fetchUrgentVacancies = async () => {
    try {
      const response = await fetch(`/api/vacancy/urgently`);
      const data = await response.json();
      setUrgentVacancies(data);
    } catch (error) {
      console.error("Ошибка при загрузке срочных вакансий:", error);
    }
  };

  // useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    fetchVacancies(page);
  }, [page]);

  // useEffect для загрузки срочных вакансий при монтировании компонента
  useEffect(() => {
    fetchUrgentVacancies();
  }, []);

  return (
    <vacancyContext.Provider value={{ vacancies, urgentVacancies, loading, setPage }}>
      {children}
    </vacancyContext.Provider>
  );
};

// Хук для использования контекста в других компонентах
export const useVacancyContext = () => useContext(vacancyContext);
