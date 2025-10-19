

import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

// Helper component for highlight icons
const HighlightIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center justify-center h-16 w-16 mx-auto bg-brand-teal/10 rounded-full mb-4 text-brand-teal">
        {children}
    </div>
);

// Specific Icons
const ArrowsRightLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-12L21 9m0 0L16.5 4.5M21 9H3" />
    </svg>
);

const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.01H7.5v-3.02h9v3.02zM18 13.5H6v6.02h12v-6.02zM12 2.25L14.25 9h5.25l-4.5 3.25 1.5 5.25L12 14.25 7.5 17.5l1.5-5.25L4.5 9h5.25L12 2.25z" />
    </svg>
);

const GlobeAltIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.5-6H3.5a9.004 9.004 0 0 0 8.5 6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.198.832 7.152 2.25C17.152 6.75 14.755 7.5 12 7.5c-2.755 0-5.198-.75-7.152-2.25C6.802 3.832 9.245 3 12 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 9a8.96 8.96 0 0 1 17 0" />
    </svg>
);


const StatCard: React.FC<{ label: string; value: string; }> = ({ label, value }) => (
    <div className="bg-white p-2 md:p-4 rounded-lg text-center shadow-md border border-stone-200">
        <p className="text-sm md:text-base text-stone-500 uppercase tracking-wider">{label}</p>
        <p className="text-xl md:text-4xl font-bold text-brand-teal break-words">{value}</p>
    </div>
);

const RacingStatsSection: React.FC = () => {
    const { racingStats } = useContent();

    if (!racingStats) {
        return (
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-stone-200 text-center">
                <p className="text-stone-500">Loading stats...</p>
            </div>
        );
    }
    
    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-stone-200">
            <a 
              href="https://www.equibase.com/profiles/Results.cfm?type=People&searchType=T&eID=954090&rbt=TB" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-stone-900 tracking-wide group-hover:text-brand-teal transition-colors duration-300">
                    Racing Stats
                </h2>
            </a>
            
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-center mb-4 text-brand-teal">Current Year</h3>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <StatCard label="Starts" value={racingStats.currentYear.starts.toString()} />
                    <StatCard label="Wins" value={racingStats.currentYear.wins.toString()} />
                    <StatCard label="Earnings" value={racingStats.currentYear.earnings} />
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-center mb-4 text-brand-teal">Career</h3>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <StatCard label="Starts" value={racingStats.career.starts.toString()} />
                    <StatCard label="Wins" value={racingStats.career.wins.toString()} />
                    <StatCard label="Earnings" value={racingStats.career.earnings} />
                </div>
            </div>
             <p className="text-center text-xs text-stone-500 mt-6">
                Stats are manually updated. For real-time data, visit the official Equibase site <a href="https://www.equibase.com/profiles/Results.cfm?type=People&searchType=T&eID=954090&rbt=TB" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">here</a>.
            </p>
        </div>
    );
};


const HomePage: React.FC = () => {
    const { homePageHeroUrl, newsPosts } = useContent();
    
    const recentNewsWithImages = [...newsPosts]
        .filter(post => post.imageUrl)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 2);

    return (
        <div>
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[70vh] md:h-[80vh] flex items-center justify-center text-center"
                style={{ backgroundImage: `url('${homePageHeroUrl}')` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 p-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl leading-tight">KB Racing</h1>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl leading-tight">Elite Thoroughbred Training</h2>
                    <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto mb-8 drop-shadow-2xl">
                        Dual purpose racehorse trainer based at Fair Hill Training Center
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/training" className="bg-brand-teal text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
                            Learn About Training
                        </Link>
                        <Link to="/partnerships" className="bg-transparent border-2 border-brand-teal text-brand-teal font-bold py-3 px-8 rounded-lg hover:bg-brand-teal hover:text-white transition-all duration-300 transform hover:scale-105">
                             Learn About Ownership
                        </Link>
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-900">A Winning Approach</h2>
                        <p className="text-lg text-stone-600 mt-2 max-w-3xl mx-auto">Discover the principles that set Keri Brion Racing apart from the rest.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="text-center">
                            <HighlightIcon><ArrowsRightLeftIcon /></HighlightIcon>
                            <h3 className="text-xl font-bold text-stone-900 mb-2">Dual-Purpose Trainer</h3>
                            <p className="text-stone-600">Expertise in developing top-tier talent for both premier flat racing and the demanding world of steeplechasing.</p>
                        </div>
                         <div className="text-center">
                            <HighlightIcon><TrophyIcon /></HighlightIcon>
                            <h3 className="text-xl font-bold text-stone-900 mb-2">Graded Stakes Winner</h3>
                            <p className="text-stone-600">A proven record of success at the highest levels, consistently producing horses that perform in major stakes races.</p>
                        </div>
                         <div className="text-center">
                            <HighlightIcon><GlobeAltIcon /></HighlightIcon>
                            <h3 className="text-xl font-bold text-stone-900 mb-2">Source World-Class Talent</h3>
                            <p className="text-stone-600">A sharp eye for selecting promising prospects from around the globe, turning potential into celebrated champions.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Recent News Section */}
            {recentNewsWithImages.length > 0 && (
                <section className="py-10 md:py-12 bg-white border-y border-stone-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-teal">Recent News</h2>
                            <p className="text-lg text-stone-600 mt-2 max-w-3xl mx-auto">The latest updates from the team.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                            {recentNewsWithImages.map(post => (
                                <Link to={`/news/${post.id}`} key={post.id} className="block group bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border border-stone-200/80">
                                    <div className="grid grid-cols-1 md:grid-cols-3">
                                        <div className="md:col-span-1 overflow-hidden h-48 md:h-full">
                                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="md:col-span-2 flex items-center">
                                            <div className="border-l-4 border-brand-teal h-3/4"></div>
                                            <div className="p-6 flex flex-col justify-center">
                                                <p className="text-sm text-stone-500 mb-2">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-brand-teal transition-colors duration-300">{post.title}</h3>
                                                <p className="text-stone-600 line-clamp-3 mb-4">{post.content}</p>
                                                <span className="font-semibold text-brand-teal self-start">Read More &rarr;</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Stats Section */}
            <section className="pt-12 md:pt-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <RacingStatsSection />
                </div>
            </section>
        </div>
    );
};

export default HomePage;