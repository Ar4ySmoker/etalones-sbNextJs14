// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/lib/utils'; // Предполагаемый путь к вашей функции подключения к базе данных
// import {Reviews} from '@/lib/models'; // Предполагаемый путь к вашей модели Mongoose




// export const POST = async (request: Request) => {
//   try {
//     const body = await request.json();

//     await connectToDB();

//     // Проверяем, существует ли кандидат с таким номером телефона
   
//     const newReviews= new Reviews(body);
//     await newReviews.save();

//     return new NextResponse(
//       JSON.stringify({ message: "Reviews is created", reviews: newReviews }),
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils';
import { Reviews } from '@/lib/models';

// Обработка POST запроса для создания отзыва
export const POST = async (request: Request) => {
  try {
    const body: { userId: string; name: string; comment: string; rating: number; image?: string; email: string } = await request.json();

    // Проверка обязательных полей
    if (!body.userId || !body.comment || body.rating === undefined) {
      return new NextResponse(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    await connectToDB();

    const newReview = new Reviews({
      ...body,
      likes: [],   // Инициализируем пустым массивом
      dislikes: [], // Инициализируем пустым массивом
    });

    await newReview.save();

    return new NextResponse(
      JSON.stringify({ message: "Review is created", review: newReview }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error details:", error); // Логируем ошибку
    return new NextResponse(
      JSON.stringify({ message: "Error in creating review", error }),
      { status: 500 }
    );
  }
};

// Обработка GET запроса для получения отзывов
export const GET = async () => {
  try {
    await connectToDB();
    const reviews = await Reviews.find().sort({ createdAt: -1 });

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

// Обработка DELETE запроса для удаления отзыва
export const DELETE = async (request: Request) => {
  try {
    const body: { id: string } = await request.json(); // Ожидаем, что id будет передан в теле запроса
    await connectToDB();

    const deletedReview = await Reviews.findByIdAndDelete(body.id); // Удаляем отзыв по ID

    if (!deletedReview) {
      return new NextResponse(
        JSON.stringify({ message: "Review not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Review deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error deleting review", error }),
      { status: 500 }
    );
  }
};

// Обработка PUT запроса для редактирования отзыва
export const PUT = async (request: Request) => {
  try {
    const body: { id: string; comment: string; rating: number } = await request.json(); // Ожидаем, что id и обновленный контент будут переданы в теле запроса
    await connectToDB();

    const updatedReview = await Reviews.findByIdAndUpdate(
      body.id,
      { comment: body.comment, rating: body.rating },
      { new: true } // Возвращает обновленный документ
    );

    if (!updatedReview) {
      return new NextResponse(
        JSON.stringify({ message: "Review not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Review updated successfully", review: updatedReview }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error updating review", error }),
      { status: 500 }
    );
  }
};
