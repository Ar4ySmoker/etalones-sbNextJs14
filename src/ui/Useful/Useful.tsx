import Image from "next/image";
import Button from "../Buttons/Button";
import Link from "next/link";

export default function Useful() {
    return (

        <div className="md:grid grid-cols-2 bg-myred-default shadow-xl ">
            <figure><Image width={700} height={550} src="/images/women-2.jpg" alt="Album" /></figure>

            <div className="card-body text-white ">
                <h2 className="card-title">Полезное</h2>
                <p className="">
                    В этом разделе вы сможете найти много полезной информации о работе
                    и жизни в Польше. Здесь вы найдете статьи, которые расскажут вам
                    где и как оформить нужные документы для легального пребывания за
                    границей. Также, сможете составить себе приблизительный план
                    действий по поиску работы и планировании выезда; и узнать какой
                    минимальный прожиточный минимум вам нужно будет иметь с собой на
                    первое время. Как говорят: осведомленность - лучшее оружие.
                </p>
                <div>
                <div className="stats shadow grid grid-flow-col bg-myred-default text-white auto-cols-max ">
                        <div className="stat w-full">
                            <div className="">Средний доход
                            </div>
                            <div className="stat-value ">в 2023 году</div>
                            <div className="">5 662 PLN</div>
                        </div>

                        <div className="stat">
                            <div className="">Иностранцы</div>
                            <div className="stat-value ">1.6M</div>
                            <div className="">работающие в Польше</div>
                        </div>

                        <div className="stat">
                            <div className="stat-value">647 052</div>
                            <div className="">Новые рабочие места</div>
                            <div className=" ">в 2023 году</div>
                        </div>

                    </div>
                </div>
               
                <div className="card-actions justify-end">
                    <Link href="/userfull"> 
<Button text={"Ознакомится"} className="btn-outline btn-warning"/>               
                    </Link>
 </div>
            </div>

        </div>
    )
}