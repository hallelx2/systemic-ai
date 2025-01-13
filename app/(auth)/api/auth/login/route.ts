import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface LoginUser {
  iD: string;
  name: string;
  email: string;
}

interface LoginWithDgraphResponse {
  data: {
    loginWithDgraph: LoginUser;
  }
}

async function fetchLoginWithDgraph(email: string, password: string): Promise<LoginUser> {
  const query = `query LoginWithDgraph($email: String!, $password: String!) {
    loginWithDgraph(email: $email, password: $password) {
      iD
      name
      email
    }
  }`;

  const response = await fetch(process.env.NEXT_GRAPHQL_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { email, password },
    })
  });

  const result = await response.json() as LoginWithDgraphResponse;
  return result.data.loginWithDgraph;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await fetchLoginWithDgraph(email, password);

    // Set HTTP-only cookie
    cookies().set('auth-token', user.iD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      // Set expiration to 7 days
      maxAge: 7 * 24 * 60 * 60
    });

    return NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  }
}
