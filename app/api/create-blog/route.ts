import { NextResponse } from 'next/server';

export async function POST() {
  console.log('POST, /create-blog');

  return NextResponse.json({ success: true });
}
