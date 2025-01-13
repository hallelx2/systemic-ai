// app/api/auth/check/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const authToken = cookies().get('auth-token');

  if (!authToken || !authToken.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  // If auth-token (user ID) exists, consider the user authenticated
  return NextResponse.json({ authenticated: true }, { status: 200 });
}
