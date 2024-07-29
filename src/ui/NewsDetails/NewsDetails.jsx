// components/EditNewsForm.js
import React from 'react';
import Image from 'next/image';
import Breadcrumbs from '@/ui/Breadcrumbs/Breadcrumbs';
import FormCallBack from '@/ui/FormCallBack/FormCallBack';
import Useful from '@/ui/Useful/Useful';
import ManagerCard from '../ManagerCard/ManagerCard';
import CardNews from '../CardNews/CardNews';
import convertLinks from '@/utils/convertLinks';

const EditNewsForm = ({ news }) => {
    return (
        <>
            <div className="mx-auto lg:p-16 md:p-8 sm:p-4 min-w-0 md:w-[800px] flex-auto lg:static lg:max-h-full lg:overflow-visible">
                <div className="w-full flex">
                    <div className="min-w-0 flex-auto items-center px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{news.title}</h1>
                        <Breadcrumbs prev='/news' title={news.title || 'Нет заголовка'} prevText='Новости' />
                        <div className='flex justify-center'>
                            <figure>
                                {news.image ? (
                                    <Image
                                        src={`data:${news.image.contentType};base64,${Buffer.from(news.image.data).toString('base64')}`}
                                        alt={news.image.name}
                                        width={400}
                                        height={300}
                                        className="rounded-lg"
                                    />
                                ) : (
                                    'No image'
                                )}
                            </figure>
                        </div>
                        <div className="mt-5 text-base text-center">
                            {news.content?.map((article, index) => (
                                <div key={index} className="mb-5">
                                    <h3 className='font-bold mb-3'>{article.title}</h3>
                                    <p className='font-medium'>{convertLinks(article.content)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <p>{new Date(news.createdAt).toLocaleDateString()}</p>
                    <div>Источник: <p >{convertLinks(news.source)}</p></div>
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-2xl font-bold text-center">Похожие новости</h2>
                <CardNews category={news.category} currentNewsId={news._id}/>
            </div>
            <FormCallBack />
            <Useful />
            <ManagerCard />
           
        </>
    );
};

export default EditNewsForm;
