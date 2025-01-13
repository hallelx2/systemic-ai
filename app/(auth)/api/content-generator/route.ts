import { NextRequest, NextResponse } from 'next/server';

interface ContentGeneratorFunctionResponse {
  data: {
    contentGeneratorFunction: string;
  }
}

interface ContentGeneratorFunctionVariables {
  topic: string;
  reviewType: string;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    const variables: ContentGeneratorFunctionVariables = await request.json();

    const query = `query ContentGeneratorFunction($topic: String!, $reviewType: String!, $description: String!) {
      contentGeneratorFunction(topic: $topic, reviewType: $reviewType, description: $description)
    }`;

    const response = await fetch('http://localhost:8686/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      })
    });

    const result = await response.json() as ContentGeneratorFunctionResponse;
    return NextResponse.json({ data: { contentGeneratorFunction: result.data.contentGeneratorFunction } });
  } catch (error) {
    console.error('Error in content generator function:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
