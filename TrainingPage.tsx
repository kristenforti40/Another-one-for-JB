import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

const TrainingPage: React.FC = () => {
    const { trainingPageContent } = useContent();

    if (!trainingPageContent) {
        return <div>Loading...</div>
    }
    
    const introTextAlignClass = trainingPageContent.introTextAlign === 'left' ? 'text-left' : 'text-center';

    return (
        <div>
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[40vh] flex items-center justify-center text-center"
                style={{ backgroundImage: `url('${trainingPageContent.heroImageUrl}')` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 p-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl leading-tight">
                        KB Racing Training Program
                    </h1>
                </div>
            </section>

            {/* Content Section */}
            <div className="py-12 md:py-16">
                <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl ${introTextAlignClass}`}>
                    <div className="text-lg text-stone-700 space-y-4 text-left">
                        {trainingPageContent.introText1.split('\n').map((p, i) => <p key={`intro1-${i}`}>{p}</p>)}
                        {trainingPageContent.introText2.split('\n').map((p, i) => <p key={`intro2-${i}`}>{p}</p>)}
                    </div>

                    <hr className="border-stone-200 my-12" />

                    <div className="space-y-20 text-left">
                        <div>
                            <h3 className="text-3xl font-bold text-brand-teal mb-3 text-center">Flat Training</h3>
                            <div className="text-stone-700 text-lg space-y-4">
                                {trainingPageContent.flatTrainingText.split('\n').map((p, i) => <p key={`flat-${i}`}>{p}</p>)}
                            </div>
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                                <div className="overflow-hidden rounded-lg shadow-lg border-4 border-brand-teal">
                                    <img src={trainingPageContent.flatTrainingImage1Url} alt="Horse on flat track" className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="overflow-hidden rounded-lg shadow-lg border-4 border-brand-teal">
                                    <img src={trainingPageContent.flatTrainingImage2Url} alt="Horse breaking from the gate" className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="overflow-hidden rounded-lg shadow-lg border-4 border-brand-teal">
                                    <img src={trainingPageContent.flatTrainingImage3Url} alt="Horses racing on the flat" className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-brand-teal mb-3 text-center">Jump Training</h3>
                            <div className="text-stone-700 text-lg space-y-4">
                                {trainingPageContent.jumpTrainingText.split('\n').map((p, i) => <p key={`jump-${i}`}>{p}</p>)}
                            </div>
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                                <div className="overflow-hidden rounded-lg shadow-lg border-4 border-brand-teal">
                                    <img src={trainingPageContent.jumpTrainingImage1Url} alt="Horse jumping hurdle" className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="overflow-hidden rounded-lg shadow-lg border-4 border-brand-teal">
                                    <img src={trainingPageContent.jumpTrainingImage2Url} alt="Horse in training for jump racing" className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="overflow-hidden rounded-lg shadow-lg border-4 border-brand-teal">
                                    <img src={trainingPageContent.jumpTrainingImage3Url} alt="Steeplechase action" className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-brand-teal mb-3 text-center">Reset and Rehab</h3>
                            <div className="text-stone-700 text-lg space-y-4">
                                {trainingPageContent.resetAndRehabText.split('\n').map((p, i) => <p key={`rehab-${i}`}>{p}</p>)}
                            </div>
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                                <div className="overflow-hidden rounded-lg shadow-lg border-4 border-brand-teal">
                                    <img src={trainingPageContent.resetAndRehabImage1Url} alt="Horse in rehabilitation" className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="overflow-hidden rounded-lg shadow-lg border-4 border-brand-teal">
                                    <img src={trainingPageContent.resetAndRehabImage2Url} alt="Horse in a pasture" className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="overflow-hidden rounded-lg shadow-lg border-4 border-brand-teal">
                                    <img src={trainingPageContent.resetAndRehabImage3Url} alt="Horse receiving therapy" className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* CTA Section */}
            <section className="bg-stone-100 py-12 md:py-16 border-t border-stone-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-stone-900 mb-4">Have a horse that would excel in our program?</h2>
                    <Link to="/inquire" className="bg-brand-teal text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-all duration-300 inline-block transform hover:scale-105">
                        Inquire Today!
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default TrainingPage;