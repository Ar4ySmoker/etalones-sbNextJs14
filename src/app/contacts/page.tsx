// src/app/contacts/page.tsx
import ManagerCard from "@/ui/ManagerCard/ManagerCard";
import FormCallBack from "@/ui/FormCallBack/FormCallBack";
import Useful from "@/ui/Useful/Useful";
import { fetchManager } from "@/lib/myData";

export const metadata = {
  title: "Контакты менеджеров компании Etalones S&B",
  description: "По данным контактам вы можете связаться с нашими менеджерами по любым вопросам",
};


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
