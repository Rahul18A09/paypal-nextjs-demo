import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const normalizedEmail =
          credentials?.email?.trim()?.toLowerCase();
        const rawPassword =
          credentials?.password?.trim();

        if (!normalizedEmail || !rawPassword) {
          throw new Error("Invalid credentials");
        }

        await connectDB();

        const user = await User.findOne({
          email: normalizedEmail,
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(
          rawPassword,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };