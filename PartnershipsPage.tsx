import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

// Helper component for highlight icons
const HighlightIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center justify-center h-20 w-20 mx-auto bg-brand-teal/10 rounded-full mb-5 text-brand-teal">
        {children}
    </div>
);

// Specific Icons for this page
const KeyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
    </svg>
);
const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.01H7.5v-3.02h9v3.02zM18 13.5H6v6.02h12v-6.02zM12 2.25L14.25 9h5.25l-4.5 3.25 1.5 5.25L12 14.25 7.5 17.5l1.5-5.25L4.5 9h5.25L12 2.25z" />
    </svg>
);
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
);
const BinocularsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.25-6.5a1.012 1.012 0 0 1 1.624 0l4.25 6.5a1.012 1.012 0 0 1 0 .639l-4.25 6.5a1.012 1.012 0 0 1-1.624 0l-4.25-6.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.092 1.21-.138 2.43-.138 3.662s.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.092-1.21.138-2.43.138-3.662Z" />
    </svg>
);
const UserGroupIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.289 2.72a3 3 0 0 1-4.682-2.72 9.094 9.094 0 0 1 3.741-.479m7.289 2.72-7.289-2.72m0 0a3.001 3.001 0 0 0-3.449-2.592 3.001 3.001 0 0 0-2.592 3.45M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-7.536-3.692a3 3 0 1 0 0-5.616 3 3 0 0 0 0 5.616Zm15.072 0a3 3 0 1 0 0-5.616 3 3 0 0 0 0 5.616Z" />
    </svg>
);
const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
);


const ownershipHighlights = [
    {
        icon: <KeyIcon />,
        title: "Behind-the-Scenes Access",
        text: "Visit the stables, watch morning workouts, and get an insider's view of what it takes to train and create a top athlete"
    },
    {
        icon: <PhoneIcon />,
        title: "Direct Trainer Communication",
        text: "Get regular, transparent updates directly from Keri. Discuss race strategy and horse progress and learn more about the journey."
    },
    {
        icon: <BinocularsIcon />,
        title: "Race Day Privileges",
        text: "Enjoy exclusive access on race days. Join Keri in the paddock to see your horse saddled and hear the final instructions before the big race."
    },
    {
        icon: <UserGroupIcon />,
        title: "A Passionate Community",
        text: "Share the journey with a community of like-minded enthusiasts. Celebrate the highs and lows together, creating memories that last a lifetime."
    },
    {
        icon: <StarIcon />,
        title: "A Rewarding Experience",
        text: "Keri Brion Racing is committed to providing a transparent, exciting, and rewarding ownership experience from start to finish."
    },
    {
        icon: <TrophyIcon />,
        title: "Winner's Circle Thrills",
        text: "Feel the ultimate rush of victory. There's nothing like leading your horse into the winner's circle, celebrating with your fellow partners."
    }
];

const PartnershipsPage: React.FC = () => {
    const { partnershipsPageContent } = useContent();

    if (!partnershipsPageContent) {
        return <div>Loading...</div>;
    }

    const introLines = partnershipsPageContent.introText.split('\n').filter(line => line.trim());
    const introTextAlignClass = partnershipsPageContent.introTextAlign === 'left' ? 'text-left' : 'text-center';

    return (
        <div>
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[40vh] flex items-center justify-center text-center"
                style={{ backgroundImage: `url('${partnershipsPageContent.heroImageUrl}')` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 p-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl leading-tight">
                        Partnerships & Ownership
                    </h1>
                </div>
            </section>

            {/* Content Section */}
            <div className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className={`bg-white p-8 rounded-lg shadow-lg border border-stone-200 mb-16 ${introTextAlignClass}`}>
                        <div className="text-stone-700">
                           {introLines[0] && <p className="text-2xl lg:text-3xl font-semibold">{introLines[0]}</p>}
                           {introLines[1] && <p className="text-xl mt-4 text-stone-600">{introLines[1]}</p>}
                        </div>
                    </div>
                    
                    {/* New "Why Join" Section */}
                     <div className="mb-16">
                        <h2 className="text-3xl font-bold text-brand-teal mb-10 text-center">The Unmatched Thrill of Ownership</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {ownershipHighlights.map(item => (
                                <div key={item.title} className="text-center p-8 bg-white rounded-lg shadow-lg border border-stone-200 transform hover:-translate-y-2 transition-transform duration-300">
                                    <HighlightIcon>{item.icon}</HighlightIcon>
                                    <h3 className="text-2xl font-bold text-stone-900 mb-3">{item.title}</h3>
                                    <p className="text-stone-600 leading-relaxed font-semibold">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* New Photo Gallery Section */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-brand-teal mb-10">Ownership Moments</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {partnershipsPageContent.galleryImages.map((src, index) => (
                                <div key={index} className="overflow-hidden rounded-lg shadow-lg group border-4 border-brand-teal">
                                    <img 
                                        src={src} 
                                        alt={`Ownership moment ${index + 1}`} 
                                        className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                         <Link to="/ownership-inquiry" className="bg-brand-teal text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-all duration-300 inline-block transform hover:scale-105">
                            Inquire About Ownership
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnershipsPage;