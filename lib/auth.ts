import { NextAuthOptions, Session as NextAuthSession } from "next-auth";

interface Session extends NextAuthSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/lib/dbconfig";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectMongo();
        if (!credentials) {
          return null;
        }

        const user = await User.findOne({ name: credentials.username }) as { _id: string, name: string, email: string, password: string };

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectMongo();
      if (account && account.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = new User({
            name: user.name,
            email: user.email,
            password: undefined, // Password is not needed for Google sign-in
          });
          await newUser.save();
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as Session["user"]).id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
};