import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" 
    // data-theme="cupcake"
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
