import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils';
import { User } from '@/lib/models'; // Модель пользователя

// Обработка POST запроса для создания пользователя
export const POST = async (request: Request) => {
  try {
    const body: { name: string; email: string; image: string } = await request.json();
    await connectToDB();

    const { name, email, image } = body; // Деструктурируем свойства из body

    // Проверяем, существует ли пользователь
    let user = await User.findOne({ email });

    if (!user) {
      // Если не существует, создаем нового пользователя
      user = new User({ name, email, image });
      await user.save();
    }

    return new NextResponse(
      JSON.stringify({ message: "User created or fetched successfully", user }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error in creating or fetching user", error }),
      { status: 500 }
    );
  }
};

// Обработка GET запроса для получения пользователя по email
export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    await connectToDB();
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ user }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error fetching user", error }),
      { status: 500 }
    );
  }
};
