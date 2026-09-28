/**
 * Anatomy Specimen Custom Image & Asset Mapper Storage
 * Allows students and faculty to assign real bone and joint specimen images from their
 * official college practical handout (via file upload Base64 or direct URL),
 * stored persistently in localStorage.
 */

const STORAGE_PREFIX = 'anatomy_specimen_custom_image_';

export function getCustomAnatomyImage(key: string): string | null {
  if (!key) return null;
  try {
    const cleanKey = key.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    return localStorage.getItem(`${STORAGE_PREFIX}${cleanKey}`) || null;
  } catch (e) {
    console.warn('Failed to read anatomy specimen image from storage', e);
    return null;
  }
}

export function setCustomAnatomyImage(key: string, dataUrl: string): void {
  if (!key || !dataUrl) return;
  try {
    const cleanKey = key.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    localStorage.setItem(`${STORAGE_PREFIX}${cleanKey}`, dataUrl);
    window.dispatchEvent(new CustomEvent('anatomy_specimen_image_updated', { detail: { key: cleanKey, dataUrl } }));
  } catch (e) {
    console.warn('Failed to save anatomy specimen image to storage', e);
  }
}

export function removeCustomAnatomyImage(key: string): void {
  if (!key) return;
  try {
    const cleanKey = key.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    localStorage.removeItem(`${STORAGE_PREFIX}${cleanKey}`);
    window.dispatchEvent(new CustomEvent('anatomy_specimen_image_updated', { detail: { key: cleanKey, dataUrl: null } }));
  } catch (e) {
    console.warn('Failed to remove anatomy specimen image from storage', e);
  }
}
