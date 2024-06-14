import { Instagram } from "@/svg/instagram";
import { Telegram } from "@/svg/telegram";
import { Viber } from "@/svg/viber";

export default function Messengers(){
    return(
        <div className="">
        <ul className="flex gap-5 justify-center py-3">
        <li><a target='blank' href="https://t.me/VakansiiEtalones" className="transition-transform transform hover:scale-110"><Telegram width={50} height={50} /></a></li>
        <li><a target='blank' href="https://invite.viber.com/?g2=AQAyInf%2Fn7gYIVEHhdr0DRiL0gFv%2BFU7%2BDoKEQWPv1MfWACpSMOQb%2Fb3UcXL4ZYh" className="transition-transform transform hover:scale-110"><Viber width={50} height={50} /></a></li>
        <li><a target='blank' href="https://www.instagram.com/etalones_s_b/" className="transition-transform transform hover:scale-110"><Instagram width={50} height={50} /></a></li>
        </ul>
      </div>
    )
}