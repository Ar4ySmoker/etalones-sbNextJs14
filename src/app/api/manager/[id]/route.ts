import { connectToDB } from '@/lib/utils';
import { Manager } from '@/lib/models';
import { NextResponse } from "next/server";

export const PUT = async (request: { formData: () => any; }, { params }: any) => {
    try {
        await connectToDB();
        const id = params.id;

        const data = await request.formData();
        const file = data.get('file'); // Если файл загружается, получаем его здесь
        const { name, phone, email, viber, telegram, whatsapp } = Object.fromEntries(data); // Получаем данные из формы

        let updatedManager;

        if (file) {
            // Если выбран файл, обновляем и изображение
            const bufferData = await file.arrayBuffer();
            const buffer = Buffer.from(bufferData);

            updatedManager = {
                name,
                phone,
                email,
                viber,
                telegram,
                whatsapp,
                image: {
                    name: file.name,
                    data: buffer,
                    contentType: file.type
                }
            };
        } else {
            // Если файл не выбран, обновляем без изображения
            updatedManager = {
                name,
                phone,
                email,
                viber,
                telegram,
                whatsapp
            };
        }

        const updatedManagerDoc = await Manager.findByIdAndUpdate(id, updatedManager, { new: true });

        if (!updatedManagerDoc) {
            return new NextResponse(JSON.stringify({ success: false, message: "Manager not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ success: true, message: "Manager updated", manager: updatedManagerDoc }), { status: 200 });

    } catch (error) {
        console.error("Error updating manager:", error);
        return new NextResponse(JSON.stringify({ success: false, message: "Error updating manager", error }), { status: 500 });
    }
};

export async function GET(request: any, { params }: any) {
    const { id } = params;

    try {
        await connectToDB();
        const manager = await Manager.findOne({ _id: id });

        if (!manager) {
            return new NextResponse(JSON.stringify({ success: false, message: "Manager not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ success: true, manager }), { status: 200 });
    } catch (error) {
        console.error("Error fetching manager:", error);
        return new NextResponse(JSON.stringify({ success: false, message: "Error fetching manager", error }), { status: 500 });
    }
}
