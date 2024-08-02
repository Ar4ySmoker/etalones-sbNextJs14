import CardNews from "../CardNews/CardNews";

export default function News(){
    return(
        <div className="mx-auto ">
            <h3 className="text-3xl text-center py-5">Новости</h3>
        <div className="flex flex-wrap gap-5 justify-center">
            <div className=""><CardNews newsCount={3}  /></div>


</div>
        </div>
        
    )
}