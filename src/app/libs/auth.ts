// import { connectToDB } from "@/lib/utils";
// import { Manager } from "@/lib/models"; // Убедитесь, что у вас есть модель Manager
// import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID as string,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
//       profile: (profile) => {
//         return {
//           id: profile.sub, // ID пользователя Google
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//         };
//       },
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await connectToDB();

//         const managerFound = await Manager.findOne({
//           email: credentials?.email,
//         });

//         if (!managerFound) {
//           throw new Error("Access denied: Email not found for any manager.");
//         }

//         return managerFound; // Возвращаем данные менеджера
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         return {
//           ...token,
//           id: user.id, // ID пользователя
//           name: user.name,
//           email: user.email,
//           image: user.image,
//         };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         user: {
//           id: token.id, // ID пользователя
//           name: token.name,
//           email: token.email,
//           image: token.image,
//         },
//       };
//     },
//   },
// };
import { connectToDB } from "@/lib/utils";
import { Manager } from "@/lib/models"; // Убедитесь, что у вас есть модель Manager
import type { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      profile: (profile) => {
        return {
          id: profile.sub, // ID пользователя Google
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();

        const managerFound = await Manager.findOne({
          email: credentials?.email,
        });

        if (!managerFound) {
          throw new Error("Access denied: Email not found for any manager.");
        }

        return managerFound; // Возвращаем данные менеджера
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id, // ID пользователя
          name: user.name,
          email: user.email,
          image: user.image ?? null, // Убедитесь, что image имеет правильный тип
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string | undefined, // ID пользователя
        name: token.name as string | null | undefined,
        email: token.email as string | null | undefined,
        image: token.image as string | null | undefined, // Убедитесь, что image имеет правильный тип
      } as Session['user']; // Приведение типа
      return session;
    },
  },
};
