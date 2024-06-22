import { NextRequest, NextResponse } from 'next/server';

// This is a placeholder response. Replace this with your own logic for generating responses.
const generateAssistantResponse = (message: string): string => {
  return `You said: ${message}`;
};

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  
  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const response = generateAssistantResponse(message);
  return NextResponse.json({ response }, { status: 200 });
}
