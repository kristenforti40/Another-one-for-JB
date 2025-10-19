import { Horse, TeamMember, NavDropdown, NavLink, NewsPost, RacingStats, MeetKeriPageContent, TrainingPageContent, FacilitiesPageContent, PartnershipsPageContent, BloodstockPageContent } from './types';

export const DEFAULT_HERO_IMAGE = "https://i.postimg.cc/tgMfDZT5/Gzoktu2-WEAAf-JH2.jpg";

export const NAVIGATION_DROPDOWNS: NavDropdown[] = [
  {
    label: 'About',
    links: [
      { label: 'Meet Keri', href: '/meet-keri' },
      { label: 'Meet the Team', href: '/team' },
      { label: 'Top Horses', href: '/horses' },
      { label: 'News', href: '/news' },
    ],
  },
  {
    label: 'Services',
    links: [
      { label: 'Training', href: '/training' },
      { label: 'Facilities', href: '/facilities' },
      { label: 'Bloodstock', href: '/bloodstock' },
      { label: 'Partnerships', href: '/partnerships' },
    ],
  },
];

export const NAVIGATION_LINKS: NavLink[] = [
    { label: 'Contact', href: '/contact' },
];

export const TOP_HORSES: Horse[] = [
  { id: 1, name: 'Historic', bio: 'A champion steeplechaser with a heart of gold.', imageUrl: 'https://picsum.photos/seed/horse1/400/500' },
  { id: 2, name: 'Freddy Frize', bio: 'Known for his incredible speed and agility on the flat track.', imageUrl: 'https://picsum.photos/seed/horse2/400/500' },
  { id: 3, name: 'The Mean Queen', bio: 'A fierce competitor and multiple graded stakes winner.', imageUrl: 'https://picsum.photos/seed/horse3/400/500' },
  { id: 4, name: 'Snap Decision', bio: 'A versatile runner, excelling in both hurdle and chase races.', imageUrl: 'https://picsum.photos/seed/horse4/400/500' },
  { id: 5, name: 'Global Citizen', bio: 'An international star with wins across multiple continents.', imageUrl: 'https://picsum.photos/seed/horse5/400/500' },
  { id: 6, name: 'French Light', bio: 'A promising up-and-comer with a bright future ahead.', imageUrl: 'https://picsum.photos/seed/horse6/400/500' },
  { id: 7, name: 'Boulette', bio: 'A consistent performer, always giving his all on the track.', imageUrl: 'https://picsum.photos/seed/horse7/400/500' },
  { id: 8, name: 'Sa\'ad', bio: 'A fan favorite known for his thrilling come-from-behind victories.', imageUrl: 'https://picsum.photos/seed/horse8/400/500' },
  { id: 9, name: 'Ljay', bio: 'A young talent showing immense potential in his early career.', imageUrl: 'https://picsum.photos/seed/horse9/400/500' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 1, name: 'Rodolphe Green', role: 'Assistant Trainer', bio: 'With over 20 years of experience, Rodolphe is an invaluable part of the team, overseeing daily operations and horse conditioning.', imageUrl: 'https://picsum.photos/seed/team1/400/400' },
  { id: 2, name: 'Jane Smith', role: 'Head Groom', bio: 'Jane\'s meticulous attention to detail and deep love for the horses ensure they are always happy, healthy, and ready to race.', imageUrl: 'https://picsum.photos/seed/team2/400/400' },
  { id: 3, name: 'Michael Chen', role: 'Exercise Rider', bio: 'Michael\'s skill in the saddle helps develop our horses\' strength and stamina, preparing them for the rigors of competition.', imageUrl: 'https://picsum.photos/seed/team3/400/400' },
];

export const NEWS_POSTS: NewsPost[] = [
    { id: 1, title: 'Big Win at Belmont!', date: '2024-05-20', content: 'In a thrilling finish, our star mare "Starlight Sprint" captured the Grade 2 Acorn Stakes at Belmont Park. It was a testament to her heart and the team\'s hard work. We are incredibly proud of her performance and look forward to her next start!', imageUrl: 'https://picsum.photos/seed/news1/800/400' },
    { id: 2, title: 'Welcome New Additions to the Barn', date: '2024-05-15', content: 'We are excited to welcome two promising yearlings to the Keri Brion Racing family. A colt by "Champion Sire" and a filly by "Speedy Dam" have settled in nicely and are showing great potential. We can\'t wait to see what the future holds for them.' },
    { id: 3, title: 'Fair Hill Training Update', date: '2024-05-10', content: 'The horses are loving the spring weather at Fair Hill. Morning works have been sharp, and the entire string is in excellent condition. We are gearing up for a busy and exciting summer racing season at Saratoga and Monmouth Park.', imageUrl: 'https://picsum.photos/seed/news3/800/400' },
];

export const RACING_STATS: RacingStats = {
    currentYear: {
        starts: 225,
        wins: 32,
        earnings: '$1,715,305'
    },
    career: {
        starts: 1286,
        wins: 159,
        earnings: '$7,638,628'
    }
};

export const MEET_KERI_PAGE_CONTENT: MeetKeriPageContent = {
  mainImageUrl: "https://i.postimg.cc/gJvySsPm/Main-kb.jpg",
  galleryImage1Url: "https://i.postimg.cc/FsqfSS2Z/Two-kb.jpg",
  galleryImage2Url: "https://i.postimg.cc/5ysCTkKd/3-Kb.png",
  galleryImage3Url: "https://i.postimg.cc/2j1rZtms/KB-met-2.jpg",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Her dedication and unique approach have led to remarkable success on the track.\n\nKeri believes in a hands-on approach, building a strong foundation of trust and communication with each horse in her care. This philosophy is the cornerstone of Keri Brion Racing.",
};

export const TRAINING_PAGE_CONTENT: TrainingPageContent = {
  heroImageUrl: "https://i.postimg.cc/rpS9y48h/ai-22.png",
  introText1: "Our training philosophy is built on individual attention, patience, and a deep understanding of the thoroughbred athlete. We tailor programs to bring out the best in each horse, focusing on their unique strengths and potential.",
  introText2: "Our primary base of operations is at the world-class Fair Hill Training Center in Maryland, with access to a variety of turf and synthetic surfaces. We also strategically race at other premier East Coast tracks to place our horses in the best possible spots to succeed.",
  introTextAlign: 'center',
  flatTrainingText: "For flat racing, we emphasize speed, tactical awareness, and mental conditioning. Our regimen is designed to sharpen a horse's natural abilities, ensuring they are primed for peak performance on race day, from sprints to classic distances.",
  jumpTrainingText: "Specializing in developing elite steeplechasers and hurdlers, our program focuses on building stamina, agility, and flawless jumping technique. We prepare horses for the demanding conditions of jump racing with a combination of schooling, gallops, and cross-training.",
  resetAndRehabText: "We provide a serene and effective environment for horses needing time off to recover from injury or the rigors of a long campaign. Our reset and rehabilitation program focuses on mental and physical rejuvenation, utilizing therapies and customized turnout schedules to ensure they return to the track happy, sound, and ready to perform at their best.",
  flatTrainingImage1Url: "https://picsum.photos/seed/flat1/400/300",
  flatTrainingImage2Url: "https://picsum.photos/seed/flat2/400/300",
  flatTrainingImage3Url: "https://picsum.photos/seed/flat3/400/300",
  jumpTrainingImage1Url: "https://picsum.photos/seed/jump1/400/300",
  jumpTrainingImage2Url: "https://picsum.photos/seed/jump2/400/300",
  jumpTrainingImage3Url: "https://picsum.photos/seed/jump3/400/300",
  resetAndRehabImage1Url: "https://picsum.photos/seed/rehab1/400/300",
  resetAndRehabImage2Url: "https://picsum.photos/seed/rehab2/400/300",
  resetAndRehabImage3Url: "https://picsum.photos/seed/rehab3/400/300",
};

export const FACILITIES_PAGE_CONTENT: FacilitiesPageContent = {
  heroImageUrl: "https://i.postimg.cc/HLZwjYX7/Generated-Image-September-23-2025-12-51-AM.png",
  introText1: "Our horses are stabled at world-class facilities that provide a safe, healthy, and stimulating environment.",
  introText2: "We are based at Fair Hill Training Center, offering a variety of training surfaces and amenities designed for the modern thoroughbred. Explore the gallery below to see the variety of options offered at our Fair Hill barn.",
  introTextAlign: 'center',
  galleryImages: [
    "https://picsum.photos/seed/facility1/600/500",
    "https://picsum.photos/seed/facility2/600/500",
    "https://picsum.photos/seed/facility3/600/500",
    "https://picsum.photos/seed/facility4/600/500",
    "https://picsum.photos/seed/facility5/600/500",
    "https://picsum.photos/seed/facility6/600/500",
    "https://picsum.photos/seed/facility7/600/500",
    "https://picsum.photos/seed/facility8/600/500",
  ],
};

export const PARTNERSHIPS_PAGE_CONTENT: PartnershipsPageContent = {
  heroImageUrl: "https://i.postimg.cc/Y9RFh22P/KB-owners.jpg",
  introText: "Experience the thrill of racehorse ownership with Keri Brion Racing.\n\nWe offer various partnership and syndicate opportunities to fit your goals and budget.",
  introTextAlign: 'center',
  galleryImages: [
    "https://picsum.photos/seed/partner1/600/500",
    "https://picsum.photos/seed/partner2/600/500",
    "https://picsum.photos/seed/partner3/600/500",
    "https://picsum.photos/seed/partner4/600/500",
    "https://picsum.photos/seed/partner5/600/500",
    "https://picsum.photos/seed/partner6/600/500",
  ],
};

export const BLOODSTOCK_PAGE_CONTENT: BloodstockPageContent = {
  heroImageUrl: "https://i.postimg.cc/ydyGxRZz/goffs-2-1.jpg",
  introText: "Finding the next champion starts with a keen eye for talent and a deep understanding of pedigrees.\n\nOur bloodstock services include private purchases, auction representation, and mating consultations. Detailed information about our approach to selecting top-tier racing prospects will be available here shortly.",
  introTextAlign: 'center',
  yearlingSalesUrl: "https://picsum.photos/seed/yearling/400/600",
  internationalSalesUrl: "https://picsum.photos/seed/international/400/600",
  privateSalesUrl: "https://picsum.photos/seed/private/400/600",
  olderHorseSalesUrl: "https://picsum.photos/seed/olderhorse/400/600",
};