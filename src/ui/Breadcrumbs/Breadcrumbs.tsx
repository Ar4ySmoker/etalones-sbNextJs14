import Link from "next/link";

type BreadcrumbsProps = {
  title: string;
};

export default function Breadcrumbs({ title }: BreadcrumbsProps) {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li><Link href="/">Etalones S&B</Link></li>
        <li><Link href="/vacancy">Вакансии</Link></li>
        <li>{title}</li>
      </ul>
    </div>
  );
}
