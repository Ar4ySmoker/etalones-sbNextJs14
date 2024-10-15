// import { connectToDB } from '@/lib/utils';
// import {Reviews} from '@/lib/models'; // Убедитесь, что ваша модель правильная
// import { NextRequest, NextResponse } from 'next/server';

// export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
//     try {
//         await connectToDB();
        
//         const reviewId = params.id; // Получаем ID отзыва из параметров
//         const data = await request.json(); // Получаем данные из тела запроса
//         const { userId } = data; // Извлекаем userId

//         console.log("USERID", userId); // Логируем ID пользователя

//         // Находим отзыв по ID
//         const review = await Reviews.findById(reviewId);
//         if (!review) {
//             return new NextResponse(JSON.stringify({ success: false, message: "Review not found" }), { status: 404 });
//         }

//         // Проверяем, существует ли лайк от этого пользователя
//         const userIndex = review.likes.indexOf(userId);
        
//         if (userIndex === -1) {
//             // Если лайка нет, добавляем userId в массив лайков
//             review.likes.push(userId);
//             await review.save();
//             return new NextResponse(JSON.stringify({ success: true, message: "Review liked", likesCount: review.likes.length }), { status: 200 });
//         } else {
//             // Если лайк уже есть, удаляем userId из массива лайков
//             review.likes.splice(userIndex, 1);
//             await review.save();
//             return new NextResponse(JSON.stringify({ success: true, message: "Review unliked", likesCount: review.likes.length }), { status: 200 });
//         }

//     } catch (error) {
//         console.error("Error details:", error); // Логируем ошибку для отладки
//         return new NextResponse(JSON.stringify({ success: false, message: "Error liking review", error }), { status: 500 });
//     }
// };
import { connectToDB } from '@/lib/utils';
import { Reviews } from '@/lib/models'; // Убедитесь, что ваша модель правильная
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();
        
        const reviewId = params.id; // Получаем ID отзыва из параметров
        const data = await request.json(); // Получаем данные из тела запроса
        const { userId, action } = data; // Извлекаем userId и действие (like или dislike)

        console.log("USERID", userId); // Логируем ID пользователя

        // Находим отзыв по ID
        const review = await Reviews.findById(reviewId);
        if (!review) {
            return new NextResponse(JSON.stringify({ success: false, message: "Review not found" }), { status: 404 });
        }

        if (action === 'like') {
            // Логика для лайков
            const userIndex = review.likes.indexOf(userId);
            if (userIndex === -1) {
                // Если лайка нет, добавляем userId в массив лайков
                review.likes.push(userId);
            } else {
                // Если лайк уже есть, удаляем userId из массива лайков
                review.likes.splice(userIndex, 1);
            }
        } else if (action === 'dislike') {
            // Логика для дизлайков
            const userIndex = review.dislikes.indexOf(userId);
            if (userIndex === -1) {
                // Если дизлайка нет, добавляем userId в массив дизлайков
                review.dislikes.push(userId);
            } else {
                // Если дизлайк уже есть, удаляем userId из массива дизлайков
                review.dislikes.splice(userIndex, 1);
            }
        } else {
            return new NextResponse(JSON.stringify({ success: false, message: "Invalid action" }), { status: 400 });
        }

        await review.save();
        const likesCount = review.likes.length;
        const dislikesCount = review.dislikes.length;

        return new NextResponse(JSON.stringify({ success: true, message: "Review updated", likesCount, dislikesCount }), { status: 200 });

    } catch (error) {
        console.error("Error details:", error); // Логируем ошибку для отладки
        return new NextResponse(JSON.stringify({ success: false, message: "Error updating review", error }), { status: 500 });
    }
};
