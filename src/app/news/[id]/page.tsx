'use client'
import { useSearchParams, useRouter } from 'next/navigation'; 
import news from '@/lib/news.json';

interface NewsArticle {
  id: string;
  date: string;
  title: string;
  sections: {
    heading: string | null;
    paragraphs: string[];
  }[];
}

const NewsArticlePage = () => {
  const router = useRouter(); // Используем useRouter
  const searchParams = useSearchParams(); // Используем useSearchParams
  const id = searchParams.get('id');

  // Найти новость с помощью идентификатора из URL
  const article: NewsArticle | undefined = news.find((article) => article.id === id);

  if (!article) {
    // Если статья не найдена, показываем сообщение об ошибке
    return <div>Статья не найдена</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-4">{article.date}</p>
      {article.sections.map((section, index) => (
        <div key={index} className="mb-8">
          {section.heading && <h2 className="text-xl font-semibold mb-4">{section.heading}</h2>}
          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-2">{paragraph}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NewsArticlePage;
