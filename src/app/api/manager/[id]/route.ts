import { connectToDB } from '@/lib/utils';
import { Manager } from '@/lib/models';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

interface Params {
  params: {
    id: string;
  };
}

export const PUT = async (request: NextRequest, { params }: Params) => {
  try {
    await connectToDB();
    const id = params.id;

    const data = await request.formData();
    const file = data.get('file'); // Если файл загружается, получаем его здесь
    const { name, phone, email, viber, telegram, whatsapp } = Object.fromEntries(data) as Record<string, string>; // Получаем данные из формы

    let updatedManager;

    if (file && typeof file === 'object') {
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
          name: (file as File).name,
          data: buffer,
          contentType: (file as File).type
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
      return NextResponse.json({ success: false, message: 'Manager not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Manager updated', manager: updatedManagerDoc }, { status: 200 });

  } catch (error) {
    console.error('Error updating manager:', error);
    return NextResponse.json({ success: false, message: 'Error updating manager', error }, { status: 500 });
  }
};

export const GET = async (request: NextRequest, { params }: Params) => {
  const { id } = params;

  try {
    await connectToDB();
    const manager = await Manager.findOne({ _id: id });

    if (!manager) {
      return NextResponse.json({ success: false, message: 'Manager not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, manager }, { status: 200 });
  } catch (error) {
    console.error('Error fetching manager:', error);
    return NextResponse.json({ success: false, message: 'Error fetching manager', error }, { status: 500 });
  }
};
