export const compressImage = (
    file: File, 
    options: { maxWidth?: number; quality?: number; mimeType?: 'image/jpeg' | 'image/png' } = {}
): Promise<string> => {
    const { maxWidth = 1920, quality = 0.7 } = options;
    // default to jpeg unless it's a png to preserve transparency
    const finalMimeType = options.mimeType || (file.type === 'image/png' ? 'image/png' : 'image/jpeg');

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            if (!event.target?.result) {
                return reject(new Error("Couldn't read file"));
            }
            const img = new Image();
            img.src = event.target.result as string;
            img.onload = () => {
                // If the image is smaller than max width, and it's not a jpeg we want to force compress, just return original
                if (img.width <= maxWidth && file.type !== 'image/jpeg' && !options.mimeType) {
                    resolve(img.src);
                    return;
                }

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    return reject(new Error('Could not get canvas context'));
                }

                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = (maxWidth / width) * height;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL(finalMimeType, finalMimeType === 'image/jpeg' ? quality : undefined);
                resolve(dataUrl);
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
};
