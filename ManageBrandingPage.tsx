import React, { useState, FormEvent } from 'react';
import { useContent } from '../../../context/ContentContext';
import KBRacingLogo from '../../KBRacingLogo';
import { compressImage } from '../../admin/imageUtils';

const ManageBrandingPage: React.FC = () => {
    const { logoUrl, updateLogoUrl, faviconUrl, updateFaviconUrl } = useContent();
    const [newLogoUrl, setNewLogoUrl] = useState<string>('');
    const [newFaviconUrl, setNewFaviconUrl] = useState<string>('');
    const [saved, setSaved] = useState(false);

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const compressedDataUrl = await compressImage(file, { maxWidth: 500 });
                setNewLogoUrl(compressedDataUrl);
            } catch (error) {
                console.error("Image compression failed:", error);
                alert("There was an error processing the image. Please try another file.");
            }
        }
    };
    
    const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setNewFaviconUrl(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let changed = false;
        if (newLogoUrl) {
            updateLogoUrl(newLogoUrl);
            setNewLogoUrl('');
            changed = true;
        }
        if (newFaviconUrl) {
            updateFaviconUrl(newFaviconUrl);
            setNewFaviconUrl('');
            changed = true;
        }

        if (changed) {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } else {
            alert("Please upload a new image for the logo or favicon first.");
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Logo & Branding</h1>
            <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-lg shadow-md p-6 space-y-8">
                    {/* Logo Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-brand-teal mb-4">Site Logo</h2>
                        <div>
                            <label htmlFor="logoUpload" className="block text-sm font-medium text-gray-700">Upload New Logo</label>
                            <input
                                type="file"
                                id="logoUpload"
                                accept="image/png, image/jpeg, image/webp, image/svg+xml"
                                onChange={handleLogoUpload}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-teal/10 file:text-brand-teal hover:file:bg-brand-teal/20 cursor-pointer"
                            />
                             <p className="mt-1 text-xs text-gray-500">Recommended: Optimized images (e.g., SVG, or PNG/WEBP under 100KB).</p>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Current Logo:</p>
                                <div className="p-4 inline-block rounded-md border border-gray-200 bg-gray-50 min-h-[112px] flex items-center justify-center">
                                    {logoUrl ? (
                                        <img src={logoUrl} alt="Current Logo" className="h-20 w-auto" />
                                    ) : (
                                        <KBRacingLogo />
                                    )}
                                </div>
                            </div>
                            {newLogoUrl && (
                                <div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">New Logo Preview:</p>
                                    <div className="p-4 inline-block rounded-md border border-gray-200">
                                        <img src={newLogoUrl} alt="New Logo Preview" className="h-20 w-auto" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Favicon Section */}
                    <div className="pt-8 border-t">
                        <h2 className="text-xl font-semibold text-brand-teal mb-4">Site Favicon</h2>
                         <div>
                            <label htmlFor="faviconUpload" className="block text-sm font-medium text-gray-700">Upload New Favicon (.ico, .png, .svg)</label>
                            <input
                                type="file"
                                id="faviconUpload"
                                accept="image/x-icon, image/png, image/svg+xml"
                                onChange={handleFaviconUpload}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-teal/10 file:text-brand-teal hover:file:bg-brand-teal/20 cursor-pointer"
                            />
                            <p className="mt-1 text-xs text-gray-500">Recommended: 32x32 or 64x64px ICO, PNG, or SVG file.</p>
                        </div>
                         <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Current Favicon:</p>
                                <div className="p-2 inline-block rounded-md border border-gray-200 bg-gray-50">
                                    <img src={faviconUrl} alt="Current Favicon" className="h-10 w-10" />
                                </div>
                            </div>
                            {newFaviconUrl && (
                                <div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">New Favicon Preview:</p>
                                    <div className="p-2 inline-block rounded-md border border-gray-200">
                                        <img src={newFaviconUrl} alt="New Favicon Preview" className="h-10 w-10" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4 mt-6">
                    {saved && <span className="text-green-600">Branding saved successfully!</span>}
                    <button type="submit" className="px-6 py-2 font-bold text-white bg-brand-teal rounded-md hover:bg-opacity-90 disabled:bg-gray-400" disabled={!newLogoUrl && !newFaviconUrl}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ManageBrandingPage;