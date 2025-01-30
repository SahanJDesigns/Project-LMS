import { User } from '@/models/models';
import connectMongo from '@/lib/dbconfig';

import clientPromise from '@/lib/mongodb'; // Connect to MongoDB
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id: string;
  }
}

interface Credentials {
  email: string;
  password: string;
}

interface UserType {
  _id: string;
  email: string;
  username: string;
  password: string;
  enrolledCourses: string[];
}

const options: NextAuthOptions = {
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
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credentials | undefined) {
        await connectMongo();
        const user = await User.findOne({ email: credentials?.email }) as UserType | null;

        if (user && credentials?.password === user.password) {
          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            enrolledCourses: user.enrolledCourses,
          };
        }

        throw new Error('Invalid email or password');
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise), // Use MongoDB for storing users
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = { _id: token._id };
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Ensure email is verified
      if ((profile as any).email_verified) {
        return true;
      }
      return false;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(options);
export { handler as POST, handler as GET, options as authOptions };