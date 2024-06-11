import Logo from '@/svg/Logo.svg'
import Link from 'next/link'
import { Instagram } from '@/svg/instagram'
import { Telegram } from '@/svg/telegram'
import { Viber } from '@/svg/viber'
import { Phone } from '@/svg/phone'


export default function Navbar() {
    return (
        <div className='navbar text-white bg-gradient-red text-xl sticky top-0 z-100'>
            <div className="navbar-start">
                <div className="dropdown ">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[9999] p-2 shadow bg-gradient-red">
                        <li >
                            <details>
                                <summary ><p className='text-xl'>Вакансии</p></summary>
                                <ul className="p-2 bg-gradient-red z-10">
                                    <li><Link href='/vacancy'>Смотреть все </Link></li>
                                    <li><Link href='/vacancy?category=internal'>Внутренняя отделка</Link></li>
                                    <li><Link href='/vacancy?category=outdoor'>Работа на улице</Link></li>
                                    <li><Link href='/vacancy?category=no-experience'>Без опыта</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Полезное</summary>
                                <ul className="p-2 bg-gradient-red z-10">
                                    <li><a>Submenu 1</a></li>
                                    <li><Link href="/forRecrut">Рекрутерам</Link></li>
                                    </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Соискателям</summary>
                                <ul className="p-2 bg-gradient-red z-10">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a href="">Контакты</a></li>
                    </ul>
                </div>
                <Link href='/'><Logo /></Link>
            </div>
            <div className="navbar-center hidden lg:flex text-3xl">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <details>
                        <summary ><p className='text-xl'>Вакансии</p></summary>
                        <ul className="p-2 bg-gradient-red z-10 w-max">
                                <li><Link href='/vacancy'>Смотреть все </Link></li>
                                <li><Link href='/vacancy?category=internal'>Внутренняя отделка</Link></li>
                                <li><Link href='/vacancy?category=outdoor'>Работа на улице</Link></li>
                                <li><Link href='/vacancy?category=no-experience'>Без опыта</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                        <summary ><p className='text-xl'>Полезное</p></summary>
                            <ul className="p-2 bg-gradient-red z-10 w-max">
                                <li><a>Документы</a></li>
                                <li><a>Законодательство</a></li>
                                <li><a>Быт</a></li>
                            </ul>
                        </details>
                    </li>
                    <li className='text-xl'><Link href="/news">Новости</Link></li>
                    <li>
                        <details>
                        <summary ><p className='text-xl'>Соискателям</p></summary>
                            <ul className="p-2 bg-gradient-red z-10">
                                <li><a>Строительным фирмам</a></li>
                                <li><Link href="/forRecrut">Рекрутерам</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li className='text-xl'><Link href="/contacts">Контакты</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">Соц. Сети<Phone width={25} height={25}/></div>
                    <ul tabIndex={0} className="dropdown-content w-max menu p-2 shadow bg-gradient-red z-10 rounded-box">
                        <li><a href="" className="transition-transform transform hover:scale-110"><Telegram width={50} height={50} /></a></li>
                        <li><a href="" className="transition-transform transform hover:scale-110"><Viber width={50} height={50} /></a></li>
                        <li><a href="" className="transition-transform transform hover:scale-110"><Instagram width={50} height={50} /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
