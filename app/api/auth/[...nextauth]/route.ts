import { User } from '@/models/models';
import connectMongo from '@/lib/dbconfig';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = { _id: token._id};
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
};


const haddler = NextAuth(options);
export { haddler as POST ,
         haddler as GET,
         options as authOptions};