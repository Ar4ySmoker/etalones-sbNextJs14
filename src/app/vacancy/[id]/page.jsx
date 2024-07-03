import { fetchManager } from '@/lib/myData';
import VacTdet from '@/ui/ServerVac/VacTdet';

const getVacancyById = async (id) => {
    try {
        const res = await fetch(`https://www.etalones.com/api/vacancy/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch vacancy");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const getAllManagers = async () => {
  try {
      const managers = await fetchManager(); // Ожидаем массив объектов ManagerField[]

      return managers; // Возвращаем массив менеджеров напрямую
  } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch managers");
  }
};


export default async function Page({ params }) {
    const { id } = params;

    // Запрос вакансии
    const { vacancy } = await getVacancyById(id);

    // Запрос всех менеджеров
    const managers = await getAllManagers();

    return (
        <>
            <VacTdet vacancy={vacancy} managers={managers} />
        </>
    );
}
