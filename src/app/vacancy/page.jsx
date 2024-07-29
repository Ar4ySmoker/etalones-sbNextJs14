import ServerVac from '@/ui/ServerVac/ServerVac'

import Title from '@/ui/Title/Title'
export default function Page(){

    return(

        <>
         <Title text={'Наши вакансии'} />
        <ServerVac vacanciesCount={50} enableCategorySwitcher={true}/>

        </>
    )
}