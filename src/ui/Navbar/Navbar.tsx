'use client'
import Logo from '@/svg/Logo.svg'
import Link from 'next/link'
import { Instagram } from '@/svg/instagram'
import { Telegram } from '@/svg/telegram'
import { Viber } from '@/svg/viber'
import { Phone } from '@/svg/phone'
import Modal from '../Modal/Modal'
import { useState } from 'react'
import AnketaModalContent from '../Modal/AnketaModalContent'


export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    return (
        <div className='navbar text-white bg-gradient-red text-xl sticky top-0 z-100'>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[9999] p-2 shadow bg-gradient-red">
                    <li><Link href='/vacancy'><p className='text-xl w-max'>Вакансии</p></Link></li>
                        <li className='text-xl'><Link href="/news"><p className='text-xl  w-max'>Новости</p></Link></li>
                        <li className='text-xl'><Link href="/reviews"><p className='text-xl  w-max'>Отзывы</p></Link></li>
                        <li><Link href="/userfull"><p className='text-xl  w-max'>Полезное</p></Link></li>

                        <li>
                            <details>
                                <summary><p className='text-xl  w-max'>Соискателям</p></summary>
                                <ul className="p-2 bg-gradient-red z-10">
                                <li><Link href="/forRecrut"><p className='text-xl  w-max'>Рекрутерам</p></Link></li>
                                <li><Link href="/forCompany"><p className='text-xl  w-max'>Партнёрам</p></Link></li>
                                </ul>
                            </details>
                        </li>
                        {/* <li><Link href="/anketa"><p className='text-xl  w-max'>Заполнить анкету</p></Link></li> */}
                        {/* <li><div onClick={() => handleOpenModal() } className='text-xl  w-max'>Заполнить анкету</div></li> */}

                        <li><Link href="/contacts"><p className='text-xl  w-max'>Контакты</p></Link></li>
                    </ul>
                </div>
                <Link href='/'><Logo /></Link>
            </div>
            <div className="navbar-center hidden lg:flex text-3xl">
                <ul className="menu menu-horizontal px-1">
                <li><Link href='/vacancy'><p className='text-xl w-max'>Вакансии</p></Link></li>
                    <li><Link href="/userfull"><p className='text-xl  w-max'>Полезное</p></Link></li>
                    <li className='text-xl'><Link href="/news">Новости</Link></li>
                    <li className='text-xl'><Link href="/reviews">Отзывы</Link></li>

                    <li>
                        <details>
                        <summary ><p className='text-xl w-max'>Соискателям</p></summary>
                            <ul className="p-2 bg-gradient-red z-10">
                                <li><Link href="/forRecrut"><p className='text-xl w-max'>Рекрутерам</p></Link></li>
                                <li><Link href="/forCompany"><p className='text-xl  w-max'>Партнёрам</p></Link></li>

                            </ul>
                        </details>
                    </li>
                    {/* <li><Link href="/anketa"><p className='text-xl  w-max animate-pulse'>Заполнить анкету</p></Link></li> */}
                    {/* <li><div onClick={() => handleOpenModal()} className='text-xl  w-max'>Заполнить анкету</div></li> */}

                    <li className='text-xl'><Link href="/contacts">Контакты</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
            <div role="button" onClick={() => handleOpenModal()} className=" shadow rounded-md p-2 btn  ">
  <div className="animate-pulse flex space-x-4 text-xs text-success">
  Заполнить анкету
  </div>
            </div>

                {/* <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">Соц. Сети<Phone width={25} height={25}/></div>
                    <ul tabIndex={0} className="dropdown-content w-max menu p-2 shadow bg-gradient-red z-10 rounded-box">
                        <li><a target='blank' href="https://t.me/VakansiiEtalones" className="transition-transform transform hover:scale-110"><Telegram width={50} height={50} /></a></li>
                        <li><a target='blank' href="https://invite.viber.com/?g2=AQAyInf%2Fn7gYIVEHhdr0DRiL0gFv%2BFU7%2BDoKEQWPv1MfWACpSMOQb%2Fb3UcXL4ZYh" className="transition-transform transform hover:scale-110"><Viber width={50} height={50} /></a></li>
                        <li><a target='blank' href="https://www.instagram.com/etalones_s_b/" className="transition-transform transform hover:scale-110"><Instagram width={50} height={50} /></a></li>
                    </ul>
                </div> */}

            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} >
                <AnketaModalContent onClose={handleCloseModal} />
            </Modal>
        </div>
    )
}


