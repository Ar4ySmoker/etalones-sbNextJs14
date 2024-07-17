'use client'
import Button from "@/ui/Buttons/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/ui/TextInput/TextInput";

interface Review {
    name: string;
    rating: number;
    comment: string;
    createdAt: string; 
}

export default function Page() {
    const [reviews, setReviews] = useState<Review[]>([]);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/reviews`);
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
        const formData = new FormData(e.currentTarget);
        const body = {
            name: formData.get("name")?.toString() || "",
            rating: formData.get("rating-2")?.toString() || "",
            comment: formData.get("comment")?.toString() || "",
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

            // Перезагрузить отзывы после успешной отправки
            await fetchReviews();
            e.currentTarget.reset(); // Сброс формы после успешной отправки
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mx-auto w-max flex flex-col mt-5">
                <textarea
                    id="comment"
                    name="comment" // Убедитесь, что это поле имеет имя
                    placeholder="Напишите отзыв..."
                    className="textarea textarea-bordered textarea-lg w-max mb-3"
                ></textarea>
                <TextInput id="name" name="name" title="Ваше имя" /> {/* Добавлено имя */}
                <div className="rating mx-auto my-2">
                    <input type="radio" name="rating-2" value="1" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-2" value="2" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-2" value="3" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-2" value="4" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-2" value="5" className="mask mask-star-2 bg-orange-400" defaultChecked />
                </div>
                <Button text="Отправить отзыв" isSubmit />
            </form>

            <div className="mt-10">
                {reviews.map((review, index) => (
                    <div key={index} className="card bg-base-100 w-96 shadow-xl mx-auto mb-5">
                        <div className="card-body">
                            <h2 className="card-title">{review.name}</h2>
                            <div>
                            {/* <p>{review.createdAt()}</p> */}

                            <p>{review.comment}</p>
                            </div>
                            <div className="card-actions justify-end">
                                <div className="rating">
                                    {[...Array(5)].map((_, i) => (
                                        <input
                                            key={i}
                                            type="radio"
                                            name={`rating-${index}`}
                                            className="mask mask-star-2 bg-orange-400"
                                            defaultChecked={i < review.rating}
                                            readOnly
                                            disabled
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
