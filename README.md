# 🎥 AI YouTube Note / AI YouTubeノート

🇰🇷 [한국어](#한국어) | 🇯🇵 [日本語](#日本語)

---

## 🇰🇷 한국어

### 프로젝트 소개
**AI YouTube Note**는 유튜브(YouTube) 영상 링크를 입력하면, 영상을 직접 시청하지 않아도 AI가 자막을 추출하여 핵심 내용을 간결하게 요약해 주는 스마트 메모장입니다. Next.js 기반으로 구축되었으며, 빠르고 효율적인 Google Gemini API를 활용합니다.

### ✨ 주요 기능
- **영상 요약:** 유튜브 링크만으로 전체 내용 3~5줄 요약 및 주요 포인트 제공
- **자동 자막 추출:** `youtube-transcript`를 통해 원본 영상의 자막을 정확하게 추출
- **프리미엄 UI:** 네온 포인트가 가미된 세련된 다크 모드 및 글래스모피즘(Glassmorphism) 디자인
- **클립보드 복사:** 요약된 텍스트를 버튼 한 번으로 손쉽게 복사

### 💻 기술 스택
- **Framework:** Next.js (App Router)
- **Styling:** 순수 CSS (Vanilla CSS)
- **AI API:** Google Gemini (`@google/genai` - gemini-2.5-flash)
- **Deployment:** Vercel (권장)

### 🚀 설치 및 실행 방법

1. 패키지 설치
```bash
npm install
```

2. 환경 변수 설정
프로젝트 루트 경로에 `.env.local` 파일을 생성하고 발급받은 Gemini API 키를 입력합니다.
```text
GEMINI_API_KEY=your_gemini_api_key_here
```

3. 로컬 서버 실행
```bash
npm run dev
```

서버가 실행되면 브라우저에서 `http://localhost:3000` 으로 접속하여 앱을 사용할 수 있습니다.

.env.local에 본인의 API키를 입력하여 사용하여 주세요. 저는 제미나이의 API키를 이용하여 사용했습니다. 

---

## 🇯🇵 日本語

### プロジェクトの概要
**AI YouTube Note**は、YouTubeの動画リンクを入力するだけで、動画を通しで見なくてもAIが字幕を抽出し、核心となる内容を簡潔に要約してくれるスマートノートアプリです。Next.jsをベースに構築されており、高速で効率的なGoogle Gemini APIを活用しています。

### ✨ 主な機能
- **動画の要約:** YouTubeリンクだけで、全体内容の3〜5行要約と主要なポイントを提供
- **自動字幕抽出:** `youtube-transcript`により、元動画の字幕を取り出して正確に抽出
- **プレミアムUI:** ネオンアクセントを取り入れた洗練されたダークモードとグラスモーフィズム(Glassmorphism)デザイン
- **クリップボードへのコピー:** 要約されたテキストをワンクリックで簡単にコピー可能

### 💻 使用技術
- **Framework:** Next.js (App Router)
- **Styling:** ピュアCSS (Vanilla CSS)
- **AI API:** Google Gemini (`@google/genai` - gemini-2.5-flash)
- **Deployment:** Vercel (推奨)

### 🚀 セットアップと実行方法

1. パッケージのインストール
```bash
npm install
```

2. 環境変数の設定
プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、取得したGemini APIキーを入力します。
```text
GEMINI_API_KEY=your_gemini_api_key_here
```

3. ローカルサーバーの起動
```bash
npm run dev
```

サーバーの起動後、ブラウザで `http://localhost:3000` にアクセスしてアプリを使用できます。

.env.localに本人のAPIキーを入力して使用してください。私はGeminiのAPIキーを利用しました。 
