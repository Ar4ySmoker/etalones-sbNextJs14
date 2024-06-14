import Navbar from "@/ui/Navbar/Navbar";
import Image from "next/image";
import {Star} from '@/svg/star'
import {Medal} from '@/svg/medal'
import {Box} from '@/svg/box'
import Button from "@/ui/Buttons/Button";

export default function Page() {
    return (
        <>
        <Navbar/>
     <div className="hero  bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
  <div className="max-w-sm rounded-lg shadow-2xl overflow-hidden">
            <Image src="/images/hero/partnerHero.jpg" width={400} height={400} alt="" className="w-full h-full object-cover" />
        </div>

    <div>
      <h1 className="text-5xl font-bold">Профессиональный подбор кандидатов</h1>
      <p className="py-6">Мы берем на себя все аспекты, связанные с подбором работников, и также эффективно и оперативно оформляем их легализацию для работы за рубежом.</p>
      <Button text={"Подать заявку на партнерство"} className="btn btn-outline btn-error"/>
    </div>
  </div>
</div>

<div className="flex flex-wrap gap-3 justify-center p-3  md:flex-nowrap">
  <div className="flex flex-col items-center gap-3 bg-base-300 rounded-lg glass text-center place-content-center p-5 w-full md:w-1/3">
    <Star width={100} height={100} fill={"#A60000"}/>
    <p className="font-bold text-[#A60000]">Лучшее предложение на рынке рекрутинга.</p>
  </div> 
  <div className="flex flex-col items-center gap-3 bg-base-300 rounded-lg glass text-center place-content-center p-5 w-full md:w-1/3">
    <Medal width={100} height={100} fill={"#A60000"}/>
    <p className="font-bold text-[#A60000]">Без скрытых условий и нюансов</p>
  </div> 
  <div className="flex flex-col items-center gap-3 bg-base-300 rounded-lg glass text-center place-content-center p-5 w-full md:w-1/3">
    <Box width={100} height={100} fill={"#A60000"}/>
    <p className="font-bold text-[#A60000]">Бонусы от 200€ до 500€ уже с первого месяца работы</p>
  </div>
</div>

        </>
      
    );
  }
  