export type CategoryId = 
  | 'all'
  | 'education'
  | 'civil_interior'
  | 'municipal_local'
  | 'diplomatic_health'
  | 'realestate'
  | 'community'
  | 'finance_pay';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
}

export type PlatformType = 'android' | 'web' | 'ios';

export interface GovApp {
  id: string;
  name: string;
  englishName: string;
  entity: string;
  entityShort: string;
  categoryId: CategoryId;
  summary: string;
  fullDescription: string;
  keyFeatures: string[];
  howToUse: string[];
  requirements: string[];
  platforms: PlatformType[];
  officialUrl: string;
  badge: string;
  safetyTip: string;
  iconName: string;
  releaseNote?: string;
  isPopular?: boolean;
}

export interface UnderDevApp {
  id: string;
  name: string;
  englishName: string;
  entity: string;
  entityShort: string;
  sector: string;
  status: string;
  progressPercent: number;
  expectedLaunch: string;
  summary: string;
  keyAnticipatedFeatures: string[];
  iconName: string;
  colorTheme: string;
}
