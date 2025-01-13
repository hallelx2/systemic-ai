import { NextResponse } from "next/server";

interface SignupWithDgraphVariables {
  email: string;
  name: string;
  password: string;
}

async function fetchSignupWithDgraph(variables: SignupWithDgraphVariables) {
  const query = `
    query SignupWithDgraph($email: String!, $name: String!, $password: String!) {
      signupWithDgraph(email: $email, name: $name, password: $password) {
        key
        value
      }
    }
  `;

  const response = await fetch(`${process.env.NEXT_GRAPHQL_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  return result.data.signupWithDgraph;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await fetchSignupWithDgraph(body);
    console.log("Signup successful:", data); // Console log for server-side debugging
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Signup failed:", error); // Log errors for debugging
    return NextResponse.json({ success: false, error: "Signup failed" });
  }
}
