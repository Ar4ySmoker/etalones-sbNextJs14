import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from '@/app/context/LoadingContext';
import { VacancyContextProvider } from "./context/VacancyContext";
import Navbar from "@/ui/Navbar/Navbar";
import Footer from "@/ui/Footer/Footer";
import { ModalProvider } from "@/context/ModalContext";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { Provider } from "./Provider";
import NotificationManager from "@/notification/NotificationManager";

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
        <Provider>
      <ModalProvider>
      <NotificationManager>
        <Navbar />
        <LoadingProvider>
        <VacancyContextProvider>
          <GoogleTagManager gtmId="G-TPYV7NLY4X" />
          {children}
          <GoogleAnalytics gaId="AW-16715855087" />

          <Footer />
          </VacancyContextProvider>
        </LoadingProvider>
        </NotificationManager>
          </ModalProvider>
          </Provider>
      </body>
    </html>
  );
}
