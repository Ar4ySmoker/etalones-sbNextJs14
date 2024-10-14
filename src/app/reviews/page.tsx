// 'use client';
// import { useSession, signIn, signOut } from "next-auth/react";
// import Button from "@/ui/Buttons/Button";
// import { useState, useEffect } from "react";
// import TextInput from "@/ui/TextInput/TextInput";
// import Image from "next/image";

// interface Review {
//     image: any;
//     _id: string; // ID для каждого отзыва
//     name: string;
//     rating: number;
//     comment: string;
//     createdAt: string; 
// }

// const images = [
//     "/reviews/4.jpg",
//     "/reviews/5.jpg",
//     "/reviews/6.jpg",
// ];

// export default function Page() {
//     const { data: session } = useSession();
//     const [reviews, setReviews] = useState<Review[]>([]);
//     const [comment, setComment] = useState("");
//     const [rating, setRating] = useState(5);

//     const fetchReviews = async () => {
//         try {
//             const res = await fetch(`/api/reviews`);
//             const data = await res.json();
//             setReviews(data.reviews);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         fetchReviews();
//     }, []);

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!session) {
//             return;
//         }

//         const body = {
//             name: session.user?.name, // Получаем имя пользователя из сессии
//             rating,
//             comment,
//             image: session.user?.image,
//             userId: session.user?.id,
//         };

//         try {
//             const res = await fetch(`http://localhost:3000/api/reviews`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(body),
//             });

//             if (!res.ok) {
//                 throw new Error("Failed to submit review");
//             }

//             await fetchReviews();
//             setComment("");
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <>
//             <div className="carousel carousel-center bg-neutral rounded-box w-full space-x-4 p-4">
//                 {images.map((src, index) => (
//                     <div className="carousel-item" key={index}>
//                         <Image
//                             src={src}
//                             alt={`Review ${index + 1}`}
//                             className="rounded-box"
//                             width={250}
//                             height={200}
//                         />
//                     </div>
//                 ))}
//             </div>

//             {session ? (
//                 <div>
//                     <h3>Добро пожаловать, {session.user?.name}!</h3>
//                     <form onSubmit={handleSubmit} className="mx-auto w-max flex flex-col mt-5">
//                         <div className="rating mx-auto my-2">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                                 <input
//                                     key={star}
//                                     type="radio"
//                                     name="rating"
//                                     value={star}
//                                     className="mask mask-star-2 bg-orange-400"
//                                     checked={rating === star}
//                                     onChange={() => setRating(star)}
//                                 />
//                             ))}
//                         </div>
//                         <textarea
//                             value={comment}
//                             onChange={(e) => setComment(e.target.value)}
//                             placeholder="Напишите отзыв..."
//                             className="textarea textarea-bordered textarea-lg w-max mb-3"
//                         />
//                         <Button text="Отправить отзыв" isSubmit />
//                     </form>
//                 </div>
//             ) : (
//                 <Button text="Оставить отзыв" onClick={() => signIn("google")} />
//             )}

//             <div className="mt-10 flex flex-wrap">
//                 {reviews.map((review) => (
//                     <div key={review._id} className="card bg-base-100 w-96 shadow-xl mx-auto mb-5">
//                         <div className="card-body">
//                         {review.image && (
//             <Image
//                 src={review.image}
//                 alt={`${review.name}'s picture`}
//                 className="rounded-full w-12 h-12 mr-3"
//                 width={48}
//                 height={48}
//             />
//         )}
//                             <h2 className="card-title">{review.name}</h2>
//                             <p>{review.comment}</p>
//                             <div className="card-actions justify-end">
//                                 <div className="rating">
//                                     {[...Array(5)].map((_, i) => (
//                                         <input
//                                             key={i}
//                                             type="radio"
//                                             name={`rating-${review._id}`}
//                                             className="mask mask-star-2 bg-orange-400"
//                                             defaultChecked={i < review.rating}
//                                             readOnly
//                                             disabled
//                                         />
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// }
'use client';
import { useSession, signIn } from "next-auth/react";
import Button from "@/ui/Buttons/Button";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ThumbsDown, ThumbsUp } from "lucide-react";

interface Review {
    image: any;
    _id: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: string;
    userId: string; // Добавляем userId
    likes: string;
    dislikes: string;
}

const images = [
    "/reviews/1.jpg",
    "/reviews/2.jpg",
    "/reviews/4.jpg",
    "/reviews/5.jpg",
    "/reviews/6.jpg",
    "/reviews/7.jpg",
    "/reviews/8.jpg",
    "/reviews/9.jpg",
    "/reviews/10.jpg",

];

export default function Page() {
    const { data: session } = useSession();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`/api/reviews`);
            const data = await res.json();
            setReviews(data.reviews);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session) {
            return;
        }

        const body = {
            name: session.user?.name,
            rating,
            comment,
            email: session.user?.email,
            image: session.user?.image,
            userId: session.user?.id,
            likes: [] ,
            dislikes: [] ,
        };

        try {
            const res = await fetch(`http://localhost:3000/api/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error("Failed to submit review");
            }

            await fetchReviews();
            setComment("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (review: Review) => {
        setEditingReviewId(review._id);
        setComment(review.comment);
        setRating(review.rating);
    };

    const handleDelete = async (reviewId: string) => {
        try {
            const res = await fetch(`http://localhost:3000/api/reviews`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: reviewId }),
            });

            if (!res.ok) {
                throw new Error("Failed to delete review");
            }

            await fetchReviews();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session || !editingReviewId) {
            return;
        }

        const body = {
            id: editingReviewId,
            comment,
            rating,
        };

        try {
            const res = await fetch(`http://localhost:3000/api/reviews`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error("Failed to update review");
            }

            await fetchReviews();
            setComment("");
            setEditingReviewId(null);
        } catch (error) {
            console.log(error);
        }
    };
    const handleLike = async (review: Review) => {
        try {
            const response = await fetch(`/api/reviews/${review._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: session.user.id }), // Передаем ID пользователя
            });
    
            if (!response.ok) {
                throw new Error('Не удалось поставить лайк');
            }
    
            const result = await response.json();
            console.log("Каунт лайков", result.likesCount); // Обновленное количество лайков
            await fetchReviews(); // Обновляем список отзывов
        } catch (error) {
            console.error('Ошибка при ставлении лайка:', error);
        }
    };
    
    
    return (
        <>
            <div className="carousel carousel-center bg-neutral rounded-box w-full space-x-4 p-4">
                {images.map((src, index) => (
                    <div className="carousel-item" key={index}>
                        <Image
                            src={src}
                            alt={`Review ${index + 1}`}
                            className="rounded-box"
                            width={250}
                            height={200}
                        />
                    </div>
                ))}
            </div>

            {session ? (
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="flex gap-1 items-center">
                    <Image
                            src={session.user?.image}
                            alt={`44`}
                            className="rounded-box"
                            width={30}
                            height={30}
                        />
                    <p>{session.user?.name}</p>
                    <Button text="Сменить акаунт" className="w-max h-max text-xs m-0 p-1 btn-xs btn-outline" onClick={() => signIn("google")} />

                    </div>
                    <form onSubmit={handleSubmit} className="mx-auto w-max flex flex-col ">
                        <div className="rating mx-auto my-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <input
                                    key={star}
                                    type="radio"
                                    name="rating"
                                    value={star}
                                    className="mask mask-star-2 bg-orange-400"
                                    checked={rating === star}
                                    onChange={() => setRating(star)}
                                />
                            ))}
                        </div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Напишите отзыв..."
                            className="textarea textarea-bordered textarea-lg w-max mb-3"
                        />
                        <Button text={editingReviewId ? "Обновить отзыв" : "Отправить отзыв"} isSubmit />
                    </form>
                </div>
            ) : (
                <Button text="Оставить отзыв" onClick={() => signIn("google")} />
            )}

            <div className="mt-10 flex flex-wrap">

                <div className="mt-10 flex flex-wrap">
    {reviews.map((review) => (
        <div key={review._id} className="card bg-base-100 w-96 shadow-xl mx-auto mb-5">
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                        {review.image && (
                            <Image
                                src={review.image}
                                alt={`${review.name}'s picture`}
                                className="rounded-full w-12 h-12 mr-3"
                                width={48}
                                height={48}
                            />
                        )}
                        <h2 className="card-title">{review.name}</h2>
                    </div>
                    <div className="card-actions justify-end">
                        <div className="rating">
                            {[...Array(5)].map((_, i) => (
                                <input
                                    key={i}
                                    type="radio"
                                    name={`rating-${review._id}`}
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked={i < review.rating}
                                    readOnly
                                    disabled
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <p>{review.comment}</p>
            </div>
            {session && review.userId === session.user.id && (
                <div className="flex gap-3 w-full justify-end p-3">
                    <p>{review.likes?.length}</p> {/* Отображаем количество лайков */}
                    <Button text="👍" onClick={() => handleLike(review)} />
                </div>
            )}
        </div>
    ))}
</div>

            </div>

        </>
    );
}



            {/* <div className="mt-10 flex flex-wrap">
                {reviews.map((review) => (
                    <div key={review._id} className="card bg-base-100 w-96 shadow-xl mx-auto mb-5">
                        <div className="card-body">
                            {review.image && (
                                <Image
                                    src={review.image}
                                    alt={`${review.name}'s picture`}
                                    className="rounded-full w-12 h-12 mr-3"
                                    width={48}
                                    height={48}
                                />
                            )}
                            <h2 className="card-title">{review.name}</h2>
                            <p>{review.comment}</p>
                            <div className="card-actions justify-end">
                                <div className="rating">
                                    {[...Array(5)].map((_, i) => (
                                        <input
                                            key={i}
                                            type="radio"
                                            name={`rating-${review._id}`}
                                            className="mask mask-star-2 bg-orange-400"
                                            defaultChecked={i < review.rating}
                                            readOnly
                                            disabled
                                        />
                                    ))}
                                </div>
                                {session?.user?.id === review.userId && (
                                    <>
                                        <Button text="Редактировать" onClick={() => handleEdit(review)} />
                                        <Button text="Удалить" onClick={() => handleDelete(review._id)} />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}