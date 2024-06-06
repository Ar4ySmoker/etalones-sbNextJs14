import Button from "../Buttons/Button";

export default function FormSubscribe(){
    return(
        <div className="bg-gradient-red text-white">
            <h2 className="text-2xl  text-center py-2">Активируй бесплатную подписку уже сейчас</h2>
        <div className="md:grid grid-cols-2 bg-base-100 shadow-xl bg-gradient-red text-white">

        <div className="card-body">
            <p>
            Заполните короткую форму и присоединяйся к группе подписчиков, чтобы регулярно получать уведомления о новых предложениях работы и сообщения на твою электронную почту или смс.
            </p>
            <div className="card-actions justify-end">
            </div>
        </div>
        <label htmlFor="" className="flex flex-col gap-3">
<input type="text" placeholder="email@gmail.com"
className="input input-bordered input-primary w-full max-w-xs" />
<div className="w-full flex gap-1">
    <input type="checkbox" defaultChecked className="checkbox" />
<p>Согласие на получение электронных писем</p>
</div>
<div className="w-full flex gap-1">
    <input type="checkbox" defaultChecked className="checkbox" />
<p>Получай регулярные оповещения о новых предложениях работы</p>
</div>
<div className="w-full flex gap-1">
    <input type="checkbox" defaultChecked className="checkbox" />
<p>Получай регулярные уведомления о актуальных новостях</p>
</div>
    <Button text="Подписаться"/>
</label>
    </div>
    </div>
    )
}