/*
 * © LAB HUB · Developed by Sakina Asaad
 * تطوير: سكينة أسعد
 * 
 * LAB HUB Study Companion State Manager & Motivation Engine
 * Original Cartoon Companion: "لبيب" (Labeeb)
 */

import { CompanionExpression, CompanionState, AchievementItem } from './companionTypes';

const STORAGE_ACHIEVEMENTS_KEY = 'labhub_companion_achievements_v1';
const STORAGE_MINIMIZED_KEY = 'labhub_companion_minimized_v1';

export const COMPANION_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'lesson_completed',
    icon: '🌟',
    titleAr: 'درس مكتمل',
    titleEn: 'Lesson Completed',
    descriptionAr: 'إكمال أول درس عملي في المختبرات الطبية'
  },
  {
    id: 'correct_answer',
    icon: '🏆',
    titleAr: 'إجابة صحيحة',
    titleEn: 'Correct Answer',
    descriptionAr: 'حل سؤال اختباري بنجاح وتميز'
  },
  {
    id: 'streak_3',
    icon: '🔥',
    titleAr: 'سلسلة إجابات صحيحة',
    titleEn: 'Streak Master',
    descriptionAr: 'الإجابة الصحيحة المتتالية لـ 3 أسئلة وأكثر'
  },
  {
    id: 'multi_lessons',
    icon: '📚',
    titleAr: 'عدة دروس مكتملة',
    titleEn: 'Multi-Lesson Scholar',
    descriptionAr: 'إتقان أكثر من 3 دروس في المعامل المختلفة'
  },
  {
    id: 'exam_completed',
    icon: '🎯',
    titleAr: 'اختبار مكتمل',
    titleEn: 'Practical Exam Master',
    descriptionAr: 'اجتياز اختبار عملي (OSPE) بنجاح'
  }
];

class CompanionStore {
  private listeners: Set<() => void> = new Set();
  private hideTimeout: NodeJS.Timeout | null = null;

  private state: CompanionState = {
    expression: 'welcome',
    message: 'أهلًا بكِ في LAB HUB! 🌟',
    isBubbleVisible: true,
    isThinking: false,
    isCelebrating: false,
    isMinimized: false,
    streakCount: 0,
    unlockedAchievements: []
  };

  constructor() {
    // Load stored preferences
    if (typeof window !== 'undefined') {
      try {
        const storedAchievements = localStorage.getItem(STORAGE_ACHIEVEMENTS_KEY);
        if (storedAchievements) {
          this.state.unlockedAchievements = JSON.parse(storedAchievements);
        }
        const storedMinimized = localStorage.getItem(STORAGE_MINIMIZED_KEY);
        if (storedMinimized === 'true') {
          this.state.isMinimized = true;
          this.state.isBubbleVisible = false;
        }
      } catch {
        // Fallback
      }
    }
  }

  public getState(): CompanionState {
    return { ...this.state };
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => {
      try {
        fn();
      } catch (err) {
        console.error('Companion listener error:', err);
      }
    });
  }

  public say(message: string, expression: CompanionExpression = 'happy', duration = 7000) {
    if (this.hideTimeout) clearTimeout(this.hideTimeout);

    this.state.expression = expression;
    this.state.message = message;
    this.state.isBubbleVisible = true;
    this.state.isThinking = expression === 'thinking';
    this.state.isCelebrating = expression === 'celebrating' || expression === 'correct_answer';

    this.notify();

    if (duration > 0) {
      this.hideTimeout = setTimeout(() => {
        this.state.isBubbleVisible = false;
        this.notify();
      }, duration);
    }
  }

  public dismissBubble() {
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.state.isBubbleVisible = false;
    this.notify();
  }

  public toggleMinimized() {
    this.state.isMinimized = !this.state.isMinimized;
    if (this.state.isMinimized) {
      this.state.isBubbleVisible = false;
    } else {
      this.state.isBubbleVisible = true;
    }
    try {
      localStorage.setItem(STORAGE_MINIMIZED_KEY, String(this.state.isMinimized));
    } catch {
      // Ignore
    }
    this.notify();
  }

  // --- Contextual Reactions as Mandated by Specifications ---

  public welcome() {
    this.say('أهلًا بكِ في LAB HUB! 🌟', 'welcome', 7000);
  }

  public studentReturned() {
    this.say('اشتقت لكِ! جاهزة نكمل؟ 😊', 'happy', 6000);
  }

  public enterLesson(lessonTitle?: string) {
    const msg = lessonTitle
      ? `جاهزة؟ لنبدأ درسنا الجديد! 📚`
      : 'جاهزة؟ لنبدأ درسنا الجديد! 📚';
    this.say(msg, 'encouraging', 6000);
  }

  public completeLesson(lessonTitle?: string) {
    this.state.isCelebrating = true;
    this.unlockAchievement('lesson_completed');
    this.say('أحسنتِ! أنهيتِ الدرس 👏', 'celebrating', 8000);
  }

  public correctAnswer() {
    const newStreak = this.state.streakCount + 1;
    this.state.streakCount = newStreak;
    this.unlockAchievement('correct_answer');

    if (newStreak >= 3) {
      this.unlockAchievement('streak_3');
      this.say('واو! مستواكِ يتحسن بسرعة! 🔥', 'proud', 7000);
    } else {
      const compliments = [
        'ممتاز! إجابة صحيحة 🎉',
        'أحسنتِ! استمري بهذا المستوى.',
        'ممتاز، كمّلي!',
        'عظيم! 👏',
        'خطوة ممتازة!'
      ];
      const randomMsg = compliments[Math.floor(Math.random() * compliments.length)];
      this.say(randomMsg, 'correct_answer', 6000);
    }
  }

  public incorrectAnswer() {
    this.state.streakCount = 0;
    const encouragements = [
      'ولا يهمكِ، حاولي مرة ثانية 💙',
      'خطأ بسيط، ولا مشكلة... حاولي مرة أخرى.',
      'اقتربتِ من الإجابة الصحيحة!',
      'لا تستسلمي، حاولي مرة ثانية.',
      'أنتِ قادرة 💪'
    ];
    const randomMsg = encouragements[Math.floor(Math.random() * encouragements.length)];
    this.say(randomMsg, 'encouraging', 6500);
  }

  public startExam(examName?: string) {
    this.say('ركزي بهدوء... أنتِ مستعدة! 💪', 'exam_encouragement', 7000);
  }

  public completeExam(scorePercentage?: number) {
    this.unlockAchievement('exam_completed');
    if (scorePercentage !== undefined && scorePercentage >= 80) {
      this.say('انتهى الاختبار! أحسنتِ على مجهودكِ الرائع 🌟', 'celebrating', 8500);
    } else {
      this.say('انتهى الاختبار! أحسنتِ على مجهودكِ 🌟', 'proud', 7500);
    }
  }

  public showTip(tip: string) {
    this.say(`ركزي هنا، هذه نقطة مهمة: ${tip}`, 'explaining', 8000);
  }

  public randomEncouragement() {
    const quotes = [
      'أنتِ قادرة 💪',
      'خطوة ممتازة!',
      'ممتاز، واضح أنكِ تتقدمين.',
      'جاهزة للدرس القادم؟',
      'أحسنتِ! استمري بهذا المستوى.',
      'فخورة بتقدمكِ!',
      'بالتوفيق في الاختبار ❤️',
      'ركزي هنا، هذه نقطة مهمة.'
    ];
    const pick = quotes[Math.floor(Math.random() * quotes.length)];
    const expressions: CompanionExpression[] = ['happy', 'proud', 'encouraging', 'you_can_do_it'];
    const expr = expressions[Math.floor(Math.random() * expressions.length)];
    this.say(pick, expr, 6000);
  }

  public unlockAchievement(achievementId: string) {
    if (!this.state.unlockedAchievements.includes(achievementId)) {
      this.state.unlockedAchievements.push(achievementId);
      try {
        localStorage.setItem(STORAGE_ACHIEVEMENTS_KEY, JSON.stringify(this.state.unlockedAchievements));
      } catch {
        // Ignore
      }
      this.notify();
    }
  }
}

export const companionService = new CompanionStore();
