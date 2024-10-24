import VacTdet from '@/ui/ServerVac/VacTdet';



const getVacancyById = async (id) => {
    try {
        const res = await fetch(`https://www.etalones.com/api/vacancy/${id}`, {
        // const res = await fetch(`http://localhost:3000/api/vacancy/${id}`, {

            cache: 'no-store',
        });

        if (!res.ok) {
            
            throw new Error('Failed to fetch vacancy');
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export async function generateMetadata({ params }) {
    const { vacancy } = await getVacancyById(params.id);
    return {
        title: `${vacancy?.title} Etalones S&B` ,
        description: `О работе: ${vacancy?.work_descr}` ,
    };
}


export default async function Page({ params }) {
    const { id } = params;

    const { vacancy } = await getVacancyById(id);

    return (
        <>
            <VacTdet vacancy={vacancy} />
        </>
    );
}
