'use client'
import { createContext, useContext, useState, useEffect } from "react";

// Создаем контекст
const newsContext = createContext<any>({});

// Интерфейс для детей провайдера
interface Props {
  children: React.ReactNode;
}

// Компонент провайдера контекста
export const NewsContextProvider = ({ children }: Props) => {
  // Состояние для хранения данных о новостях
  const [news, setNews] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  // Функция для загрузки новостей с сервера
  const fetchNews = async (page: number) => {
    try {
      const response = await fetch(`/api/news?page=${page}&limit=4`);
      const data = await response.json();
      setNews(prevNews => [...prevNews, ...data.news]);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке новостей:", error);
      setLoading(false);
    }
  };

  // useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    fetchNews(page);
  }, [page]);

  return (
    <newsContext.Provider value={{ news, loading, setPage }}>
      {children}
    </newsContext.Provider>
  );
};

// Хук для использования контекста в других компонентах
export const useNewsContext = () => useContext(newsContext);
