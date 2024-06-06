export default function Useful() {
    return (

        <div className="md:grid grid-cols-2 bg-base-100 shadow-xl">
            <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" /></figure>

            <div className="card-body">
                <h2 className="card-title">Полезное</h2>
                <p>
                    В этом разделе вы сможете найти много полезной информации о работе
                    и жизни в Польше. Здесь вы найдете статьи, которые расскажут вам
                    где и как оформить нужные документы для легального пребывания за
                    границей. Также, сможете составить себе приблизительный план
                    действий по поиску работы и планировании выезда; и узнать какой
                    минимальный прожиточный минимум вам нужно будет иметь с собой на
                    первое время. Как говорят: осведомленность - лучшее оружие.
                </p>
                <div>
                <div className="stats shadow grid grid-flow-col auto-cols-max ">
                        <div className="stat w-full">
                            <div className="stat-title">Средний доход
                            </div>
                            <div className="stat-value text-primary">в 2023 году</div>
                            <div className="stat-desc">5 662 PLN</div>
                        </div>

                        <div className="stat">
                            <div className="stat-title">Иностранцы</div>
                            <div className="stat-value text-secondary">1.6M</div>
                            <div className="stat-desc">работающие в Польше</div>
                        </div>

                        <div className="stat">
                            <div className="stat-value">647 052</div>
                            <div className="stat-title">Новые рабочие места</div>
                            <div className="stat-desc text-secondary">в 2023 году</div>
                        </div>

                    </div>
                </div>
               
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Listen</button>
                </div>
            </div>

        </div>
    )
}