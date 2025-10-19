import React from 'react';
import { useContent } from '../../context/ContentContext';

const FacilitiesPage: React.FC = () => {
    const { facilitiesPageContent } = useContent();

    if (!facilitiesPageContent) {
        return <div>Loading...</div>;
    }

    const introTextAlignClass = facilitiesPageContent.introTextAlign === 'left' ? 'text-left' : 'text-center';

    return (
        <div>
             {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[40vh] flex items-center justify-center text-center"
                style={{ backgroundImage: `url('${facilitiesPageContent.heroImageUrl}')` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 p-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl leading-tight">
                        Our Facilities
                    </h1>
                </div>
            </section>

            {/* Content Section */}
            <div className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className={`max-w-3xl mx-auto mb-16 ${introTextAlignClass}`}>
                         <div className="bg-white p-8 rounded-lg shadow-lg border border-stone-200">
                            <div className="text-xl text-stone-700 space-y-4">
                                {facilitiesPageContent.introText1.split('\n').map((paragraph, index) => <p key={`intro1-${index}`}>{paragraph}</p>)}
                            </div>
                            <div className="text-stone-600 space-y-4 mt-6">
                                {facilitiesPageContent.introText2.split('\n').map((paragraph, index) => <p key={`intro2-${index}`}>{paragraph}</p>)}
                            </div>
                        </div>
                    </div>

                    {/* Photo Gallery */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {facilitiesPageContent.galleryImages.map((src, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-lg group border-4 border-brand-teal">
                                <img 
                                    src={src} 
                                    alt={`Fair Hill Facility ${index + 1}`} 
                                    className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacilitiesPage;