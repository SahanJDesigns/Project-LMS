import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectMongo from '@/lib/dbconfig';
import User from '@/models/user';

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  try {
    await connectMongo();
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new NextResponse(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return new NextResponse(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Error signing in' }), { status: 500 });
  }
};