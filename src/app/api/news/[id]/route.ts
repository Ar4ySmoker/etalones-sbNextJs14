import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils';
import { News } from '@/lib/models';

export const GET = async (req: any, { params }: any) => {
    const { id } = params;
    try {
        await connectToDB();
        const newsItem = await News.findById(id);
        if (!newsItem) {
            return new NextResponse('News item not found', { status: 404 });
        }
        return new NextResponse(JSON.stringify(newsItem), { status: 200 });
    }  catch (error) {
        // Приведение типа error к объекту с полем message
        if (error instanceof Error) {
            return new NextResponse('Error fetching news item: ' + error.message, { status: 500 });
        }
        return new NextResponse('An unknown error occurred', { status: 500 });
    }
};