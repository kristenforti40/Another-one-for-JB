import React from 'react';
import { useContent } from '../../context/ContentContext';
import type { Horse } from '../../types';

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


const HorseCard: React.FC<{ horse: Horse }> = ({ horse }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300 border border-stone-200/80">
        <div className="p-3">
             <div className="overflow-hidden h-80 rounded-md border-4 border-brand-teal">
                <img src={horse.imageUrl} alt={horse.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
            </div>
        </div>
        <div className="p-6 pt-3">
            <h3 className="text-2xl font-bold text-stone-900 mb-2">{horse.name}</h3>
            <p className="text-stone-700">{horse.bio}</p>
        </div>
    </div>
);

const TopHorsesPage: React.FC = () => {
    const { horses } = useContent();
    return (
        <div className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <PageTitle title="Top Horses" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {horses.map(horse => (
                        <HorseCard key={horse.id} horse={horse} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopHorsesPage;