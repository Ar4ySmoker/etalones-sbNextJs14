// app/api/categories/route.js или route.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils';
import { VacancyOnServer } from '@/lib/models';

export const GET = async () => {
    try {
        await connectToDB();
        console.log('mongo is connected');
        
        // Получение уникальных категорий
        const categories = await VacancyOnServer.distinct('category');
        
        return new NextResponse(JSON.stringify(categories), { status: 200 });
    } catch (error) {
        return new NextResponse("Error in fetching categories: " + error, { status: 500 });
    }
};
