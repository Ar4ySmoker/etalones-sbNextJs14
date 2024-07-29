import { connectToDB } from '@/lib/utils';
import { News} from '@/lib/models';
import { NextResponse } from "next/server";



export async function GET(request: any, { params }: any) {
    const { id } = params;
    await connectToDB();
    try {
        const news = await News.findById(id);
        if (!news) {
            console.error('News not found');
            return NextResponse.json({ message: "News not found" }, { status: 404 });
        }
        return NextResponse.json({ news }, { status: 200 });
    } catch (error) {
        console.error('Error fetching news:', error); // Лог ошибки
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
