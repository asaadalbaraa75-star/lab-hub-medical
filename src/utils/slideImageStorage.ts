/**
 * Histology Slide Custom Image & Asset Mapper Storage
 * Allows students and faculty to assign real microscopy images from their
 * official handout (via file upload Base64 or direct URL), stored persistently in localStorage.
 */

const STORAGE_PREFIX = 'histology_slide_custom_image_';

export function getCustomSlideImage(key: string): string | null {
  if (!key) return null;
  try {
    const cleanKey = key.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    return localStorage.getItem(`${STORAGE_PREFIX}${cleanKey}`) || null;
  } catch (e) {
    console.warn('Failed to read slide image from storage', e);
    return null;
  }
}

export function setCustomSlideImage(key: string, dataUrl: string): void {
  if (!key || !dataUrl) return;
  try {
    const cleanKey = key.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    localStorage.setItem(`${STORAGE_PREFIX}${cleanKey}`, dataUrl);
    window.dispatchEvent(new CustomEvent('histology_slide_image_updated', { detail: { key: cleanKey, dataUrl } }));
  } catch (e) {
    console.warn('Failed to save slide image to storage', e);
  }
}

export function removeCustomSlideImage(key: string): void {
  if (!key) return null as any;
  try {
    const cleanKey = key.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    localStorage.removeItem(`${STORAGE_PREFIX}${cleanKey}`);
    window.dispatchEvent(new CustomEvent('histology_slide_image_updated', { detail: { key: cleanKey, dataUrl: null } }));
  } catch (e) {
    console.warn('Failed to remove slide image from storage', e);
  }
}
