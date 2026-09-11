/*
 * © LAB HUB · Developed by Sakina Asaad
 * تطوير: سكينة أسعد
 * 
 * LAB HUB Original Interactive Cartoon Study Companion Types
 * Core Platform Component — Brand Identity & Motivation System
 */

export type CompanionExpression =
  | 'happy'
  | 'proud'
  | 'encouraging'
  | 'thinking'
  | 'explaining'
  | 'celebrating'
  | 'surprised'
  | 'you_can_do_it'
  | 'correct_answer'
  | 'exam_encouragement'
  | 'welcome'
  | 'goodbye';

export interface AchievementItem {
  id: string;
  icon: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  unlockedAt?: string;
  count?: number;
}

export interface CompanionState {
  expression: CompanionExpression;
  message: string;
  isBubbleVisible: boolean;
  isThinking: boolean;
  isCelebrating: boolean;
  isMinimized: boolean;
  streakCount: number;
  unlockedAchievements: string[];
}
