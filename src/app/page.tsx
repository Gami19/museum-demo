// src/app/page.tsx
import { VirtualTour } from '@/components/VirtualTour'
import { BuildingRecognition } from '@/components/BuildingRecognition'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-primary-900 text-center mb-8">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <VirtualTour />
          <BuildingRecognition />
        </div>
      </div>
    </main>
  )
}