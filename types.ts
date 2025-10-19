

export interface Horse {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface NewsPost {
  id: number;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavDropdown {
  label: string;
  links: NavLink[];
}

export interface RacingStat {
  starts: number;
  wins: number;
  earnings: string;
}

export interface RacingStats {
  currentYear: RacingStat;
  career: RacingStat;
}

export interface MeetKeriPageContent {
  mainImageUrl: string;
  galleryImage1Url: string;
  galleryImage2Url: string;
  galleryImage3Url: string;
  bio: string;
}

export interface TrainingPageContent {
  heroImageUrl: string;
  introText1: string;
  introText2: string;
  introTextAlign?: 'left' | 'center';
  flatTrainingText: string;
  jumpTrainingText: string;
  resetAndRehabText: string;
  flatTrainingImage1Url: string;
  flatTrainingImage2Url: string;
  flatTrainingImage3Url: string;
  jumpTrainingImage1Url: string;
  jumpTrainingImage2Url: string;
  jumpTrainingImage3Url: string;
  resetAndRehabImage1Url: string;
  resetAndRehabImage2Url: string;
  resetAndRehabImage3Url: string;
}

export interface FacilitiesPageContent {
  heroImageUrl: string;
  introText1: string;
  introText2: string;
  introTextAlign?: 'left' | 'center';
  galleryImages: string[];
}

export interface PartnershipsPageContent {
  heroImageUrl: string;
  introText: string;
  introTextAlign?: 'left' | 'center';
  galleryImages: string[];
}

export interface BloodstockPageContent {
  heroImageUrl: string;
  introText: string;
  introTextAlign?: 'left' | 'center';
  yearlingSalesUrl: string;
  internationalSalesUrl: string;
  privateSalesUrl: string;
  olderHorseSalesUrl: string;
}

export interface AllContent {
  horses: Horse[];
  teamMembers: TeamMember[];
  newsPosts: NewsPost[];
  racingStats: RacingStats | null;
  homePageHeroUrl: string;
  logoUrl: string;
  faviconUrl: string;
  meetKeriPageContent: MeetKeriPageContent | null;
  trainingPageContent: TrainingPageContent | null;
  facilitiesPageContent: FacilitiesPageContent | null;
  partnershipsPageContent: PartnershipsPageContent | null;
  bloodstockPageContent: BloodstockPageContent | null;
}