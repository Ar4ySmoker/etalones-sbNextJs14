import VacTdet from '@/ui/ServerVac/VacTdet';

const getVacancyById = async (id) => {
    try {
        const res = await fetch(`https://www.etalones.com/api/vacancy/${id}`, {
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

export default async function Page({ params }) {
    const { id } = params;

    const { vacancy } = await getVacancyById(id);
    console.log('Fetched vacancy in Page component:', vacancy); // Добавить логирование для проверки данных

    return (
        <>
            <VacTdet vacancy={vacancy} />
        </>
    );
}
