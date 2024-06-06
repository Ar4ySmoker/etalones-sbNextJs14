import Button from "../Buttons/Button";

export default function FormCallBack() {
    return (
        <div className="w-full mx-auto">
            <div className=" w-full">
                <h3 className="text-2xl">Оставьте свой номер телефона и мы сразу свяжемся с Вами.</h3>
                <p>Назначьте время разговора с нами и мы поможем Вам выбрать вакансию и ответим на Ваши вопросы.</p>
                <div className="">
                    <input className="input input-bordered " placeholder="Имя" />
                    <input className="input input-bordered " placeholder="Номер телефона" />
                    <select className="select select-bordered ">
                        <option disabled selected>Время звонка</option>
                        <option>8:00-10:00</option>
                        <option>10:00-12:00</option>
                        <option>12:00-14:00</option>
                        <option>14:00-16:00</option>
                        <option>16:00-18:00</option>
                        <option>После работы</option>
                    </select>
<Button text="Запросить звонок"/>
                    
                </div>

            </div>

        </div>
    )
}