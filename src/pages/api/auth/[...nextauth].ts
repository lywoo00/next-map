import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();
export const authOptions = {
    adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
      })
  ],
  callbacks: {
    async session({ session, user }) {
      // user: Prisma User 모델 객체 (로그인된 유저 정보)
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,               // Prisma User의 id
          name: user.name,           // name, email, image는 이미 session.user에 들어있지만 명시 가능
          email: user.email,
          image: user.image,
        },
      };
    },
  },
//   pages: {
//     signIn: "/users/login",
//   },
}

export default NextAuth(authOptions)


