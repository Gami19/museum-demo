import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export const config = {
  // クライアント・サーバー両方で使用可能
  app: {
    name: publicRuntimeConfig?.appName || '大学歴史建築ミュージアム',
    demoMode: publicRuntimeConfig?.demoMode || false,
  },
  
  // サーバーサイドのみ
  googleCloud: serverRuntimeConfig?.googleCloud || {
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFile: process.env.GOOGLE_CLOUD_KEY_FILE,
    region: 'asia-northeast1',
  },
  
  // セキュリティ設定
  security: serverRuntimeConfig?.security || {
    allowedIPs: [],
    apiRateLimit: 10,
    dailyLimit: 100,
  }
}

// 型定義
export type AppConfig = typeof config