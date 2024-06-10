// lib/types.ts
export interface Section {
    heading: string;
    paragraphs: string[];
  }
  
 // app/lib/types.ts
export interface NewsArticle {
    id: String; // Изменим тип на number, если id является числом
    date: string;
    title: string;
    sections: {
      heading: string | null;
      paragraphs: string[];
    }[];
  }
  
  