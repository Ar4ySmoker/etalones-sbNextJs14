import { connectToDB } from '@/lib/utils';
import { VacancyOnServer } from '@/lib/models';
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    const { id } = params;
    await connectToDB();
    try {
        const vacancy = await VacancyOnServer.findById(id).populate('manager');
        if (!vacancy) {
            console.error('Vacancy not found');
            return NextResponse.json({ message: "Vacancy not found" }, { status: 404 });
        }
        return NextResponse.json({ vacancy }, { status: 200 });
    } catch (error) {
        console.error('Error fetching vacancy:', error); // Лог ошибки
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

