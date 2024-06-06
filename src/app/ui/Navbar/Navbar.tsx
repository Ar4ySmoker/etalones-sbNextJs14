import Logo from '@/app/svg/Logo.svg'
import cls from './Navbar.module.css'
import Link from 'next/link'
export default function Navbar(){
    return(
<div className='navbar text-white bg-gradient-red'>
        <div className="navbar-start ">
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gradient-red rounded-box w-52">
        <li><details>
          <summary>Вакансии</summary>
          <ul className="p-2 bg-gradient-red">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details></li>
        <li>
        <details>
          <summary>Полезное
</summary>
          <ul className="p-2 bg-gradient-red">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
        </li>
        <li><details>
          <summary>Соискателям</summary>
          <ul className="p-2 bg-gradient-red">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details></li>
        <li><a href="">Контакты</a></li>
      </ul>
    </div>
    <Link href='/'><Logo /></Link>

        </div>
         <div className="navbar-center hidden lg:flex ">
    <ul className="menu menu-horizontal px-1 ">
      <li > <details>
          <summary>Вакансии</summary>
          <ul className="p-2 bg-gradient-red">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details></li>
      <li>
        <details>
          <summary>Полезное
</summary>
          <ul className="p-2 bg-gradient-red">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Новости</a></li>
      <li><details>
          <summary>Соискателям</summary>
          <ul className="p-2 bg-gradient-red">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details></li>
        <li><Link href="/contacts">Контакты</Link></li>
    </ul>
        </div>
        <div className="navbar-end">
        <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1">Click</div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
        </div>
        </div>
    )
}