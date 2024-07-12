import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils';
import { VacancyOnServer } from '@/lib/models';

export const GET = async () => {
    try {
        await connectToDB();
        console.log('mongo is conected')
        const vacancy = await VacancyOnServer.find({ urgently: true }).populate('manager')
        .sort({ createdAt: -1 }) // Сортировка по убыванию даты создания
        .limit(3);
        return new NextResponse(JSON.stringify(vacancy), { status: 200 });
    } catch (error) {
        return new NextResponse("error in fetching " + error, { status: 500 });
    }
};