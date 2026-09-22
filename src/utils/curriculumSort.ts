import { Practical, ManagedImage, LabSubjectId } from '../types';

export const SUBJECT_ORDER: Record<string, number> = {
  anatomy: 1,
  histology: 2,
  biochemistry: 3
};

export const SUBJECT_LABELS: Record<string, { en: string; ar: string }> = {
  anatomy: { en: 'Anatomy Lab', ar: 'مختبر التشريح' },
  histology: { en: 'Histology Lab', ar: 'مختبر الأنسجة' },
  biochemistry: { en: 'Biochemistry Lab', ar: 'مختبر الكيمياء الحيوية' }
};

/**
 * Sorts all practicals strictly according to the official LAB HUB curriculum:
 * 1. Subject order (Anatomy -> Histology -> Biochemistry)
 * 2. Module / Unit / Practical number (1, 2, 3, 4, 5, 6, ...)
 * 3. Title alphabetical stability
 */
export function sortPracticalsCurriculum(practicals: Practical[]): Practical[] {
  if (!Array.isArray(practicals)) return [];

  return [...practicals].sort((a, b) => {
    const subA = SUBJECT_ORDER[a.courseId] || 99;
    const subB = SUBJECT_ORDER[b.courseId] || 99;
    if (subA !== subB) return subA - subB;

    const numA = typeof a.practicalNumber === 'number' ? a.practicalNumber : 999;
    const numB = typeof b.practicalNumber === 'number' ? b.practicalNumber : 999;
    if (numA !== numB) return numA - numB;

    return (a.title || '').localeCompare(b.title || '', 'ar');
  });
}

/**
 * Reconciles and associates images with their correct:
 * Subject → Unit / Module → Lesson → Content / Image
 * Ensures no random scattering and assigns orphaned images to their proper lessons based on metadata.
 */
export function reconcileImageLessonAssociations(
  images: ManagedImage[],
  practicals: Practical[]
): ManagedImage[] {
  if (!Array.isArray(images)) return [];

  const sortedPracticals = sortPracticalsCurriculum(practicals);
  const practicalMap = new Map<string, Practical>();
  sortedPracticals.forEach(p => {
    practicalMap.set(p.id, p);
  });

  return images.map(img => {
    let resolvedSubject: LabSubjectId = img.subject || 'anatomy';
    let resolvedLessonId = img.lessonId;
    let resolvedLessonTitle = img.lessonTitle;

    // Check if lessonId exists and is valid
    if (resolvedLessonId && practicalMap.has(resolvedLessonId)) {
      const p = practicalMap.get(resolvedLessonId)!;
      resolvedSubject = p.courseId;
      resolvedLessonTitle = p.title;
    } else {
      // Find matching lesson based on title, caption, stain, or keywords
      const searchKey = `${img.title || ''} ${img.caption || ''} ${img.stainOrView || ''}`.toLowerCase();

      let matchedPractical: Practical | undefined;

      if (searchKey.includes('skull') || searchKey.includes('foramen') || searchKey.includes('cranial') || searchKey.includes('fossa')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_anat_01');
      } else if (searchKey.includes('scapula') || searchKey.includes('humerus') || searchKey.includes('brachial') || searchKey.includes('plexus') || searchKey.includes('arm')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_anat_02');
      } else if (searchKey.includes('heart') || searchKey.includes('atrium') || searchKey.includes('ventricle') || searchKey.includes('aorta') || searchKey.includes('cardiac anatomy')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_anat_03');
      } else if (searchKey.includes('lung') || searchKey.includes('bronchus') || searchKey.includes('trachea') || searchKey.includes('respiratory')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_anat_04');
      } else if (searchKey.includes('inguinal') || searchKey.includes('rectus') || searchKey.includes('abdominal wall') || searchKey.includes('abdomen')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_anat_05');
      } else if (searchKey.includes('femoral') || searchKey.includes('knee') || searchKey.includes('meniscus') || searchKey.includes('cruciate') || searchKey.includes('patella')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_anat_06');
      } else if (searchKey.includes('epithel') || searchKey.includes('simple squamous') || searchKey.includes('cuboidal') || searchKey.includes('columnar') || searchKey.includes('transitional')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_hist_01');
      } else if (searchKey.includes('connective') || searchKey.includes('collagen') || searchKey.includes('fibroblast') || searchKey.includes('elastic') || searchKey.includes('adipose')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_hist_02');
      } else if (searchKey.includes('cartilage') || searchKey.includes('bone histology') || searchKey.includes('osteon') || searchKey.includes('haversian') || searchKey.includes('chondrocyte')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_hist_03');
      } else if (searchKey.includes('blood') || searchKey.includes('smear') || searchKey.includes('neutrophil') || searchKey.includes('lymphocyte') || searchKey.includes('rbc') || searchKey.includes('wbc')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_hist_04');
      } else if (searchKey.includes('muscle') || searchKey.includes('skeletal muscle') || searchKey.includes('cardiac muscle') || searchKey.includes('smooth muscle') || searchKey.includes('striation') || searchKey.includes('intercalated')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_hist_05');
      } else if (searchKey.includes('nerve') || searchKey.includes('neuron') || searchKey.includes('axon') || searchKey.includes('myelin') || searchKey.includes('spinal cord') || searchKey.includes('nissl')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_hist_06');
      } else if (searchKey.includes('carbohydrate') || searchKey.includes('molisch') || searchKey.includes('benedict') || searchKey.includes('barfoed') || searchKey.includes('seliwanoff') || searchKey.includes('sugar')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_bio_01') || sortedPracticals.find(p => p.id === 'prac_bio_02');
      } else if (searchKey.includes('protein') || searchKey.includes('biuret') || searchKey.includes('ninhydrin') || searchKey.includes('heat coagulation') || searchKey.includes('albumin')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_bio_02');
      } else if (searchKey.includes('lipid') || searchKey.includes('cholesterol') || searchKey.includes('salkowski') || searchKey.includes('liebermann') || searchKey.includes('triglyceride')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_bio_03');
      } else if (searchKey.includes('enzyme') || searchKey.includes('amylase') || searchKey.includes('starch') || searchKey.includes('salivary') || searchKey.includes('iodine')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_bio_04');
      } else if (searchKey.includes('urinalysis') || searchKey.includes('urine') || searchKey.includes('creatinine') || searchKey.includes('urea') || searchKey.includes('renal')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_bio_05');
      } else if (searchKey.includes('bilirubin') || searchKey.includes('spectrophot') || searchKey.includes('jaundice') || searchKey.includes('van den bergh')) {
        matchedPractical = sortedPracticals.find(p => p.id === 'prac_bio_06');
      }

      if (matchedPractical) {
        resolvedLessonId = matchedPractical.id;
        resolvedLessonTitle = matchedPractical.title;
        resolvedSubject = matchedPractical.courseId;
      }
    }

    return {
      ...img,
      subject: resolvedSubject,
      lessonId: resolvedLessonId,
      lessonTitle: resolvedLessonTitle
    };
  });
}

/**
 * Sorts managed images according to curriculum structure:
 * Subject → Unit / Module → Lesson → Image
 */
export function sortImagesCurriculum(
  images: ManagedImage[],
  practicals: Practical[]
): ManagedImage[] {
  const reconciled = reconcileImageLessonAssociations(images, practicals);
  const practicalMap = new Map<string, Practical>();
  practicals.forEach(p => practicalMap.set(p.id, p));

  return [...reconciled].sort((a, b) => {
    // 1. Subject order
    const subA = SUBJECT_ORDER[a.subject] || 99;
    const subB = SUBJECT_ORDER[b.subject] || 99;
    if (subA !== subB) return subA - subB;

    // 2. Practical lesson order
    const pracA = a.lessonId ? practicalMap.get(a.lessonId) : undefined;
    const pracB = b.lessonId ? practicalMap.get(b.lessonId) : undefined;

    const numA = pracA ? (typeof pracA.practicalNumber === 'number' ? pracA.practicalNumber : 99) : 999;
    const numB = pracB ? (typeof pracB.practicalNumber === 'number' ? pracB.practicalNumber : 99) : 999;
    if (numA !== numB) return numA - numB;

    // 3. Stable alphabetical by title
    return (a.title || '').localeCompare(b.title || '', 'ar');
  });
}
