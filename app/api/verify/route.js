import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { password } = await req.json();

    if (process.env.APP_PASSWORD && password !== process.env.APP_PASSWORD) {
      return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}
