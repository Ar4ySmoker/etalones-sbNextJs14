import Link from "next/link";

type BreadcrumbsProps = {
  title: string;
  prev: string;
  prevText: string;
};

export default function Breadcrumbs({ title, prev, prevText}: BreadcrumbsProps) {
  return (
    <div className="text-sm breadcrumbs flex justify-start ml-10 mt-10 mb-0 ">
      <ul className="flex-wrap w-full">
        <li><Link href="/">Etalones S&B</Link></li>
        <li><Link href={prev}>{prevText}</Link></li>
        <li>{title.slice(0,25)}</li>
      </ul>
    </div>
  );
}
