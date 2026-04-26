import Summarizer from '@/components/Summarizer';

export const metadata = {
  title: 'AI YouTube Note',
  description: '유튜브 링크를 넣으면 AI가 핵심 내용을 요약해줍니다.',
};

export default function Home() {
  return (
    <>
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>
      
      <main className="app-container">
        <h1>AI YouTube Note</h1>
        <p className="subtitle">
          긴 유튜브 영상, 다 볼 시간 없으시죠? 링크만 넣으면 AI가 핵심만 뽑아드립니다.
        </p>

        <Summarizer />
      </main>
    </>
  );
}
