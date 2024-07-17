import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils'; // Предполагаемый путь к вашей функции подключения к базе данных
import {Reviews} from '@/lib/models'; // Предполагаемый путь к вашей модели Mongoose




export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    await connectToDB();

    // Проверяем, существует ли кандидат с таким номером телефона
   
    const newReviews= new Reviews(body);
    await newReviews.save();

    return new NextResponse(
      JSON.stringify({ message: "Reviews is created", reviews: newReviews }),
      { status: 201 }
    );

  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating reviews",
        error,
      }),
      {
        status: 500,
      }
    );
  }
};

export const GET = async () => {
    try {
      await connectToDB();
      const reviews = await Reviews.find(); // Получаем все отзывы из базы данных
  
      return new NextResponse(
        JSON.stringify({ reviews }),
        { status: 200 }
      );
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: "Error fetching reviews", error }),
        { status: 500 }
      );
    }
  };