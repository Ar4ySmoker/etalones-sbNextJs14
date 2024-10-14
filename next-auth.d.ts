import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: any;
      dislikes: any;
      likes: any;
      id: string; // Добавьте поле id
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string; // Также добавьте поле id здесь, если нужно
  }
}
