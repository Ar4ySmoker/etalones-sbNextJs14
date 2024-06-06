import Footer from "@/ui/Footer/Footer";
import Navbar from "@/ui/Navbar/Navbar";
import { fetchVacancy } from "@/lib/action";

export default async function Page() {
  const vacancies = await fetchVacancy();

  return (
    <>
      <Navbar />
      <div>Contacts</div>
      <ul>
        {vacancies.map((manager) => (
          <li key={manager._id}>{manager.title}</li>
        ))}
      </ul>
      <Footer />
    </>
  );
}
