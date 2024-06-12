import Link from 'next/link';
import { News } from '@/lib/definitions';

interface CardNewsProps {
  newsData: News[];
  count: number;
}

const CardNews: React.FC<CardNewsProps> = ({ newsData, count }) => {
  return (
    <>
      <div className="pt-5 pb-10 lg:pt-[20px] lg:pb-20">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            {newsData.slice( 0, count).map(newsItem => (
              <div key={newsItem._id} className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="mx-auto mb-10 max-w-[370px]">
                  <div className="mb-8 overflow-hidden rounded">
                    <img src={newsItem.image} alt="image" className="w-full" />
                  </div>
                  <div>
                    <span className="bg-primary mb-5 inline-block rounded py-1 px-4 text-center text-xs font-semibold leading-loose text-white">
                      {newsItem.date}
                    </span>
                    <h3>
                      <Link href={`/news/${newsItem._id}`} passHref className="text-dark hover:text-primary mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl">
                          {newsItem.title}
                      </Link>
                    </h3>
                    <p className="text-body-color text-base">
                     {newsItem.description?.substring(0,100)}...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardNews;
