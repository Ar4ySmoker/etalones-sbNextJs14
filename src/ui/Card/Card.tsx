import Image from "next/image";
import vacancies from '@/lib/vacancy.json'; // Импортируйте JSON-файл
// import { fetchVacancy } from "@/lib/action";


export default async function Card() {
    // const vacancy = await fetchVacancy();

    return (
        <div className="flex flex-wrap justify-center">
            {vacancies.map((vacancies, index) => (
                <div key={index} className="card w-96 glass m-4">
                    <figure>
                        <Image width={400} height={400} src={vacancies.image} alt={vacancies.job_title} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold">{vacancies.job_title}</h2>
                        {/* <span className="text-muted text-sm"><i className="bi bi-dash-lg text-red-500 font-bold"></i> {vacancy.work_type || vacancy.roof_type}</span> */}
                        <p className="text-sm mt-2"><i className="bi bi-geo-alt-fill text-red-500"></i> {vacancies.image}</p>
                        <p className="text-sm"><i className="bi bi-cash text-red-500"></i>&nbsp; {vacancies.salary} netto</p>
                        <div className="d-flex justify-between items-center">
                            <p className="text-sm mb-0"><i className="bi bi-person-fill text-red-500"></i> Свободно <strong>{vacancies.positions_available} Места</strong></p>
                            <a href="https://t.me/Ivan_etalones" target="_blank">
                                <img src="/img/svg/phone.svg" alt="telegram" />
                            </a>
                        </div>
                        <div className="card-actions justify-end mt-4">
                            <button className="btn btn-primary">Подробнее</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
