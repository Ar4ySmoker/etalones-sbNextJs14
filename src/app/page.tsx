'use client'

import Managers from "@/ui/Managers/Managers";
import Footer from "../ui/Footer/Footer";
import FormCallBack from "../ui/FormCallBack/FormCallBack";
import FormSubscribe from "../ui/FormSubscribe/FormSubscribe";
import Hero from "../ui/Hero/Hero";
import Navbar from "../ui/Navbar/Navbar";
import News from "../ui/News/News";
import Useful from "../ui/Useful/Useful";
import VacancyFresh from "../ui/VacancyFresh/VacancyFresh";



export default function Home() {
  const categories = ['indor', 'outdoor', 'krovl', 'no-experience', 'santehnic', 'derevo', 'zavod', 'tehnic', 'kamen', 'beton', 'electric', 'metal', 'outdor', 'noexp'];

  return (
    <div className="bg-base-200">
    <Navbar />
    <Hero />
    <FormCallBack/>
    <VacancyFresh/>
    <Useful/>
    <News/>
    {/* <CarouselManager/> */}
    <Managers/>
    <FormSubscribe/>
    <Footer/>
    </div>
  );
}
