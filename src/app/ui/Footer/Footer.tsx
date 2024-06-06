import Messengers from "../Messengers/Messengers";

export default function Footer(){
    return(
        <footer className="footer footer-center p-10 bg-black text-primary-content">
   <nav>
    <Messengers/>
  </nav>
  <aside>
    <p className="font-bold">
      Etalones S&B <br/>
    </p> 
    <p>Copyright © 2024 - All right reserved</p>
  </aside> 
 
</footer>
    )
}