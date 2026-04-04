import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Create the User and an empty Profile
    await prisma.user.create({
      data: { email, password, role: 'user' }
    });

    await prisma.profile.create({
      data: {
        email,
        firstName: '',
        lastName: '',
        bio: '',
        title: '',
        picture: '/images/default-profile.png'
      }
    });

    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
