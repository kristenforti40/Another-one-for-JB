import React, { useRef, useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { AllContent } from '../../../types';
import { compressImage } from '../../admin/imageUtils';

interface LargeImageInfo {
    location: string;
    sizeKB: number;
    preview: string;
    compressAction: () => Promise<void>;
}

const ManageDataPage: React.FC = () => {
    const content = useContent();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    
    const [largeImages, setLargeImages] = useState<LargeImageInfo[] | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [compressingLocation, setCompressingLocation] = useState<string | null>(null);


    const handleExport = () => {
        const allContent: AllContent = {
            horses: content.horses,
            teamMembers: content.teamMembers,
            newsPosts: content.newsPosts,
            racingStats: content.racingStats,
            homePageHeroUrl: content.homePageHeroUrl,
            logoUrl: content.logoUrl,
            faviconUrl: content.faviconUrl,
            meetKeriPageContent: content.meetKeriPageContent,
            trainingPageContent: content.trainingPageContent,
            facilitiesPageContent: content.facilitiesPageContent,
            partnershipsPageContent: content.partnershipsPageContent,
            bloodstockPageContent: content.bloodstockPageContent,
        };

        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(allContent, null, 2))}`;
        const link = document.createElement('a');
        link.href = jsonString;
        const date = new Date().toISOString().split('T')[0];
        link.download = `kbracing-content-${date}.json`;
        link.click();
    };

    const handleImport = async () => {
        setImportStatus('idle');
        setErrorMessage('');
        
        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            setErrorMessage('Please select a file to import.');
            setImportStatus('error');
            return;
        }

        if (window.confirm('Are you sure you want to import this data? This will overwrite all existing website content.')) {
            try {
                const text = await file.text();
                const importedData: Partial<AllContent> = JSON.parse(text);

                const requiredKeys: (keyof AllContent)[] = [
                    'horses', 'teamMembers', 'newsPosts',
                    'racingStats', 'homePageHeroUrl', 'logoUrl', 'faviconUrl',
                    'meetKeriPageContent', 'trainingPageContent', 'facilitiesPageContent',
                    'partnershipsPageContent', 'bloodstockPageContent'
                ];

                const missingKeys = requiredKeys.filter(key => !(key in importedData));

                if (missingKeys.length > 0) {
                    throw new Error(`Invalid data file. Missing keys: ${missingKeys.join(', ')}`);
                }
                
                const validData = importedData as AllContent;

                content.updateHorses(validData.horses);
                content.updateTeamMembers(validData.teamMembers);
                content.updateNewsPosts(validData.newsPosts);
                if (validData.racingStats) content.updateRacingStats(validData.racingStats);
                content.updateHomePageHeroUrl(validData.homePageHeroUrl);
                content.updateLogoUrl(validData.logoUrl);
                if (validData.faviconUrl) content.updateFaviconUrl(validData.faviconUrl);
                if (validData.meetKeriPageContent) content.updateMeetKeriPageContent(validData.meetKeriPageContent);
                if (validData.trainingPageContent) content.updateTrainingPageContent(validData.trainingPageContent);
                if (validData.facilitiesPageContent) content.updateFacilitiesPageContent(validData.facilitiesPageContent);
                if (validData.partnershipsPageContent) content.updatePartnershipsPageContent(validData.partnershipsPageContent);
                if (validData.bloodstockPageContent) content.updateBloodstockPageContent(validData.bloodstockPageContent);

                setImportStatus('success');
                setTimeout(() => {
                    setImportStatus('idle');
                    alert("Import complete. The website will now reload to apply all changes.");
                    window.location.reload();
                }, 1000);
                 if(fileInputRef.current) {
                    fileInputRef.current.value = "";
                 }

            } catch (error) {
                console.error('Import failed:', error);
                const message = error instanceof Error ? error.message : 'Please check the file format and try again.';
                setErrorMessage(`Import failed. ${message}`);
                setImportStatus('error');
            }
        }
    };
    
    const optimizeImageString = async (imageUrl: string | undefined, maxWidth: number = 1920): Promise<string> => {
        if (!imageUrl || !imageUrl.startsWith('data:image')) {
            return imageUrl || '';
        }
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], "optimizable-image.jpg", { type: blob.type });
            return await compressImage(file, { maxWidth });
        } catch (e) {
            console.error("Could not optimize image string:", imageUrl.substring(0, 50), e);
            return imageUrl;
        }
    };
    
    const handleScanForLargeImages = (reset = true) => {
        if (reset) {
            setIsScanning(true);
            setLargeImages(null);
        }
        
        const foundImages: LargeImageInfo[] = [];
        const IMAGE_SIZE_THRESHOLD_KB = 400;

        const checkImage = (imageUrl: string | undefined, location: string, compressAction: () => Promise<void>) => {
            if (imageUrl && imageUrl.startsWith('data:image')) {
                const sizeKB = Math.round((imageUrl.length * 0.75) / 1024);
                if (sizeKB > IMAGE_SIZE_THRESHOLD_KB) {
                    foundImages.push({ location, sizeKB, preview: imageUrl, compressAction });
                }
            }
        };
        
        checkImage(content.homePageHeroUrl, 'Home Page Hero', async () => {
            const optimizedUrl = await optimizeImageString(content.homePageHeroUrl);
            content.updateHomePageHeroUrl(optimizedUrl);
        });
        checkImage(content.logoUrl, 'Site Logo', async () => {
            const optimizedUrl = await optimizeImageString(content.logoUrl, 500);
            content.updateLogoUrl(optimizedUrl);
        });
        // FIX: Moved `await` outside of the `.map()` callback, as `await` is not allowed in synchronous function bodies.
        content.horses.forEach(h => checkImage(h.imageUrl, `Horse: ${h.name}`, async () => {
            const optimizedUrl = await optimizeImageString(h.imageUrl, 800);
            content.updateHorses(content.horses.map(horse => horse.id === h.id ? {...horse, imageUrl: optimizedUrl} : horse));
        }));
        content.teamMembers.forEach(t => checkImage(t.imageUrl, `Team: ${t.name}`, async () => {
            const optimizedUrl = await optimizeImageString(t.imageUrl, 800);
            content.updateTeamMembers(content.teamMembers.map(m => m.id === t.id ? {...m, imageUrl: optimizedUrl} : m));
        }));
        content.newsPosts.forEach(n => checkImage(n.imageUrl, `News: ${n.title}`, async () => {
            const optimizedUrl = await optimizeImageString(n.imageUrl, 1200);
            content.updateNewsPosts(content.newsPosts.map(p => p.id === n.id ? {...p, imageUrl: optimizedUrl} : p));
        }));
        
        if (content.meetKeriPageContent) {
            const p = content.meetKeriPageContent;
            // FIX: Refactored async actions to use explicit blocks and read latest state to avoid stale closures.
            checkImage(p.mainImageUrl, 'Meet Keri: Main', async () => {
                if (!content.meetKeriPageContent) return;
                const optimizedUrl = await optimizeImageString(p.mainImageUrl, 1200);
                content.updateMeetKeriPageContent({...content.meetKeriPageContent, mainImageUrl: optimizedUrl});
            });
            checkImage(p.galleryImage1Url, 'Meet Keri: Gallery 1', async () => {
                if (!content.meetKeriPageContent) return;
                const optimizedUrl = await optimizeImageString(p.galleryImage1Url, 800);
                content.updateMeetKeriPageContent({...content.meetKeriPageContent, galleryImage1Url: optimizedUrl});
            });
            checkImage(p.galleryImage2Url, 'Meet Keri: Gallery 2', async () => {
                if (!content.meetKeriPageContent) return;
                const optimizedUrl = await optimizeImageString(p.galleryImage2Url, 800);
                content.updateMeetKeriPageContent({...content.meetKeriPageContent, galleryImage2Url: optimizedUrl});
            });
            checkImage(p.galleryImage3Url, 'Meet Keri: Gallery 3', async () => {
                if (!content.meetKeriPageContent) return;
                const optimizedUrl = await optimizeImageString(p.galleryImage3Url, 800);
                content.updateMeetKeriPageContent({...content.meetKeriPageContent, galleryImage3Url: optimizedUrl});
            });
        }
        if (content.trainingPageContent) {
            const p = content.trainingPageContent;
            checkImage(p.heroImageUrl, 'Training: Hero', async () => {
                if (!content.trainingPageContent) return;
                const optimizedUrl = await optimizeImageString(p.heroImageUrl, 1920);
                content.updateTrainingPageContent({...content.trainingPageContent, heroImageUrl: optimizedUrl});
            });
            checkImage(p.flatTrainingImage1Url, 'Training: Flat 1', async () => {
                if (!content.trainingPageContent) return;
                const optimizedUrl = await optimizeImageString(p.flatTrainingImage1Url, 800);
                content.updateTrainingPageContent({...content.trainingPageContent, flatTrainingImage1Url: optimizedUrl});
            });
            checkImage(p.flatTrainingImage2Url, 'Training: Flat 2', async () => {
                if (!content.trainingPageContent) return;
                const optimizedUrl = await optimizeImageString(p.flatTrainingImage2Url, 800);
                content.updateTrainingPageContent({...content.trainingPageContent, flatTrainingImage2Url: optimizedUrl});
            });
            checkImage(p.flatTrainingImage3Url, 'Training: Flat 3', async () => {
                if (!content.trainingPageContent) return;
                const optimizedUrl = await optimizeImageString(p.flatTrainingImage3Url, 800);
                content.updateTrainingPageContent({...content.trainingPageContent, flatTrainingImage3Url: optimizedUrl});
            });
            checkImage(p.jumpTrainingImage1Url, 'Training: Jump 1', async () => {
                if (!content.trainingPageContent) return;
                const optimizedUrl = await optimizeImageString(p.jumpTrainingImage1Url, 800);
                content.updateTrainingPageContent({...content.trainingPageContent, jumpTrainingImage1Url: optimizedUrl});
            });
            checkImage(p.jumpTrainingImage2Url, 'Training: Jump 2', async () => {
                if (!content.trainingPageContent) return;
                const optimizedUrl = await optimizeImageString(p.jumpTrainingImage2Url, 800);
                content.updateTrainingPageContent({...content.trainingPageContent, jumpTrainingImage2Url: optimizedUrl});
            });
            checkImage(p.jumpTrainingImage3Url, 'Training: Jump 3', async () => {
                if (!content.trainingPageContent) return;
                const optimizedUrl = await optimizeImageString(p.jumpTrainingImage3Url, 800);
                content.updateTrainingPageContent({...content.trainingPageContent, jumpTrainingImage3Url: optimizedUrl});
            });
            checkImage(p.resetAndRehabImage1Url, 'Training: Rehab 1', async () => {
                if (!content.trainingPageContent) return;
                const optimizedUrl = await optimizeImageString(p.resetAndRehabImage1Url, 800);
                content.updateTrainingPageContent({...content.trainingPageContent, resetAndRehabImage1Url: optimizedUrl});
            });
            checkImage(p.resetAndRehabImage2Url, 'Training: Rehab 2', async () => {
                if (!content.trainingPageContent) return;
                const optimizedUrl = await optimizeImageString(p.resetAndRehabImage2Url, 800);
                content.updateTrainingPageContent({...content.trainingPageContent, resetAndRehabImage2Url: optimizedUrl});
            });
            checkImage(p.resetAndRehabImage3Url, 'Training: Rehab 3', async () => {
                if (!content.trainingPageContent) return;
                const optimizedUrl = await optimizeImageString(p.resetAndRehabImage3Url, 800);
                content.updateTrainingPageContent({...content.trainingPageContent, resetAndRehabImage3Url: optimizedUrl});
            });
        }
        if (content.facilitiesPageContent) {
            const p = content.facilitiesPageContent;
            checkImage(p.heroImageUrl, 'Facilities: Hero', async () => {
                if (!content.facilitiesPageContent) return;
                const optimizedUrl = await optimizeImageString(p.heroImageUrl, 1920);
                content.updateFacilitiesPageContent({...content.facilitiesPageContent, heroImageUrl: optimizedUrl});
            });
            p.galleryImages.forEach((img, i) => checkImage(img, `Facilities: Gallery ${i + 1}`, async () => {
                if (!content.facilitiesPageContent) return;
                const optimizedUrl = await optimizeImageString(img, 1024);
                const newImgs = [...content.facilitiesPageContent.galleryImages]; 
                newImgs[i] = optimizedUrl; 
                content.updateFacilitiesPageContent({...content.facilitiesPageContent, galleryImages: newImgs});
            }));
        }
        if (content.partnershipsPageContent) {
            const p = content.partnershipsPageContent;
            checkImage(p.heroImageUrl, 'Partnerships: Hero', async () => {
                if (!content.partnershipsPageContent) return;
                const optimizedUrl = await optimizeImageString(p.heroImageUrl, 1920);
                content.updatePartnershipsPageContent({...content.partnershipsPageContent, heroImageUrl: optimizedUrl});
            });
            p.galleryImages.forEach((img, i) => checkImage(img, `Partnerships: Gallery ${i + 1}`, async () => {
                if (!content.partnershipsPageContent) return;
                const optimizedUrl = await optimizeImageString(img, 1024);
                const newImgs = [...content.partnershipsPageContent.galleryImages]; 
                newImgs[i] = optimizedUrl; 
                content.updatePartnershipsPageContent({...content.partnershipsPageContent, galleryImages: newImgs});
            }));
        }
        if (content.bloodstockPageContent) {
            const p = content.bloodstockPageContent;
            checkImage(p.heroImageUrl, 'Bloodstock: Hero', async () => {
                if (!content.bloodstockPageContent) return;
                const optimizedUrl = await optimizeImageString(p.heroImageUrl, 1920);
                content.updateBloodstockPageContent({...content.bloodstockPageContent, heroImageUrl: optimizedUrl});
            });
            checkImage(p.yearlingSalesUrl, 'Bloodstock: Yearling', async () => {
                if (!content.bloodstockPageContent) return;
                const optimizedUrl = await optimizeImageString(p.yearlingSalesUrl, 800);
                content.updateBloodstockPageContent({...content.bloodstockPageContent, yearlingSalesUrl: optimizedUrl});
            });
            checkImage(p.internationalSalesUrl, 'Bloodstock: International', async () => {
                if (!content.bloodstockPageContent) return;
                const optimizedUrl = await optimizeImageString(p.internationalSalesUrl, 800);
                content.updateBloodstockPageContent({...content.bloodstockPageContent, internationalSalesUrl: optimizedUrl});
            });
            checkImage(p.privateSalesUrl, 'Bloodstock: Private', async () => {
                if (!content.bloodstockPageContent) return;
                const optimizedUrl = await optimizeImageString(p.privateSalesUrl, 800);
                content.updateBloodstockPageContent({...content.bloodstockPageContent, privateSalesUrl: optimizedUrl});
            });
            checkImage(p.olderHorseSalesUrl, 'Bloodstock: Older Horse', async () => {
                if (!content.bloodstockPageContent) return;
                const optimizedUrl = await optimizeImageString(p.olderHorseSalesUrl, 800);
                content.updateBloodstockPageContent({...content.bloodstockPageContent, olderHorseSalesUrl: optimizedUrl});
            });
        }

        setLargeImages(foundImages.sort((a, b) => b.sizeKB - a.sizeKB));
        if (reset) setIsScanning(false);
    };

    const handleCompressImage = async (image: LargeImageInfo) => {
        setCompressingLocation(image.location);
        await image.compressAction();
        handleScanForLargeImages(false); // Rescan to refresh list without resetting UI
        setCompressingLocation(null);
    };
    
    const handleCompressAll = async () => {
        if (!largeImages || largeImages.length === 0) return;
        if (!window.confirm(`This will attempt to compress all ${largeImages.length} large images found. Continue?`)) return;

        for (const image of largeImages) {
            await handleCompressImage(image);
        }
    };


    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Import / Export Data</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500">
                <h2 className="text-xl font-semibold text-blue-600 mb-2">Interactive Image Optimizer</h2>
                <p className="text-gray-600 mb-4">
                    If you see a "Failed to load file differences" error on GitHub, it means an image is too large. This tool finds those images and lets you compress them with one click.
                </p>
                <button
                    onClick={() => handleScanForLargeImages()}
                    disabled={isScanning}
                    className="px-6 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {isScanning ? 'Scanning...' : 'Step 1: Scan for Large Images (>400KB)'}
                </button>
                {largeImages && (
                    <div className="mt-6">
                        {largeImages.length > 0 ? (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-red-600">Scan Complete: {largeImages.length} Large Images Found</h3>
                                        <p className="text-gray-700 mt-1">Click "Compress" on individual images, or compress them all at once.</p>
                                    </div>
                                    <button
                                        onClick={handleCompressAll}
                                        className="px-5 py-2 font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600"
                                    >
                                        Compress All
                                    </button>
                                </div>
                                
                                <ul className="space-y-3 max-h-96 overflow-y-auto pr-2 border-t pt-4">
                                    {largeImages.map(img => (
                                        <li key={img.location} className="flex items-center justify-between gap-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                            <div className="flex items-center gap-4">
                                                <img src={img.preview} alt="Preview" className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                                                <div>
                                                    <p className="font-bold text-gray-800">{img.location}</p>
                                                    <p className="text-red-700 font-semibold">{img.sizeKB} KB</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleCompressImage(img)}
                                                disabled={compressingLocation === img.location}
                                                className="px-4 py-1.5 font-semibold text-sm text-white bg-red-500 rounded-md hover:bg-red-600 disabled:bg-gray-400 w-28 text-center"
                                            >
                                                {compressingLocation === img.location ? 'Working...' : 'Compress'}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-lg font-semibold text-green-600">Scan Complete: No Large Images Found!</h3>
                                <p className="text-gray-700 mt-2">Congratulations! Your website's images are well-optimized.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold text-brand-teal mb-4">Export Data</h2>
                <p className="text-gray-600 mb-4">
                    Download a complete backup of all your website's content. This includes horses, team members, news, photos, and all page text. This is the file you will use to make your site live.
                </p>
                <button
                    onClick={handleExport}
                    className="px-6 py-2 font-bold text-white bg-brand-teal rounded-md hover:bg-opacity-90"
                >
                    Export All Website Data
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-red-600 mb-4">Import Data</h2>
                <p className="text-gray-600 mb-4">
                    Restore your website's content from a backup file. 
                    <strong className="text-red-700"> Warning: This will overwrite all current data on the website and reload the page.</strong>
                </p>
                <div className="flex items-center space-x-4">
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="application/json"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-100 file:text-red-700 hover:file:bg-red-200 cursor-pointer"
                    />
                    <button
                        onClick={handleImport}
                        className="px-6 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                        Import Data
                    </button>
                </div>
                {importStatus === 'success' && <p className="text-green-600 mt-4">Data imported successfully! Reloading...</p>}
                {importStatus === 'error' && <p className="text-red-600 mt-4">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default ManageDataPage;