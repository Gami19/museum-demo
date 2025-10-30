import { ImageAnnotatorClient } from '@google-cloud/vision'
import { TextToSpeechClient } from '@google-cloud/text-to-speech'
import { TranslationServiceClient } from '@google-cloud/translate'
import { config } from './config'

// Vision API
export const visionClient = new ImageAnnotatorClient({
  projectId: config.googleCloud.projectId,
  keyFilename: config.googleCloud.keyFile,
})

// Text-to-Speech API
export const ttsClient = new TextToSpeechClient({
  projectId: config.googleCloud.projectId,
  keyFilename: config.googleCloud.keyFile,
})

// Translation API
export const translateClient = new TranslationServiceClient({
  projectId: config.googleCloud.projectId,
  keyFilename: config.googleCloud.keyFile,
})

// 共通エラーハンドリング
export const handleGoogleCloudError = (error: any) => {
  console.error('Google Cloud API Error:', error)
  
  if (config.app.demoMode) {
    // デモモードではフォールバック
    return { error: 'Demo mode: API call simulated' }
  }
  
  throw error
}