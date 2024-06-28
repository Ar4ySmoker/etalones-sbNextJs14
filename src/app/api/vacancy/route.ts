import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils';
import { VacancyOnServer } from '@/lib/models';

export const GET = async () => {
    try {
        await connectToDB();
        console.log('mongo is conected')
        const vacancies = await VacancyOnServer.find().populate('manager');
        return new NextResponse(JSON.stringify(vacancies), { status: 200 });
    } catch (error) {
        return new NextResponse("error in fetching " + error, { status: 500 });
    }
};