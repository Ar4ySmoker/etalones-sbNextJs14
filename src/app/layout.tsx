import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from '@/app/context/LoadingContext';
import { VacancyContextProvider } from "./context/VacancyContext";
import Navbar from "@/ui/Navbar/Navbar";
import Footer from "@/ui/Footer/Footer";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"
import { ModalProvider } from "@/context/ModalContext";
import { GoogleAnalytics } from '@next/third-parties/google'

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
      <ModalProvider>

        <Navbar />
        <LoadingProvider>
        <VacancyContextProvider>
          {children}
          <GoogleAnalytics gaId="AW-16715855087" />
          <Footer />
          </VacancyContextProvider>
        </LoadingProvider>
        <Analytics />
          <SpeedInsights />
          </ModalProvider>
      </body>
    </html>
  );
}
