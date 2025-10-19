
import React, { useState, useEffect, FormEvent } from 'react';
import { useContent } from '../../../context/ContentContext';
import { RacingStats } from '../../../types';

const ManageStatsPage: React.FC = () => {
    const { racingStats, updateRacingStats } = useContent();
    const [formData, setFormData] = useState<RacingStats | null>(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (racingStats) {
            setFormData(racingStats);
        }
    }, [racingStats]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, category: 'currentYear' | 'career', field: 'starts' | 'wins' | 'earnings') => {
        const { value } = e.target;
        if (formData) {
            setFormData({
                ...formData,
                [category]: {
                    ...formData[category],
                    [field]: field === 'earnings' ? value : Number(value)
                }
            });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formData) {
            updateRacingStats(formData);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000); // Hide message after 3 seconds
        }
    };
    
    if (!formData) {
        return <div>Loading stats editor...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Racing Stats</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit}>
                    {/* Current Year */}
                    <fieldset className="mb-8 border border-gray-300 p-4 rounded-md">
                        <legend className="text-xl font-semibold text-brand-teal px-2">Current Year</legend>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                            <div>
                                <label htmlFor="currentStarts" className="block text-sm font-medium text-gray-700">Starts</label>
                                <input type="number" name="currentStarts" id="currentStarts" value={formData.currentYear.starts} onChange={(e) => handleChange(e, 'currentYear', 'starts')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal" required />
                            </div>
                            <div>
                                <label htmlFor="currentWins" className="block text-sm font-medium text-gray-700">Wins</label>
                                <input type="number" name="currentWins" id="currentWins" value={formData.currentYear.wins} onChange={(e) => handleChange(e, 'currentYear', 'wins')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal" required />
                            </div>
                            <div>
                                <label htmlFor="currentEarnings" className="block text-sm font-medium text-gray-700">Earnings</label>
                                <input type="text" name="currentEarnings" id="currentEarnings" value={formData.currentYear.earnings} onChange={(e) => handleChange(e, 'currentYear', 'earnings')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal" placeholder="$500,000" required />
                            </div>
                        </div>
                    </fieldset>

                    {/* Career */}
                    <fieldset className="mb-8 border border-gray-300 p-4 rounded-md">
                        <legend className="text-xl font-semibold text-brand-teal px-2">Career</legend>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                             <div>
                                <label htmlFor="careerStarts" className="block text-sm font-medium text-gray-700">Starts</label>
                                <input type="number" name="careerStarts" id="careerStarts" value={formData.career.starts} onChange={(e) => handleChange(e, 'career', 'starts')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal" required />
                            </div>
                            <div>
                                <label htmlFor="careerWins" className="block text-sm font-medium text-gray-700">Wins</label>
                                <input type="number" name="careerWins" id="careerWins" value={formData.career.wins} onChange={(e) => handleChange(e, 'career', 'wins')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal" required />
                            </div>
                            <div>
                                <label htmlFor="careerEarnings" className="block text-sm font-medium text-gray-700">Earnings</label>
                                <input type="text" name="careerEarnings" id="careerEarnings" value={formData.career.earnings} onChange={(e) => handleChange(e, 'career', 'earnings')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal" placeholder="$3,000,000" required />
                            </div>
                        </div>
                    </fieldset>

                    <div className="flex items-center justify-end space-x-4">
                         {saved && <span className="text-green-600 transition-opacity duration-300">Stats saved successfully!</span>}
                        <button type="submit" className="px-6 py-2 font-bold text-white bg-brand-teal rounded-md hover:bg-opacity-90">
                            Save Stats
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageStatsPage;
