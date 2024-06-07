import managers from "@/lib/managers.json"
import Image from "next/image";
import {Telegram} from '@/svg/telegram'
import {Viber} from '@/svg/viber'
import {WhatsApp} from '@/svg/whatsapp'

export default function Managers(){
    return(
        <>
        <div className="text-3xl font-bold text-center text-red-700 py-3">Наши менеджеры</div>
        <div className="flex flex-wrap gap-5 justify-center">
        {managers.map((manager) => (

          <div key={manager._id} className="flex flex-col items-center">
            <div className="avatar flex flex-col items-center">
              <div className=" rounded-full">
                <Image width={100} height={100} src={manager.image} alt="Ivan" />
              </div>
                <p className="font-bold">{manager.name}</p>
                <p>{manager.phone}</p>
            </div>
            <div className="flex gap-2 w-max justify-between mt-4">
 <a href={manager.viber} ><Viber width={30} height={30} /></a>
 <a href={manager.telegram}><Telegram  width={30} height={30}/></a>
 <a href={manager.whatsapp}><WhatsApp width={30} height={30} /></a>
                </div>
          </div>

        ))}
      </div>
        </>
       
    )
}