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

export const buildings: Building[] = [
  {
    id: 'meiji-main-hall',
    name: '本館（明治記念館）',
    era: '明治',
    year: 1889,
    description: '明治22年に建設された木造建築の傑作...',
    images: ['/buildings/meiji-hall-1.jpg', '/buildings/meiji-hall-2.jpg'],
    audioGuide: '/audio/meiji-hall-guide.mp3',
    location: { lat: 35.6762, lng: 139.6503 },
    features: ['木造建築', '和洋折衷', '国登録有形文化財']
  },
  // 他の建物データ...
];
