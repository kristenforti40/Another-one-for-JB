import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AllContent, Horse, TeamMember, NewsPost, RacingStats, MeetKeriPageContent, TrainingPageContent, FacilitiesPageContent, PartnershipsPageContent, BloodstockPageContent } from '../types';
import { TOP_HORSES, TEAM_MEMBERS, NEWS_POSTS, RACING_STATS, DEFAULT_HERO_IMAGE, MEET_KERI_PAGE_CONTENT, TRAINING_PAGE_CONTENT, FACILITIES_PAGE_CONTENT, PARTNERSHIPS_PAGE_CONTENT, BLOODSTOCK_PAGE_CONTENT } from '../constants';

const DEFAULT_FAVICON = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐎</text></svg>";

const LoadingScreen: React.FC = () => (
    <div className="flex items-center justify-center min-h-screen bg-brand-background">
        <div className="w-16 h-16 border-4 border-t-transparent border-brand-teal rounded-full animate-spin"></div>
    </div>
);

interface ContentContextType {
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
    updateHorses: (newHorses: Horse[]) => void;
    updateTeamMembers: (newTeamMembers: TeamMember[]) => void;
    updateNewsPosts: (newPosts: NewsPost[]) => void;
    updateRacingStats: (newStats: RacingStats) => void;
    updateHomePageHeroUrl: (newUrl: string) => void;
    updateLogoUrl: (newUrl: string) => void;
    updateFaviconUrl: (newUrl: string) => void;
    updateMeetKeriPageContent: (newContent: MeetKeriPageContent) => void;
    updateTrainingPageContent: (newContent: TrainingPageContent) => void;
    updateFacilitiesPageContent: (newContent: FacilitiesPageContent) => void;
    updatePartnershipsPageContent: (newContent: PartnershipsPageContent) => void;
    updateBloodstockPageContent: (newContent: BloodstockPageContent) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const initializeFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
    try {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage key “${key}”:`, error);
        return defaultValue;
    }
};


export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [horses, setHorses] = useState<Horse[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
    const [racingStats, setRacingStats] = useState<RacingStats | null>(null);
    const [homePageHeroUrl, setHomePageHeroUrl] = useState<string>('');
    const [logoUrl, setLogoUrl] = useState<string>('');
    const [faviconUrl, setFaviconUrl] = useState<string>('');
    const [meetKeriPageContent, setMeetKeriPageContent] = useState<MeetKeriPageContent | null>(null);
    const [trainingPageContent, setTrainingPageContent] = useState<TrainingPageContent | null>(null);
    const [facilitiesPageContent, setFacilitiesPageContent] = useState<FacilitiesPageContent | null>(null);
    const [partnershipsPageContent, setPartnershipsPageContent] = useState<PartnershipsPageContent | null>(null);
    const [bloodstockPageContent, setBloodstockPageContent] = useState<BloodstockPageContent | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Attempt to fetch the master content file for the live site
                // Add a cache-busting query parameter to ensure the latest version is always fetched
                const response = await fetch(`./content.json?_=${new Date().getTime()}`);
                if (!response.ok) {
                    throw new Error('content.json not found, falling back to local storage.');
                }
                const data: AllContent = await response.json();
                
                // If fetched successfully, set state from this master file
                setHorses(data.horses);
                setTeamMembers(data.teamMembers);
                setNewsPosts(data.newsPosts);
                setRacingStats(data.racingStats);
                setHomePageHeroUrl(data.homePageHeroUrl);
                setLogoUrl(data.logoUrl);
                setFaviconUrl(data.faviconUrl || DEFAULT_FAVICON);
                setMeetKeriPageContent(data.meetKeriPageContent);
                setTrainingPageContent(data.trainingPageContent);
                setFacilitiesPageContent(data.facilitiesPageContent);
                setPartnershipsPageContent(data.partnershipsPageContent);
                setBloodstockPageContent(data.bloodstockPageContent);

            } catch (error) {
                console.warn(error);
                // If fetch fails (e.g., local dev), initialize from local storage
                setHorses(initializeFromLocalStorage('kbr_horses', TOP_HORSES));
                setTeamMembers(initializeFromLocalStorage('kbr_team', TEAM_MEMBERS));
                setNewsPosts(initializeFromLocalStorage('kbr_news', NEWS_POSTS));
                setRacingStats(initializeFromLocalStorage('kbr_stats', RACING_STATS));
                setHomePageHeroUrl(initializeFromLocalStorage('kbr_hero', DEFAULT_HERO_IMAGE));
                setLogoUrl(initializeFromLocalStorage('kbr_logo', ''));
                setFaviconUrl(initializeFromLocalStorage('kbr_favicon', DEFAULT_FAVICON));
                setMeetKeriPageContent(initializeFromLocalStorage('kbr_meetkeri', MEET_KERI_PAGE_CONTENT));
                setTrainingPageContent(initializeFromLocalStorage('kbr_training', TRAINING_PAGE_CONTENT));
                setFacilitiesPageContent(initializeFromLocalStorage('kbr_facilities', FACILITIES_PAGE_CONTENT));
                setPartnershipsPageContent(initializeFromLocalStorage('kbr_partnerships', PARTNERSHIPS_PAGE_CONTENT));
                setBloodstockPageContent(initializeFromLocalStorage('kbr_bloodstock', BLOODSTOCK_PAGE_CONTENT));
            } finally {
                setIsInitialized(true);
            }
        };

        loadContent();
    }, []);

    const updateAndStore = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, key: string) => (newData: T) => {
        setter(newData);
        localStorage.setItem(key, JSON.stringify(newData));
    };

    const value = {
        horses,
        teamMembers,
        newsPosts,
        racingStats,
        homePageHeroUrl,
        logoUrl,
        faviconUrl,
        meetKeriPageContent,
        trainingPageContent,
        facilitiesPageContent,
        partnershipsPageContent,
        bloodstockPageContent,
        updateHorses: updateAndStore(setHorses, 'kbr_horses'),
        updateTeamMembers: updateAndStore(setTeamMembers, 'kbr_team'),
        updateNewsPosts: updateAndStore(setNewsPosts, 'kbr_news'),
        updateRacingStats: updateAndStore(setRacingStats, 'kbr_stats'),
        updateHomePageHeroUrl: updateAndStore(setHomePageHeroUrl, 'kbr_hero'),
        updateLogoUrl: updateAndStore(setLogoUrl, 'kbr_logo'),
        updateFaviconUrl: updateAndStore(setFaviconUrl, 'kbr_favicon'),
        updateMeetKeriPageContent: updateAndStore(setMeetKeriPageContent, 'kbr_meetkeri'),
        updateTrainingPageContent: updateAndStore(setTrainingPageContent, 'kbr_training'),
        updateFacilitiesPageContent: updateAndStore(setFacilitiesPageContent, 'kbr_facilities'),
        updatePartnershipsPageContent: updateAndStore(setPartnershipsPageContent, 'kbr_partnerships'),
        updateBloodstockPageContent: updateAndStore(setBloodstockPageContent, 'kbr_bloodstock'),
    };

    // Render loading screen or children
    return <ContentContext.Provider value={value}>{isInitialized ? children : <LoadingScreen />}</ContentContext.Provider>;
};

export const useContent = (): ContentContextType => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};