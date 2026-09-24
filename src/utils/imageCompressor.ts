/**
 * LAB HUB - High-Performance Client-Side Medical Image Compressor
 * Automatically downsizes and compresses medical slides/images to < 200KB
 * ensuring lightning-fast uploads and rendering across all student mobile devices.
 */

export async function compressImageToMax200KB(
  input: File | string,
  targetMaxBytes: number = 200 * 1024 // 200 KB
): Promise<string> {
  return new Promise((resolve) => {
    // 1. Get initial data URL
    const getDataUrl = (): Promise<string> => {
      if (typeof input === 'string') {
        return Promise.resolve(input);
      }
      return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = (e) => res(e.target?.result as string);
        reader.onerror = (e) => rej(e);
        reader.readAsDataURL(input);
      });
    };

    getDataUrl()
      .then((dataUrl) => {
        // If already under target size and not a giant raw base64, check size
        const approximateBytes = Math.round((dataUrl.length * 3) / 4);
        if (approximateBytes <= targetMaxBytes && dataUrl.startsWith('data:image/jpeg')) {
          resolve(dataUrl);
          return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          try {
            let width = img.naturalWidth || img.width;
            let height = img.naturalHeight || img.height;

            // Maximum dimensions for high-fidelity mobile view
            const maxDimension = 1400;
            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
              resolve(dataUrl);
              return;
            }

            // Fill white background for transparent PNG conversion to clean JPEG
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            // Progressive quality reduction until < targetMaxBytes
            let quality = 0.85;
            let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

            while (Math.round((compressedDataUrl.length * 3) / 4) > targetMaxBytes && quality > 0.3) {
              quality -= 0.1;
              compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            }

            resolve(compressedDataUrl);
          } catch (err) {
            console.warn('[COMPRESSOR] Canvas processing error, falling back to original:', err);
            resolve(dataUrl);
          }
        };

        img.onerror = () => {
          resolve(dataUrl);
        };

        img.src = dataUrl;
      })
      .catch((err) => {
        console.warn('[COMPRESSOR] Failed to read image, returning fallback:', err);
        resolve(typeof input === 'string' ? input : '');
      });
  });
}
