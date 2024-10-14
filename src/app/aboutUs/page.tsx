import Button from "@/ui/Buttons/Button"
import Image from "next/image"

export default function Page() {
    return (
        <>
            <div>About Us</div>
            <div className="container flex flex-col gap-3 p-5 justify-center items-center">
                <h1 className="text-center font-bold text-md">О нас</h1>
                <div className="flex">
  <div className="">
    <Image src='/images/brgdN1.jpg' width={200} height={200} alt="" />
  </div>
  <div className="">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa maxime officia beatae ut id ullam eum magnam earum quos assumenda consectetur illo iste placeat ab molestias obcaecati, illum facilis expedita inventore explicabo eius quod natus? Dolorem, aut quis error consequatur sint quia quae illum quasi optio doloribus voluptas atque aliquid pariatur, ullam incidunt deleniti. Omnis, sequi fuga. Dignissimos temporibus aspernatur saepe molestiae laudantium placeat culpa ut quibusdam amet doloribus est quo quia eum iste, eos excepturi dolores reiciendis similique, aperiam veniam provident minima labore sit!
    </p>
    <p>
      Ipsam tempore perspiciatis officiis facilis eaque illum voluptate repellendus dicta asperiores! Facere modi culpa similique quos, mollitia quo. Nisi sapiente quos natus perspiciatis, dolores libero laudantium deserunt corrupti doloremque reprehenderit sunt eos iusto nam. Sed repellat fugiat odit, nemo ipsum alias asperiores ab atque, nostrum maiores laboriosam incidunt eligendi pariatur quisquam error aliquam quibusdam dignissimos. Et in temporibus officia odio!
    </p>
  </div>
</div>

                <div className="w-full">
                <div>
<p className="text-center font-bold text-md">Оставить отзыв</p>
                  <textarea className="w-full h-[200px] border rounded p-5" name="" id=""></textarea>
                  <Button text="Оставить отзыв"/>
</div>
                    <h2 className="text-center font-bold text-md my-3">Отзывы</h2>

<div className="flex flex-wrap w-full justify-between">
                    <div className="md: h-[150px] w-[33%] my-3 bg-slate-200 ">
                        Карточка отзыва
                    </div><div className="h-[150px] w-[33%] my-3 bg-slate-200">
                        Карточка отзыва
                    </div><div className="h-[150px] w-[33%] my-3 bg-slate-200">
                        Карточка отзыва
                    </div><div className="h-[150px] w-[33%] my-3 bg-slate-200">
                        Карточка отзыва
                    </div><div className="h-[150px] w-[33%] my-3 bg-slate-200">
                        Карточка отзыва
                    </div><div className="h-[150px] w-[33%] my-3 bg-slate-200">
                        Карточка отзыва
                    </div>
</div>


                </div>
            </div>
        </>

    )
}