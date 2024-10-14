import { connectToDB } from '@/lib/utils';
import {Reviews} from '@/lib/models'; // Убедитесь, что ваша модель правильная
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();
        
        const reviewId = params.id; // Получаем ID отзыва из параметров
        const data = await request.json(); // Получаем данные из тела запроса
        const { userId } = data; // Извлекаем userId

        console.log("USERID", userId); // Логируем ID пользователя

        // Находим отзыв по ID
        const review = await Reviews.findById(reviewId);
        if (!review) {
            return new NextResponse(JSON.stringify({ success: false, message: "Review not found" }), { status: 404 });
        }

        // Проверяем, существует ли лайк от этого пользователя
        const userIndex = review.likes.indexOf(userId);
        
        if (userIndex === -1) {
            // Если лайка нет, добавляем userId в массив лайков
            review.likes.push(userId);
            await review.save();
            return new NextResponse(JSON.stringify({ success: true, message: "Review liked", likesCount: review.likes.length }), { status: 200 });
        } else {
            // Если лайк уже есть, удаляем userId из массива лайков
            review.likes.splice(userIndex, 1);
            await review.save();
            return new NextResponse(JSON.stringify({ success: true, message: "Review unliked", likesCount: review.likes.length }), { status: 200 });
        }

    } catch (error) {
        console.error("Error details:", error); // Логируем ошибку для отладки
        return new NextResponse(JSON.stringify({ success: false, message: "Error liking review", error }), { status: 500 });
    }
};
