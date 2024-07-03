import ServerVac from '@/ui/ServerVac/ServerVac'

export default function Page(){

    return(

        <>
        <ServerVac vacanciesCount={50} enableCategorySwitcher={true}/>
        </>
    )
}