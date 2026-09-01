/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * All Rights Reserved.
 *
 * Authentication & Session Management Service
 */

import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';
import { securityService } from './securityService';

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
  lastLogin: string;
}

const AUTH_STORAGE_KEY = 'labhub_auth_session';

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Returns current authenticated session or creates default student session
   */
  public getSession(): AuthSession {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const session: AuthSession = JSON.parse(stored);
        if (session.user && session.expiresAt > Date.now()) {
          return session;
        }
      }
    } catch {
      // Fallback
    }

    const defaultUser = DEMO_USERS[0];
    const session: AuthSession = {
      user: defaultUser,
      token: this.generateSessionToken(defaultUser),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      lastLogin: new Date().toISOString()
    };
    this.saveSession(session);
    return session;
  }

  /**
   * Save session to storage
   */
  public saveSession(session: AuthSession): void {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.error('Failed to save session:', e);
    }
  }

  /**
   * Authenticate and switch user account with role checking
   */
  public loginAsUser(user: User, pinOrPassword?: string): { success: boolean; session?: AuthSession; message: string } {
    // If logging into elevated role (instructor or admin), verify security check if PIN provided
    if (user.role === 'admin') {
      if (pinOrPassword && pinOrPassword !== '2026' && pinOrPassword !== 'admin123') {
        return { success: false, message: 'Invalid Admin Security PIN (Default: 2026)' };
      }
    } else if (user.role === 'instructor') {
      if (pinOrPassword && pinOrPassword !== '1234' && pinOrPassword !== 'faculty') {
        return { success: false, message: 'Invalid Faculty Security PIN (Default: 1234)' };
      }
    }

    const session: AuthSession = {
      user,
      token: this.generateSessionToken(user),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      lastLogin: new Date().toISOString()
    };

    this.saveSession(session);
    return { success: true, session, message: `Successfully authenticated as ${user.name} (${user.role.toUpperCase()})` };
  }

  /**
   * Switch role easily for demo & classroom environments
   */
  public switchRole(role: UserRole): User {
    const targetUser = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    this.loginAsUser(targetUser);
    return targetUser;
  }

  /**
   * Log out session
   */
  public logout(): void {
    const student = DEMO_USERS[0];
    this.loginAsUser(student);
  }

  /**
   * Generate lightweight session token with role signature
   */
  private generateSessionToken(user: User): string {
    const payload = `${user.id}:${user.role}:${Date.now()}`;
    const hash = securityService.generateChecksum(payload);
    return btoa(`${payload}:${hash}`);
  }
}

export const authService = AuthService.getInstance();
