import React, { useState, useEffect, FormEvent } from 'react';
import { useContent } from '../../../context/ContentContext';
import { MeetKeriPageContent } from '../../../types';
import { compressImage } from '../../admin/imageUtils';

const ImageUploadField: React.FC<{
    label: string;
    currentImageUrl: string;
    onImageChange: (imageDataUrl: string) => void;
}> = ({ label, currentImageUrl, onImageChange }) => {
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const maxWidth = label.toLowerCase().includes('main') ? 1200 : 800;
                const compressedDataUrl = await compressImage(file, { maxWidth });
                setPreviewUrl(compressedDataUrl);
                onImageChange(compressedDataUrl);
            } catch (error) {
                console.error("Image compression failed:", error);
                alert("There was an error processing the image. Please try another file.");
            }
        }
    };

    return (
        <div className="border border-gray-200 p-4 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-teal/10 file:text-brand-teal hover:file:bg-brand-teal/20 cursor-pointer"
            />
            <p className="mt-1 text-xs text-gray-500">Recommended: Optimized images under 500KB.</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs font-semibold text-gray-600">Current:</p>
                    <img src={currentImageUrl} alt="Current" className="mt-1 rounded-md w-full h-32 object-cover border" />
                </div>
                <div>
                    <p className="text-xs font-semibold text-gray-600">New (Preview):</p>
                    <img src={previewUrl || currentImageUrl} alt="Preview" className="mt-1 rounded-md w-full h-32 object-cover border" />
                </div>
            </div>
        </div>
    );
};

const ManageMeetKeriPage: React.FC = () => {
    const { meetKeriPageContent, updateMeetKeriPageContent } = useContent();
    const [formData, setFormData] = useState<MeetKeriPageContent | null>(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (meetKeriPageContent) {
            setFormData(meetKeriPageContent);
        }
    }, [meetKeriPageContent]);

    const handleImageChange = (field: keyof MeetKeriPageContent, value: string) => {
        if (formData) {
            setFormData({ ...formData, [field]: value });
        }
    };
    
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (formData) {
            setFormData({ ...formData, bio: e.target.value });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formData) {
            updateMeetKeriPageContent(formData);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }
    };
    
    if (!formData) {
        return <div>Loading page editor...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Meet Keri Page</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Biography Text</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleTextChange}
                            rows={8}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                        />
                    </div>

                    <ImageUploadField
                        label="Main Photo"
                        currentImageUrl={meetKeriPageContent?.mainImageUrl || ''}
                        onImageChange={(url) => handleImageChange('mainImageUrl', url)}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <ImageUploadField
                            label="Gallery Image 1"
                            currentImageUrl={meetKeriPageContent?.galleryImage1Url || ''}
                            onImageChange={(url) => handleImageChange('galleryImage1Url', url)}
                        />
                         <ImageUploadField
                            label="Gallery Image 2"
                            currentImageUrl={meetKeriPageContent?.galleryImage2Url || ''}
                            onImageChange={(url) => handleImageChange('galleryImage2Url', url)}
                        />
                         <ImageUploadField
                            label="Gallery Image 3"
                            currentImageUrl={meetKeriPageContent?.galleryImage3Url || ''}
                            onImageChange={(url) => handleImageChange('galleryImage3Url', url)}
                        />
                    </div>
                     <div className="flex items-center justify-end space-x-4 pt-4">
                         {saved && <span className="text-green-600">Page content saved!</span>}
                        <button type="submit" className="px-6 py-2 font-bold text-white bg-brand-teal rounded-md hover:bg-opacity-90">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageMeetKeriPage;