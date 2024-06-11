import Button from "../Buttons/Button";
import Image from "next/image";
export default function CarouselManager(){
    return(
        <div className="mx-auto flex flex-col items-center">
 <h3 className="text-3xl text-center py-5">Наши менеджеры</h3>
        <div className="carousel rounded-box">
  <div className="carousel-item">
    <Image width={500} height={500} src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" alt="Burger" />
  </div> 
  <div className="carousel-item">
  <Image width={500} height={500}  src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" alt="Burger" />
    <img />
  </div> 
  <div className="carousel-item">
  <Image width={500} height={500} src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" alt="Burger"  />
  </div>
</div>
<Button text="Перейти в контакты"/>
        </div>
       
    )
}