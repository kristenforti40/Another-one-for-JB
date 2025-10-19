import React from 'react';
import { useContent } from '../../context/ContentContext';
import type { TeamMember } from '../../types';

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


const TeamMemberCard: React.FC<{ member: TeamMember, index: number }> = ({ member, index }) => {
    const isReversed = index % 2 !== 0;
    return (
        <div className={`bg-white/70 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row md:items-center border border-stone-200/50 ${isReversed ? 'md:flex-row-reverse' : ''}`}>
            <div className="md:w-1/3 p-4">
                 <div className="bg-white p-2 rounded-md shadow-inner">
                    <img src={member.imageUrl} alt={member.name} className="object-cover w-full aspect-square rounded-sm border-4 border-brand-teal" />
                </div>
            </div>
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-stone-900">{member.name}</h3>
                <p className="text-brand-teal text-lg font-semibold mb-3">{member.role}</p>
                <div className="text-stone-700 space-y-3">
                    {member.bio.split('\n').map((paragraph, index) => (
                        paragraph.trim() && <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};


const MeetTheTeamPage: React.FC = () => {
    const { teamMembers } = useContent();

    return (
        <div className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <PageTitle title="Meet the Team" />
                <div className="space-y-12">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard key={member.id} member={member} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MeetTheTeamPage;