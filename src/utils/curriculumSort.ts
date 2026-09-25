import { Practical, ManagedImage, LabSubjectId } from '../types';

// Subject canonical order: Anatomy -> Histology -> Biochemistry
export const SUBJECT_ORDER: Record<string, number> = {
  anatomy: 1,
  histology: 2,
  biochemistry: 3
};

/**
 * Sorts practical lessons according to LAB HUB curriculum hierarchy:
 * 1. Explicit sortOrder or orderIndex if present
 * 2. Subject hierarchy (Anatomy -> Histology -> Biochemistry)
 * 3. Module / Unit / Practical number (1, 2, 3...)
 * 4. Alphabetical title
 */
export function sortPracticalsCurriculum(practicals: Practical[]): Practical[] {
  if (!Array.isArray(practicals)) return [];

  return [...practicals].sort((a, b) => {
    // 1. Explicit sortOrder / orderIndex
    const orderA = (a as any).sortOrder ?? (a as any).orderIndex;
    const orderB = (b as any).sortOrder ?? (b as any).orderIndex;
    if (typeof orderA === 'number' && typeof orderB === 'number') {
      if (orderA !== orderB) return orderA - orderB;
    }

    // 2. Subject Order
    const subjA = SUBJECT_ORDER[a.courseId] ?? 99;
    const subjB = SUBJECT_ORDER[b.courseId] ?? 99;
    if (subjA !== subjB) {
      return subjA - subjB;
    }

    // 3. Practical Number
    const numA = typeof a.practicalNumber === 'number' ? a.practicalNumber : parseInt(String(a.practicalNumber || 0), 10);
    const numB = typeof b.practicalNumber === 'number' ? b.practicalNumber : parseInt(String(b.practicalNumber || 0), 10);
    if (!isNaN(numA) && !isNaN(numB) && numA !== numB) {
      return numA - numB;
    }

    // 4. Alphabetical title
    return (a.title || '').localeCompare(b.title || '', 'ar');
  });
}

/**
 * Reconciles images with practical lessons and sorts them by:
 * Subject -> Lesson sort order -> Image sortOrder/sequence
 */
export function sortImagesCurriculum(images: ManagedImage[], practicals: Practical[]): ManagedImage[] {
  if (!Array.isArray(images)) return [];

  // Build lesson map for fast lookup
  const practicalMap = new Map<string, { practical: Practical; index: number }>();
  const sortedPracs = sortPracticalsCurriculum(practicals || []);
  sortedPracs.forEach((p, idx) => {
    practicalMap.set(p.id, { practical: p, index: idx });
  });

  return [...images].sort((a, b) => {
    // 1. Explicit order / sortOrder / orderIndex
    const orderA = a.order ?? (a as any).sortOrder ?? (a as any).orderIndex;
    const orderB = b.order ?? (b as any).sortOrder ?? (b as any).orderIndex;
    if (typeof orderA === 'number' && typeof orderB === 'number') {
      if (orderA !== orderB) return orderA - orderB;
    }

    // 2. Subject
    const subjA = SUBJECT_ORDER[a.subject] ?? 99;
    const subjB = SUBJECT_ORDER[b.subject] ?? 99;
    if (subjA !== subjB) {
      return subjA - subjB;
    }

    // 3. Lesson association
    const pracInfoA = a.lessonId ? practicalMap.get(a.lessonId) : null;
    const pracInfoB = b.lessonId ? practicalMap.get(b.lessonId) : null;

    if (pracInfoA && pracInfoB) {
      if (pracInfoA.index !== pracInfoB.index) {
        return pracInfoA.index - pracInfoB.index;
      }
      const ordA = a.order ?? 999;
      const ordB = b.order ?? 999;
      if (ordA !== ordB) return ordA - ordB;
    } else if (pracInfoA && !pracInfoB) {
      return -1;
    } else if (!pracInfoA && pracInfoB) {
      return 1;
    }

    // 4. Title / filename
    return (a.title || '').localeCompare(b.title || '', 'ar');
  });
}

/**
 * Reconciles unassigned images to find correct lessons
 */
export function reconcileImageLessonAssociations(images: ManagedImage[], practicals: Practical[]): ManagedImage[] {
  if (!Array.isArray(images)) return [];

  return images.map(img => {
    if (img.lessonId) {
      const found = practicals.find(p => p.id === img.lessonId);
      if (found) {
        return {
          ...img,
          lessonTitle: found.title,
          subject: found.courseId || img.subject
        };
      }
    }
    return img;
  });
}
