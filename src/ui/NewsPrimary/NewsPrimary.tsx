import Link from 'next/link';
import React from 'react';
import Button from '../Buttons/Button';
import CardNews from '../CardNews/CardNews';
import newsData from '@/lib/news.json';
import Image from 'next/image';

const NewsPrimary = () => {
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">From the blog</h1>
          <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">

            <div className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96">
          <Image src={newsData[0].image || "/default-image.png"} alt='default-image' style={{objectFit: "contain"}} fill/>
            </div>

            {/* <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={newsData[0].image} alt="" /> */}
            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
              <p className="text-sm text-blue-500 uppercase">{newsData[0].category}</p>
              <a href="#" className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white md:text-3xl">
                В Польше наблюдается острый недостаток строителей.
              </a>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                В Варшаве и других городах Польши сотни открытых вакансий для строителей — чтобы заполнить недостаток, бизнес нанимает рабочих из самых разных уголков земли ...
              </p>
              <Link href={`/news/${newsData[0]._id}`} passHref>
                <Button text={"Подробнее"} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <CardNews newsData={newsData} count={6} />
    </>
  );
}

export default NewsPrimary;
