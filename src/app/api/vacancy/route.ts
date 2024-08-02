// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/lib/utils';
// import { VacancyOnServer } from '@/lib/models';

// export const GET = async () => {
//     try {
//         await connectToDB();
//         console.log('mongo is conected')
//         const vacancy = await VacancyOnServer.find({ published: true }).populate('manager')
//         .sort({ createdAt: -1 }) // Сортировка по убыванию даты создания
//         return new NextResponse(JSON.stringify(vacancy), { status: 200 });
//     } catch (error) {
//         return new NextResponse("error in fetching " + error, { status: 500 });
//     }
// };
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils';
import { VacancyOnServer } from '@/lib/models';

// Определение типа данных для вакансии (опционально)
interface IVacancy {
    _id: string;
    title: string;
    description: string;
    published: boolean;
    createdAt: Date;
    manager: {
        name: string;
        email: string;
    };
}

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    try {
        await connectToDB();
        console.log('mongo is connected');

        // Получаем параметры запроса
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '3', 10); // Количество вакансий для загрузки за один раз

        const vacancies: IVacancy[] = await VacancyOnServer.find({ published: true })
            .populate('manager')
            // .sort({ createdAt: -1 }) 
            .skip((page - 0) * limit) // Пропускаем предыдущие вакансии
            .limit(limit); // Ограничиваем количество загружаемых вакансий

        return new NextResponse(JSON.stringify(vacancies), { status: 200 });
    } catch (error) {
        return new NextResponse(`error in fetching: ${error}`, { status: 500 });
    }
};
