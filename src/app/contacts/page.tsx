import Card from "@/ui/Card/Card";
import Footer from "@/ui/Footer/Footer";
import FormCallBack from "@/ui/FormCallBack/FormCallBack";
import Managers from "@/ui/Managers/Managers";
import Navbar from "@/ui/Navbar/Navbar";
import Useful from "@/ui/Useful/Useful";
import VacancyFresh from "@/ui/VacancyFresh/VacancyFresh";


export default async function Page() {

  return (
    <>
      <Navbar />
      <Managers/>
      <FormCallBack/>

      <Useful/>
      <Card count={3}/>
      <Footer />
    </>
  );
}
