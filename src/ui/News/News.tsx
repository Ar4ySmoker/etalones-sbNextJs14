import Card from "../Card/Card";
import newsData from '@/lib/news.json';
import CardNews from "../CardNews/CardNews";

export default function News(){
    return(
        <div className="mx-auto ">
            <h3 className="text-3xl text-center py-5">Новости</h3>
        <div className="flex flex-wrap gap-5 justify-center">
             {/* <div className=""><Useful/></div> */}
            <div className=""><CardNews count={3} newsData={newsData}/></div>


</div>
        </div>
        
    )
}