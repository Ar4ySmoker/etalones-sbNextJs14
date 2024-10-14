// import { connectToDB } from "@/lib/utils";
// import { User } from "@/lib/models";
// import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// // import bcrypt from "bcryptjs";
// import bcrypt from "bcryptjs"; 

// export const authOptions: NextAuthOptions  = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID as string,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET as string
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       id: "credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await connectToDB();
//         const userFound = await User.findOne({
//           email: credentials?.email,
//         }).select("+password");

//         if (!userFound) throw new Error("Invalid Email");

//         const passwordMatch = await bcrypt.compare(
//           credentials!.password,
//           userFound.password
//         );

//         if (!passwordMatch) throw new Error("Invalid Password");
//         return userFound;
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
//     async jwt({ token, user, session, trigger }) {
//       if (trigger === "update" && session?.name) {
//         token.name = session.name;
//       }

//       if (trigger === "update" && session?.email) {
//         token.email = session.email;
//       }

//       if (user) {
//         const u = user as unknown as any;
//         return {
//           ...token,
//           id: u.id,
//           phone: u.phone,
//         };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           _id: token.id,
//           name: token.name,
//           phone: token.phone,
//         }
//       };
//     },
//   },
// };
// pages/api/auth/[...nextauth].ts

import { connectToDB } from "@/lib/utils";
import { Manager } from "@/lib/models"; // Убедитесь, что у вас есть модель Manager
import type { NextAuthOptions } from "next-auth";
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
          image: user.image,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id, // ID пользователя
          name: token.name,
          email: token.email,
          image: token.image,
        },
      };
    },
  },
};
