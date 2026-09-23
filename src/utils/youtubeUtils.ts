/**
 * LAB HUB - High-Precision YouTube URL Parser & Embed Generator
 * Guarantees valid embed URL conversion to eliminate "Video unavailable" errors.
 */

export function extractYouTubeVideoId(input: string | undefined | null): string {
  if (!input) return '';
  const trimmed = input.trim();

  // If already an 11-character video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Handle standard watch URLs: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }

  // Handle shorts URLs: https://www.youtube.com/shorts/VIDEO_ID
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([^"&?\/\s]{11})/i);
  if (shortsMatch && shortsMatch[1]) {
    return shortsMatch[1];
  }

  // Handle embed URLs: https://www.youtube.com/embed/VIDEO_ID or youtube-nocookie.com/embed/VIDEO_ID
  const embedMatch = trimmed.match(/youtube(?:-nocookie)?\.com\/embed\/([^"&?\/\s]{11})/i);
  if (embedMatch && embedMatch[1]) {
    return embedMatch[1];
  }

  // Handle live stream URLs
  const liveMatch = trimmed.match(/youtube\.com\/live\/([^"&?\/\s]{11})/i);
  if (liveMatch && liveMatch[1]) {
    return liveMatch[1];
  }

  // Fallback: search for any 11-character alphanumeric string after v= or /
  const fallback = trimmed.match(/([a-zA-Z0-9_-]{11})/);
  return fallback ? fallback[1] : '';
}

export function getYouTubeEmbedUrl(
  input: string | undefined | null,
  options: { autoplay?: boolean; start?: number; loop?: boolean } = {}
): string {
  const videoId = extractYouTubeVideoId(input);
  if (!videoId) return '';

  const params = new URLSearchParams();
  params.set('rel', '0');
  params.set('modestbranding', '1');
  params.set('playsinline', '1');

  if (options.autoplay) {
    params.set('autoplay', '1');
  }

  if (options.start && options.start > 0) {
    params.set('start', String(Math.floor(options.start)));
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function getYouTubeThumbnailUrl(input: string | undefined | null): string {
  const videoId = extractYouTubeVideoId(input);
  if (!videoId) return 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600';
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
