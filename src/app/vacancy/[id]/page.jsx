

import VacTdet from '@/ui/ServerVac/VacTdet'

const getVacancyById = async ( id ) => {
  try {
      // const res = await fetch(`http://localhost:3000/api/vacancy/${id}`, {
      //     cache: "no-store",
      // });
      const res = await fetch(`https://www.candidat.store/api/vacancy/${id}`, {
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



export default async function Page({ params }) {
  const { id } = params;
  const { vacancy } = await getVacancyById( id );

  return (
<>

<VacTdet vacancy={vacancy} />
</>
   



  );
}
