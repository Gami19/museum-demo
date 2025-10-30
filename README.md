## 📋 **設定まとめ**

## 🏗️ **プロジェクト概要**

```yaml
プロジェクト名: 大学歴史建築ミュージアム
目的: Cursor課金促進のためのデモアプリ
対象: 大学上層部（非エンジニア）
技術レベル: 学生が作成したことを強調
開発期間: 2週間程度（想定）
```

## 💻 **技術スタック（確定版）**

### **フロントエンド**
```json
{
  "framework": "Next.js 15",
  "language": "TypeScript", 
  "styling": "Tailwind CSS",
  "3d": "@react-three/fiber + @react-three/drei",
  "animation": "Framer Motion",
  "ui": "Radix UI + Lucide React"
}
```

### **バックエンド/API**
```json
{
  "runtime": "Next.js API Routes",
  "ai_services": "Google Cloud AI (無料枠)",
  "state": "Zustand",
  "deployment": "Vercel"
}
```

### **AI機能**
```json
{
  "vision": "Cloud Vision API (1,000ユニット/月)",
  "tts": "Cloud Text-to-Speech (400万文字/月)",
  "translation": "Cloud Translation (50万文字/月)", 
  "chat": "Vertex AI Gemini ($300クレジット)",
  "image_gen": "Imagen ($300クレジット)"
}
```

## 📦 **パッケージ一覧（最終版）**

```bash
# 基本フレームワーク
npm install next@latest react@latest react-dom@latest typescript

# Google Cloud AI
npm install @google-cloud/vision @google-cloud/text-to-speech @google-cloud/translate

# UI/UX
npm install framer-motion lucide-react @radix-ui/react-dialog @radix-ui/react-tabs

# 3D（Node.js 22.20.0対応）
npm install three @types/three @react-three/fiber @react-three/drei

# ユーティリティ
npm install clsx tailwind-merge zustand

# 開発依存関係
npm install -D @types/node @types/react @types/react-dom tailwindcss
```

## ⚙️ **設定ファイル構成**

### **1. next.config.ts**
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID,
    GOOGLE_CLOUD_REGION: process.env.GOOGLE_CLOUD_REGION || 'asia-northeast1',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || '大学歴史建築ミュージアム',
    NEXT_PUBLIC_DEMO_MODE: process.env.DEMO_MODE || 'true',
    API_RATE_LIMIT: process.env.API_RATE_LIMIT || '10',
    DAILY_LIMIT: process.env.DAILY_LIMIT || '100',
  },

  publicRuntimeConfig: {
    appName: process.env.NEXT_PUBLIC_APP_NAME || '大学歴史建築ミュージアム',
    demoMode: process.env.DEMO_MODE === 'true',
  },

  serverRuntimeConfig: {
    googleCloud: {
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFile: process.env.GOOGLE_CLOUD_KEY_FILE,
      region: process.env.GOOGLE_CLOUD_REGION || 'asia-northeast1',
    },
    security: {
      allowedIPs: process.env.ALLOWED_IPS?.split(',') || [],
      apiRateLimit: parseInt(process.env.API_RATE_LIMIT || '10'),
      dailyLimit: parseInt(process.env.DAILY_LIMIT || '100'),
    }
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex' },
          { key: 'Cache-Control', value: process.env.DEMO_MODE === 'true' ? 's-maxage=3600' : 's-maxage=0' },
        ],
      },
    ]
  },

  images: {
    domains: ['storage.googleapis.com', 'firebasestorage.googleapis.com'],
  },

  typescript: {
    ignoreBuildErrors: process.env.DEMO_MODE === 'true',
  },
}

export default nextConfig
```

### **2. .env.local**
```bash
# Google Cloud設定
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_KEY_FILE=./config/service-account.json
GOOGLE_CLOUD_REGION=asia-northeast1

# アプリケーション設定
NEXT_PUBLIC_APP_NAME=大学歴史建築ミュージアム
DEMO_MODE=true

# セキュリティ設定
ALLOWED_IPS=127.0.0.1,your-university-ip
API_RATE_LIMIT=10
DAILY_LIMIT=100

# 環境
NODE_ENV=development
```

### **3. tailwind.config.ts**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f1',
          500: '#2c5530', // 深緑（格式）
          900: '#1a3320',
        },
        accent: {
          400: '#fbbf24',
          500: '#d4af37', // 金色（権威）
        }
      },
      fontFamily: {
        'serif': ['Noto Serif JP', 'serif'],
      }
    },
  },
  plugins: [],
}
export default config
```

## 📁 **プロジェクト構造（最終版）**

```
museum-demo/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── api/
│   │       ├── vision/route.ts
│   │       ├── tts/route.ts
│   │       ├── translate/route.ts
│   │       └── chat/route.ts
│   ├── components/
│   │   ├── ui/
│   │   ├── BuildingRecognition.tsx
│   │   ├── VirtualTour.tsx
│   │   ├── AudioGuide.tsx
│   │   ├── AIChat.tsx
│   │   └── Navigation.tsx
│   ├── lib/
│   │   ├── config.ts
│   │   ├── google-cloud.ts
│   │   ├── building-data.ts
│   │   └── utils.ts
│   ├── data/
│   │   ├── buildings.json
│   │   └── pregenerated/
│   │       ├── audio/
│   │       ├── images/
│   │       └── descriptions/
│   └── types/
│       └── building.ts
├── public/
│   ├── buildings/
│   ├── audio/
│   └── favicon.ico
├── config/
│   └── service-account.json
├── .env.local
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎯 **実装優先順位（最終版）**

### **Phase 1: 基盤構築**
1. プロジェクト初期設定
2. メインページレイアウト
3. 基本コンポーネント作成

### **Phase 2: AI機能（無料枠）**
4. Vision API建物認識
5. Text-to-Speech音声ガイド
6. Translation API多言語対応

### **Phase 3: 3D・高度機能**
7. React Three Fiber 3Dビューア
8. Gemini AIチャット
9. 最終統合・デザイン調整

## 🔒 **セキュリティ戦略**

```typescript
// ハイブリッド方式
- 80%事前生成コンテンツ
- 20%リアルタイムAPI
- IP制限 + 使用量制限
- デモモード専用機能
```

## ✅ **準備完了チェックリスト**

- [x] Node.js 22.20.0環境確認
- [x] Next.js 15対応パッケージ選定
- [x] Google Cloud無料枠活用戦略
- [x] セキュリティ対策
- [x] プロジェクト構造設計
- [x] 設定ファイル統合