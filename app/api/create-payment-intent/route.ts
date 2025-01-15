import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const { amount } = await req.json();

  let parsedAmount: number;
  console.log(amount);
  if (typeof amount === 'string') {
    parsedAmount = parseFloat(amount);
  } else if (typeof amount === 'number') {
    parsedAmount = amount;
  } else {
    
    return NextResponse.json({ error: 'Invalid amount' }, { status: 403 });
  }

  if (isNaN(parsedAmount) || parsedAmount <= 0) {

    return NextResponse.json({ error: 'Invalid amount' }, { status: 401 });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parsedAmount, // Convert to smallest currency unit
      currency: 'usd',
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}