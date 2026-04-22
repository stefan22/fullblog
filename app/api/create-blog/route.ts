import { NextResponse } from 'next/server';
import { getToken } from '@/lib/auth-server';

export async function POST() {
  console.log('POST, /create-blog');
  //get token
  const token = await getToken();
  if (!token) {
    //not signin
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  console.log('Valid request w/token', token.substring(0, 10) + '....');
  return NextResponse.json({ success: true });
}
