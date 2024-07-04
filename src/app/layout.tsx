import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from '@/app/context/LoadingContext';

const montserrat = Montserrat({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Etalones S&B | Работа в Европе",
  description: "Легальная работа в Европе, в компании Etalones S&B, высокая зарплата, большой выбор вакансий, отличные условия проживания и многое другое!!!! Начать работать в Европе в строительстве вместе с Etalones S&B!!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" 
    // data-theme="cupcake"
    >
      <body className={montserrat.className}>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
