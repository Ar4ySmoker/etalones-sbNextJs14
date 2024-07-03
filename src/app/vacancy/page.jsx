import ServerVac from '@/ui/ServerVac/ServerVac'
import Navbar from '@/ui/Navbar/Navbar'
import Footer from '@/ui/Footer/Footer'
import Title from '@/ui/Title/Title'
export default function Page(){

    return(

        <>
         <Navbar />
         <Title text={'Наши вакансии'} />
        <ServerVac vacanciesCount={50} enableCategorySwitcher={true}/>
        <Footer />

        </>
    )
}