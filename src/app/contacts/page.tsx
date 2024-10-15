// src/app/contacts/page.tsx
import ManagerCard from "@/ui/ManagerCard/ManagerCard";
import FormCallBack from "@/ui/FormCallBack/FormCallBack";
import Useful from "@/ui/Useful/Useful";

export default async function Page() {

  return (
    <>
      <ManagerCard />
      <FormCallBack />
      <Useful />
    </>
  );
}
