import Link from "next/link";

export default function Hero() {
    return(
        <div className="hero min-h-[500px]" style={{backgroundImage: 'url(/images/primary.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Ищете работу в Европе?</h1>
      <p className="mb-5">У насболее 40 вакансий</p>
      <Link href='/vacancy' className="btn bg-gradient-red text-white">Смотреть предложения</Link>
    </div>
  </div>
</div>
    )
}