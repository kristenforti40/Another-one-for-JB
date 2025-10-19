import React from 'react';
import { useContent } from '../../context/ContentContext';

const PageTitle: React.FC<{ title: string }> = ({ title }) => (
    <div className="text-center mb-12 md:mb-16">
        <div className="flex items-center justify-center gap-5 md:gap-8">
            <div className="w-28 h-0.5 bg-brand-teal"></div>
            <h1 className="text-[3rem] md:text-[4rem] font-serif font-bold text-brand-teal whitespace-nowrap drop-shadow-md">
                {title}
            </h1>
            <div className="w-28 h-0.5 bg-brand-teal"></div>
        </div>
    </div>
);

const MeetKeriPage: React.FC = () => {
    const { meetKeriPageContent } = useContent();

    if (!meetKeriPageContent) {
        return <div>Loading...</div>;
    }
    
    const galleryImages = [
        { src: meetKeriPageContent.galleryImage1Url, alt: "Gallery image 1" },
        { src: meetKeriPageContent.galleryImage2Url, alt: "Gallery image 2" },
        { src: meetKeriPageContent.galleryImage3Url, alt: "Gallery image 3" },
    ];

    return (
        <div className="py-12 md:py-16 overflow-x-hidden">
            <div className="container mx-auto px-6 sm:px-8 lg:px-10">
                <PageTitle title="Meet Keri" />

                <div className="bg-white/70 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-2xl border border-stone-200/50 mb-16 md:mb-24">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                        <div className="w-full md:w-1/3 flex-shrink-0">
                            <div className="bg-stone-100 p-2 rounded-md shadow-lg">
                                <div className="bg-white p-2 rounded-sm">
                                    <img 
                                        src={meetKeriPageContent.mainImageUrl} 
                                        alt="Keri Brion" 
                                        className="rounded-sm object-cover w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/3">
                            <h2 className="text-3xl font-semibold text-stone-900 mb-4">A Lifelong Passion for Horses</h2>
                            <div className="text-stone-700 space-y-4 text-lg">
                                {meetKeriPageContent.bio.split('\n').map((paragraph, index) => (
                                    paragraph.trim() && <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* X Follow Button Section */}
                <div className="my-16 md:my-24 flex justify-center">
                    <a 
                        href="https://x.com/Keri145" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-brand-teal text-white font-bold py-6 px-16 text-2xl rounded-lg hover:bg-opacity-80 transition-all duration-300 inline-block transform hover:scale-105"
                    >
                        Follow Keri on X
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="w-full">
                            <div className="bg-brand-teal p-1 rounded-md shadow-2xl">
                                <div className="bg-white p-2 rounded-sm">
                                    <img 
                                        src={image.src} 
                                        alt={image.alt} 
                                        className="w-full h-auto rounded-sm" 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MeetKeriPage;