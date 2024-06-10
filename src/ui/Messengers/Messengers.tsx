import { Instagram } from "@/svg/instagram";
import { Telegram } from "@/svg/telegram";
import { Viber } from "@/svg/viber";

export default function Messengers(){
    return(
        <div className="">
        <div className="flex gap-5 justify-center py-3">
          <a href="" className="transition-transform transform hover:scale-110 "><Telegram width={50} height={50}/></a>
          <a href="" className="transition-transform transform hover:scale-110"><Viber width={50} height={50}/></a>
          <a href="" className="transition-transform transform hover:scale-110"><Instagram width={50} height={50}/></a>
        </div>
      </div>
    )
}