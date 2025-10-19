import React, { useState, FormEvent } from 'react';
import { useContent } from '../../../context/ContentContext';
import { compressImage } from '../../admin/imageUtils';

const ManageHomepagePage: React.FC = () => {
    const { homePageHeroUrl, updateHomePageHeroUrl } = useContent();
    const [newImageUrl, setNewImageUrl] = useState<string>('');
    const [saved, setSaved] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const compressedDataUrl = await compressImage(file, { maxWidth: 1920 });
                setNewImageUrl(compressedDataUrl);
            } catch (error) {
                console.error("Image compression failed:", error);
                alert("There was an error processing the image. Please try another file.");
            }
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (newImageUrl) {
            updateHomePageHeroUrl(newImageUrl);
            setNewImageUrl(''); // Clear preview
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Home Page</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-brand-teal mb-4">Hero Image</h2>
                        <div>
                            <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">Upload New Hero Image</label>
                            <input
                                type="file"
                                id="imageUpload"
                                accept="image/png, image/jpeg, image/webp"
                                onChange={handleImageUpload}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-teal/10 file:text-brand-teal hover:file:bg-brand-teal/20 cursor-pointer"
                            />
                            <p className="mt-1 text-xs text-gray-500">Recommended: Optimized images under 1MB for best performance.</p>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-700">Current Image:</p>
                                <img src={homePageHeroUrl} alt="Current Hero" className="mt-2 rounded-md border border-gray-200 h-48 w-full object-cover" />
                            </div>
                            {newImageUrl && (
                                <div>
                                    <p className="text-sm font-medium text-gray-700">New Image Preview:</p>
                                    <img src={newImageUrl} alt="New Hero Preview" className="mt-2 rounded-md border border-gray-200 h-48 w-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-4 pt-4">
                        {saved && <span className="text-green-600">Hero image saved successfully!</span>}
                        <button type="submit" className="px-6 py-2 font-bold text-white bg-brand-teal rounded-md hover:bg-opacity-90 disabled:bg-gray-400" disabled={!newImageUrl}>
                            Save New Image
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageHomepagePage;