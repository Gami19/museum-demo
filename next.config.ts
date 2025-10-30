import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 環境変数設定
  env: {
    // Google Cloud設定
    GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID,
    GOOGLE_CLOUD_REGION: process.env.GOOGLE_CLOUD_REGION || 'asia-northeast1',
    
    // アプリケーション設定
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || '大学歴史建築ミュージアム',
    NEXT_PUBLIC_DEMO_MODE: process.env.DEMO_MODE,
    
    // API制限設定
    API_RATE_LIMIT: process.env.API_RATE_LIMIT ,
    DAILY_LIMIT: process.env.DAILY_LIMIT ,
  },

  // 公開環境変数（クライアントサイドで使用可能）
  publicRuntimeConfig: {
    appName: process.env.NEXT_PUBLIC_APP_NAME ,
    demoMode: process.env.DEMO_MODE === 'true',
  },

  // サーバーサイド専用環境変数
  serverRuntimeConfig: {
    googleCloud: {
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFile: process.env.GOOGLE_CLOUD_KEY_FILE,
      region: process.env.GOOGLE_CLOUD_REGION ,
    },
    security: {
      allowedIPs: process.env.ALLOWED_IPS?.split(',') || [],
      apiRateLimit: parseInt(process.env.API_RATE_LIMIT || '10'),
      dailyLimit: parseInt(process.env.DAILY_LIMIT || '100'),
    }
  },

  // API設定
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : '*'
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
          {
            key: 'Cache-Control',
            value: process.env.DEMO_MODE === 'true' ? 's-maxage=3600' : 's-maxage=0',
          },
        ],
      },
    ]
  },

  // 環境別設定
  ...(process.env.NODE_ENV === 'development' && {
    // 開発環境専用設定
    experimental: {
      turbo: {
        rules: {
          '*.svg': {
            loaders: ['@svgr/webpack'],
            as: '*.js',
          },
        },
      },
    },
  }),

  // 画像設定
  images: {
    domains: ['storage.googleapis.com', 'firebasestorage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
      },
    ],
  },

  // TypeScript設定
  typescript: {
    ignoreBuildErrors: process.env.DEMO_MODE === 'true',
  },
}

export default nextConfig