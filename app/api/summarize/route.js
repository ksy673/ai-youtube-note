import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenAI } from '@google/genai';

export async function POST(req) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API 키가 설정되지 않았습니다. .env.local 파일에 GEMINI_API_KEY를 설정하고 서버를 재시작해주세요.' },
        { status: 500 }
      );
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const { youtubeUrl, password } = await req.json();

    // Check application password
    if (process.env.APP_PASSWORD && password !== process.env.APP_PASSWORD) {
      return NextResponse.json({ error: '인증 실패: 잘못된 비밀번호입니다.' }, { status: 401 });
    }

    if (!youtubeUrl) {
      return NextResponse.json({ error: 'YouTube URL is required' }, { status: 400 });
    }

    // 1. Fetch transcript from YouTube
    let transcriptData;
    try {
      transcriptData = await YoutubeTranscript.fetchTranscript(youtubeUrl);
    } catch (err) {
      console.error('Transcript error:', err);
      return NextResponse.json(
        { error: '해당 영상은 유튜브의 봇 방어 로직에 의해 자막 추출이 차단되었거나, 외부 자막이 허용되지 않은 영상입니다. (다른 영상으로 시도해주세요!)' },
        { status: 400 }
      );
    }

    if (!transcriptData || transcriptData.length === 0) {
      return NextResponse.json({ error: '추출된 텍스트가 없습니다.' }, { status: 400 });
    }

    // 2. Concatenate transcript text
    const fullTranscript = transcriptData.map((item) => item.text).join(' ');
    
    // Safety check for very large contexts
    const truncatedTranscript = fullTranscript.length > 200000 
      ? fullTranscript.substring(0, 200000) + '... (이하 생략)'
      : fullTranscript;

    // 3. Summarize using Gemini API
    const systemPrompt = `당신은 핵심을 잘 짚어내는 훌륭한 요약 에이전트입니다. 
다음은 유튜브 영상의 자막입니다. 이 내용을 바탕으로 시청자가 영상의 핵심 정보를 빠르게 파악할 수 있도록 
1. 3~5줄로 된 전체 요약
2. 주요 포인트 (Bullet points)
형식으로 깔끔하고 명확하게 한국어로 요약해주세요.`;

    try {
      const completion = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemPrompt}\n\n여기 자막이 있습니다:\n\n${truncatedTranscript}`,
        config: {
          temperature: 0.5,
        }
      });

      const summary = completion.text;

      return NextResponse.json({ summary });
    } catch (genaiErr) {
      console.error('Gemini Error:', genaiErr);
      return NextResponse.json(
        { error: 'AI 요약 중 오류가 발생했습니다. (API 키 오류 또는 한도 초과일 수 있습니다)' },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error('General Error:', err);
    return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
  }
}
