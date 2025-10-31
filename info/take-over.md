## 📚 **プロジェクト引き継ぎドキュメント**
---

## 🎯 **プロジェクト概要**

### **目的**
- **主目的**: Cursor エディタの課金を大学組織に承認してもらうためのデモアプリケーション作成
- **サブ目的**: 学生が短期間で高品質なアプリを作れることを証明
- **対象建物**: 大学の明治・大正時代の歴史的建築物をミュージアム化

### **ターゲットユーザー**
- **メイン**: 大学上層部（非エンジニア）
- **重視点**: 技術よりデザイン・UX
- **デバイス**: デスクトップ（プレゼン）> タブレット > スマホ

---

## 💻 **技術仕様**

### **開発環境制約**
```yaml
Node.js: 22.20.0 (24.4.0+不可)
OS: Mac
言語: TypeScript
フレームワーク: Next.js 15
```

### **確定技術スタック**
```json
{
  "frontend": "Next.js 15 + TypeScript + Tailwind CSS",
  "3d": "@react-three/fiber + @react-three/drei (camera-controls不使用)",
  "ui": "Framer Motion + Radix UI + Lucide React",
  "ai": "Google Cloud AI APIs (無料枠優先)",
  "state": "Zustand",
  "deployment": "Vercel"
}
```

---

## 🔧 **セットアップ手順**

### **1. プロジェクト作成**
```bash
npx create-next-app@latest museum-demo --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd museum-demo
```

### **2. 依存関係インストール**
```bash
# Google Cloud AI
npm install @google-cloud/vision @google-cloud/text-to-speech @google-cloud/translate

# UI/UX
npm install framer-motion lucide-react @radix-ui/react-dialog @radix-ui/react-tabs

# 3D (Node.js 22.20.0対応版)
npm install three @types/three @react-three/fiber @react-three/drei

# ユーティリティ
npm install clsx tailwind-merge zustand

# 開発用
npm install -D @types/node @types/react @types/react-dom
```

### **3. 重要な注意点**
```bash
# ❌ 使用禁止 (Node.js 24.4.0+が必要)
npm install camera-controls

# ✅ 代替使用
npm install @react-three/drei  # OrbitControlsを使用
```

---

## ⚙️ **設定ファイル（必須）**

### **next.config.ts**
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

### **tailwind.config.ts**
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

### **.env.local（テンプレート）**
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

NODE_ENV=development
```

---

## 🏗️ **プロジェクト構造**

```
museum-demo/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx                # メインページ
│   │   └── api/                    # API Routes
│   │       ├── vision/route.ts     # 画像認識
│   │       ├── tts/route.ts        # 音声合成
│   │       ├── translate/route.ts  # 翻訳
│   │       └── chat/route.ts       # AI対話
│   ├── components/
│   │   ├── ui/                     # 基本UI
│   │   ├── BuildingRecognition.tsx # 建物認識
│   │   ├── VirtualTour.tsx         # 3Dビューア
│   │   ├── AudioGuide.tsx          # 音声ガイド
│   │   ├── AIChat.tsx              # AIチャット
│   │   └── Navigation.tsx          # ナビゲーション
│   ├── lib/
│   │   ├── config.ts               # 設定統合
│   │   ├── google-cloud.ts         # Google Cloud設定
│   │   ├── building-data.ts        # 建物データ
│   │   └── utils.ts                # ユーティリティ
│   ├── data/
│   │   ├── buildings.json          # 建物マスターデータ
│   │   └── pregenerated/           # 事前生成コンテンツ
│   │       ├── audio/
│   │       ├── images/
│   │       └── descriptions/
│   └── types/
│       └── building.ts             # 型定義
├── public/
│   ├── buildings/                  # 建物写真
│   └── audio/                      # 音声ファイル
├── config/
│   └── service-account.json        # Google Cloud認証
├── .env.local
└── (設定ファイル群)
```

---

## 🤖 **Google Cloud AI活用戦略**

### **永続無料枠（Always Free）**
```typescript
const freeServices = {
  "Cloud Vision API": "1,000ユニット/月", // 建物認識
  "Cloud Text-to-Speech": "400万文字/月", // 音声ガイド  
  "Cloud Translation": "50万文字/月", // 多言語対応
  "Cloud Natural Language": "5,000ユニット/月" // テキスト解析
}
```

### **$300無料トライアル活用**
```typescript
const paidServices = {
  "Vertex AI Gemini": "AIチャット対話",
  "Imagen": "建物復元画像生成"
}
```

### **セキュリティ戦略**
```typescript
const securityStrategy = {
  approach: "ハイブリッド方式",
  ratio: "80%事前生成 + 20%リアルタイムAPI",
  protection: [
    "IP制限",
    "使用量制限（日次・月次）", 
    "デモモード切り替え",
    "事前生成フォールバック"
  ]
}
```

---

## 🎯 **実装優先順位**

### **Phase 1: 基盤（必須）**
```typescript
const phase1 = [
  "1. プロジェクト初期化",
  "2. メインページレイアウト", 
  "3. 基本コンポーネント作成",
  "4. 設定ファイル統合"
]
```

### **Phase 2: AI機能（無料枠）**
```typescript
const phase2 = [
  "5. Vision API建物認識",
  "6. Text-to-Speech音声ガイド",
  "7. Translation API多言語対応"
]
```

### **Phase 3: 高度機能**
```typescript
const phase3 = [
  "8. React Three Fiber 3Dビューア",
  "9. Gemini AIチャット",
  "10. 最終UI/UX調整"
]
```

---

## 🎨 **デザインガイドライン**

### **カラーパレット**
```css
:root {
  --primary: #2c5530;      /* 深緑（格式・伝統） */
  --accent: #d4af37;       /* 金色（権威・高級感） */
  --text: #333333;         /* 読みやすい黒 */
  --bg: #f8f6f0;          /* クリーム（親しみやすさ） */
}
```

### **デザイン方針**
```yaml
スタイル: 和モダン調（伝統とデジタルの融合）
対象: 非エンジニア上層部
重視点: 
  - 直感的操作性
  - 高級感・品格
  - 視覚的インパクト
  - レスポンシブ対応
```

---

## 🚀 **重要なコード例**

### **3D実装（camera-controls代替）**
```typescript
// src/components/VirtualTour.tsx
'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'

export function VirtualTour() {
  return (
    <div className="h-96 w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="sunset" />
        {/* 3D建物モデル */}
      </Canvas>
    </div>
  )
}
```

### **建物データ構造**
```typescript
// src/types/building.ts
export interface Building {
  id: string;
  name: string;
  era: '明治' | '大正';
  year: number;
  description: string;
  images: string[];
  audioGuide?: string;
  aiDescription?: string;
  location: {
    lat: number;
    lng: number;
  };
  features: string[];
}
```

---

## ⚠️ **注意事項・制約**

### **技術制約**
1. **Node.js 22.20.0必須** - camera-controls使用不可
2. **Google Cloud無料枠** - 使用量制限に注意
3. **デモ用途** - 本格運用には追加セキュリティ必要

### **セキュリティ注意点**
1. **API キー保護** - 環境変数で管理
2. **使用量制限** - 日次・月次制限実装
3. **IP制限** - 許可IPからのみアクセス

---

## 📋 **次の開発者への指示**

### **開始時チェックリスト**
- [ ] Node.js 22.20.0環境確認
- [ ] Google Cloudアカウント準備
- [ ] 上記設定ファイル全て作成
- [ ] パッケージインストール完了
- [ ] `npm run dev`でエラーなし

### **最初に実装すべき機能**
1. **メインページレイアウト** - 全体の見た目確認
2. **ダミーデータでUI作成** - API未接続で基本機能
3. **段階的にAI機能追加** - Vision API → TTS → 翻訳の順

### **デモ成功の鍵**
- 視覚的インパクト重視
- 操作の簡単さ
- 「学生がCursorで作成」のストーリー
- コスト効率の良さをアピール
