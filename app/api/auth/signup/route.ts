import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongo from '@/lib/dbconfig';
import User from '@/models/user';

export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();

  try {
    await connectMongo();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return new NextResponse(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Error creating user' }), { status: 500 });
  }
};