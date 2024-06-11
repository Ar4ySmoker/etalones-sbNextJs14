import managers from "@/lib/managers.json"
import Image from "next/image";
import {Telegram} from '@/svg/telegram'
import {Viber} from '@/svg/viber'
import {WhatsApp} from '@/svg/whatsapp'

export default function Managers(){
    return(
        <div className="my-3">
        <div className="text-3xl font-bold text-center text-red-700 py-3 ">Наши менеджеры</div>
        <div className="flex flex-wrap gap-5 justify-center">
        {managers.map((manager) => (

          <div key={manager._id} className="flex flex-col items-center my-5">
            <div className="avatar flex flex-col items-center">
              <div className="rounded-full">
                <Image width={150} height={150} src={manager.image} alt="Ivan" />
              </div>
                <p className="font-bold text-3xl py-3">{manager.name}</p>
                <p className="font-semibold text-xl py-1">{manager.phone}</p>
            </div>
            <div className="flex gap-2 w-max justify-between mt-4">
 <a href={manager.viber} className="transition-transform transform hover:scale-110 "><Viber width={30} height={30} /></a>
 <a href={manager.telegram} className="transition-transform transform hover:scale-110 "><Telegram  width={30} height={30}/></a>
 <a href={manager.whatsapp} className="transition-transform transform hover:scale-110 "><WhatsApp width={30} height={30} /></a>
                </div>
          </div>

        ))}
      </div>
        </div>
       
    )
}