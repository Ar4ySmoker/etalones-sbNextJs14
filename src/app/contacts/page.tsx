// src/app/contacts/page.tsx
import ManagerCard from "@/ui/ManagerCard/ManagerCard";
import Footer from "@/ui/Footer/Footer";
import FormCallBack from "@/ui/FormCallBack/FormCallBack";
import Navbar from "@/ui/Navbar/Navbar";
import Useful from "@/ui/Useful/Useful";
import { fetchManager } from "@/lib/myData";

export default async function Page() {
  const managers = await fetchManager();

  return (
    <>
      <ManagerCard />
      <FormCallBack />
      <Useful />
    </>
  );
}
