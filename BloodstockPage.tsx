import React from 'react';
import { useContent } from '../../context/ContentContext';

const PhotoCard: React.FC<{ imageUrl: string; caption: string; }> = ({ imageUrl, caption }) => (
    <div className="text-center group">
        <div className="overflow-hidden rounded-lg shadow-lg border-4 border-brand-teal">
            <img 
                src={imageUrl} 
                alt={caption} 
                className="w-full h-72 object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-stone-800">{caption}</h3>
    </div>
);


const BloodstockPage: React.FC = () => {
    const { bloodstockPageContent } = useContent();

    if (!bloodstockPageContent) {
        return <div>Loading...</div>;
    }
    
    const introTextAlignClass = bloodstockPageContent.introTextAlign === 'left' ? 'text-left' : 'text-center';

    const expertiseAreas = [
        { caption: "Yearling Sales", imageUrl: bloodstockPageContent.yearlingSalesUrl },
        { caption: "International Sales and Imports", imageUrl: bloodstockPageContent.internationalSalesUrl },
        { caption: "Private Sales", imageUrl: bloodstockPageContent.privateSalesUrl },
        { caption: "Older Horse Sales", imageUrl: bloodstockPageContent.olderHorseSalesUrl },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[40vh] flex items-center justify-center text-center"
                style={{ backgroundImage: `url('${bloodstockPageContent.heroImageUrl}')` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 p-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl leading-tight">
                        Bloodstock Services
                    </h1>
                </div>
            </section>

            {/* Content Section */}
            <div className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className={`max-w-3xl mx-auto mb-16 ${introTextAlignClass}`}>
                         <div className="bg-white p-8 rounded-lg shadow-lg border border-stone-200">
                            <div className="text-xl text-stone-700 space-y-6">
                               {bloodstockPageContent.introText.split('\n').map((line, index) => (
                                   <p key={index}>{line}</p>
                               ))}
                           </div>
                        </div>
                    </div>
                    
                    {/* New Photo Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-brand-teal mb-10 text-center">Our Expertise</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                           {expertiseAreas.map((area) => (
                               <PhotoCard key={area.caption} imageUrl={area.imageUrl} caption={area.caption} />
                           ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BloodstockPage;