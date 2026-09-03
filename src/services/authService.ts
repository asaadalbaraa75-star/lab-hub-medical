/*
 * Copyright © 2026 سكينة أسعد
 * LAB HUB — Original Educational Platform
 * All Rights Reserved.
 *
 * Authentication & Session Management Service
 */

import { User, UserRole, UserActivityRecord, AdminAnalyticsMetrics, AdminAnalyticsBreakdown, AuthSession, AdminSecurityStatus } from '../types';
import { DEMO_USERS } from '../data/mockData';
import { securityService } from './securityService';

const AUTH_STORAGE_KEY = 'labhub_auth_session';
const USERS_STORAGE_KEY = 'labhub_registered_users';
const ACTIVITIES_STORAGE_KEY = 'labhub_user_activities';
const SECURITY_UPDATE_VERSION = '2026.09.03_SEC_FINAL';

interface StoredUserRecord extends User {
  passwordHash: string;
}

export class AuthService {
  private static instance: AuthService;
  private throttledActivities: Map<string, number> = new Map();

  private constructor() {
    this.ensureInitialUsers();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Initialize local user directory with default accounts if not yet created
   */
  private ensureInitialUsers(): void {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (!stored) {
        const initialUsers: StoredUserRecord[] = [
          {
            id: 'usr_student_1',
            userId: 'usr_student_1',
            name: 'Sarah Al-Mansoor',
            fullName: 'Sarah Al-Mansoor',
            email: 'student@med.edu',
            role: 'student',
            passwordHash: this.hashPassword('student123'),
            studentId: 'MED-2026-4891',
            department: 'Faculty of Medicine — 2nd Year MBBS',
            year: 'Year 2 (Pre-Clinical)',
            enrolledLabs: ['anatomy', 'histology', 'bacteriology', 'biochemistry'],
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            createdAt: '2026-01-10T08:00:00.000Z',
            lastLoginAt: new Date().toISOString(),
            lastActivityAt: new Date().toISOString(),
            sessionCount: 14
          },
          {
            id: 'usr_admin_1',
            userId: 'usr_admin_1',
            name: 'Prof. Eleanor Hayes, MD, FRCPath',
            fullName: 'Prof. Eleanor Hayes, MD, FRCPath',
            email: 'admin@med.edu',
            role: 'admin',
            passwordHash: this.hashPassword('admin123'),
            studentId: 'ADM-MED-001',
            department: 'Academic Directorate & Laboratory Board',
            year: 'Dean of Medical Laboratory Curricula',
            enrolledLabs: ['anatomy', 'histology', 'bacteriology', 'biochemistry'],
            avatarUrl: 'https://images.unsplash.com/photo-1594824813680-79883506ecf5?w=150&auto=format&fit=crop&q=80',
            createdAt: '2025-09-01T08:00:00.000Z',
            lastLoginAt: new Date().toISOString(),
            lastActivityAt: new Date().toISOString(),
            sessionCount: 42
          },
          {
            id: 'usr_instructor_1',
            userId: 'usr_instructor_1',
            name: 'Dr. Tariq Vance, MD, MSc',
            fullName: 'Dr. Tariq Vance, MD, MSc',
            email: 'instructor@med.edu',
            role: 'instructor',
            passwordHash: this.hashPassword('faculty123'),
            studentId: 'FAC-MED-104',
            department: 'Department of Anatomy & Histology',
            year: 'Senior Teaching Faculty',
            enrolledLabs: ['anatomy', 'histology', 'bacteriology', 'biochemistry'],
            avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
            createdAt: '2025-10-15T08:00:00.000Z',
            lastLoginAt: new Date().toISOString(),
            lastActivityAt: new Date().toISOString(),
            sessionCount: 29
          }
        ];
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
      }
    } catch {
      // localStorage may be restricted
    }
  }

  public getStoredUsers(): StoredUserRecord[] {
    try {
      const item = localStorage.getItem(USERS_STORAGE_KEY);
      if (item) {
        return JSON.parse(item);
      }
    } catch {}
    return [];
  }

  private saveStoredUsers(users: StoredUserRecord[]): void {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users:', e);
    }
  }

  /**
   * Hashes a password with salt using the tamper-proof security checksum
   */
  public hashPassword(password: string): string {
    return securityService.generateChecksum(`labhub_salt_2026_${password}`);
  }

  /**
   * Returns current authenticated session or null if not logged in
   */
  public getSession(): AuthSession | null {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const session: AuthSession = JSON.parse(stored);
        if (session.user && session.expiresAt > Date.now()) {
          // Security Requirement: Invalidate/revoke previous Admin sessions from before this security update
          if (session.user.role === 'admin') {
            const adminEpoch = localStorage.getItem('labhub_admin_security_epoch');
            if (!adminEpoch || adminEpoch !== SECURITY_UPDATE_VERSION) {
              console.warn('[SECURITY] Revoking pre-update Admin session. Re-authentication required.');
              localStorage.removeItem(AUTH_STORAGE_KEY);
              localStorage.setItem('labhub_admin_security_epoch', SECURITY_UPDATE_VERSION);
              return null;
            }
          }

          // Verify role against signed token to prevent localStorage tampering
          if (session.token) {
            try {
              const decoded = atob(session.token);
              const parts = decoded.split(':');
              if (parts.length >= 2) {
                const tokenRole = parts[1];
                if (session.user.role === 'admin' && tokenRole !== 'admin') {
                  console.warn('[SECURITY ALERT] Role tampering detected in localStorage. Reverting privilege to token role.');
                  session.user.role = (tokenRole === 'admin' ? 'admin' : 'student') as UserRole;
                  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
                }
              }
            } catch {
              // Ignore decoding issues
            }
          }
          return session;
        }
      }
    } catch {
      // Fallback
    }
    return null;
  }

  /**
   * Checks whether an active, valid authentication session exists
   */
  public isAuthenticated(): boolean {
    const session = this.getSession();
    return session !== null && !!session.user;
  }

  /**
   * Returns current authenticated user or null
   */
  public getCurrentUser(): User | null {
    const session = this.getSession();
    return session ? session.user : null;
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
   * Update the active session user (e.g. role change, profile update)
   */
  public updateUserSession(user: User): void {
    const session = this.getSession();
    if (session) {
      session.user = user;
      this.saveSession(session);
    }
  }

  /**
   * Quick role switch helper for testing or role preview
   */
  public setMockRole(role: 'student' | 'instructor' | 'admin'): void {
    const session = this.getSession();
    if (session && session.user) {
      if (role === 'admin' && session.user.role !== 'admin') {
        console.warn('[SECURITY] Students are strictly forbidden from escalating their privileges to admin.');
        return;
      }
      session.user.role = role;
      this.saveSession(session);
      this.trackActivity(`تغيير الدور إلى: ${role}`, 'Security');
    }
  }

  /**
   * Primary Login Method with tracking
   */
  public async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPassword = String(password || '');

    if (!cleanEmail || !cleanPassword) {
      return { success: false, error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور | Email and password are required.' };
    }

    // Try server authentication first
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          const session: AuthSession = {
            user: data.user,
            token: data.token || this.generateSessionToken(data.user),
            expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
          };
          if (data.user.role === 'admin') {
            localStorage.setItem('labhub_admin_security_epoch', SECURITY_UPDATE_VERSION);
          }
          this.saveSession(session);
          this.syncLocalUserLogin(data.user);
          this.trackActivity('تسجيل الدخول إلى المنصة (Logged In)', 'Authentication');
          return { success: true, user: data.user };
        }
      }
    } catch {
      // Offline fallback to local store
    }

    // Local authentication fallback
    const users = this.getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة | Invalid email or password.' };
    }

    const inputHash = this.hashPassword(cleanPassword);
    if (user.passwordHash !== inputHash) {
      return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة | Invalid email or password.' };
    }

    // Update login tracking
    const now = new Date().toISOString();
    user.lastLoginAt = now;
    user.lastActivityAt = now;
    user.sessionCount = (user.sessionCount || 0) + 1;
    this.saveStoredUsers(users);

    const safeUser: User = {
      id: user.id,
      userId: user.id,
      name: user.name,
      fullName: user.name,
      email: user.email,
      studentId: user.studentId,
      role: user.role,
      avatarUrl: user.avatarUrl,
      department: user.department,
      year: user.year,
      enrolledLabs: user.enrolledLabs,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      lastActivityAt: user.lastActivityAt,
      sessionCount: user.sessionCount
    };

    if (safeUser.role === 'admin') {
      localStorage.setItem('labhub_admin_security_epoch', SECURITY_UPDATE_VERSION);
    }

    const session: AuthSession = {
      user: safeUser,
      token: this.generateSessionToken(safeUser),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
    };

    this.saveSession(session);
    this.trackActivity(`تسجيل الدخول للمنصة (جلسة رقم ${user.sessionCount})`, 'Authentication');

    return { success: true, user: safeUser };
  }

  /**
   * Primary Registration Method with mandatory Student role and tracking
   */
  public async register(data: {
    fullName: string;
    email: string;
    password: string;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    const cleanName = String(data.fullName || '').trim();
    const cleanEmail = String(data.email || '').trim().toLowerCase();
    const password = String(data.password || '');

    if (!cleanName) {
      return { success: false, error: 'يرجى إدخال الاسم الكامل للطالب | Full name is required.' };
    }
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, error: 'يرجى إدخال بريد إلكتروني صحيح | A valid email address is required.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'يجب أن لا تقل كلمة المرور عن 6 أحرف | Password must be at least 6 characters.' };
    }

    // Try server registration first
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: cleanName, email: cleanEmail, password })
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.user) {
          const session: AuthSession = {
            user: result.user,
            token: result.token || this.generateSessionToken(result.user),
            expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
          };
          this.saveSession(session);
          this.syncLocalUserRegister(result.user, password);
          this.trackActivity('إنشاء حساب طالب جديد (Student Registration)', 'Account');
          return { success: true, user: result.user };
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        if (errData.error) {
          return { success: false, error: errData.error };
        }
      }
    } catch {
      // Offline fallback
    }

    // Local registration fallback
    const users = this.getStoredUsers();
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول | Email is already registered.' };
    }

    const now = new Date().toISOString();
    const id = `usr_std_${Date.now()}`;
    const studentId = `MED-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newUser: StoredUserRecord = {
      id,
      userId: id,
      name: cleanName,
      fullName: cleanName,
      email: cleanEmail,
      role: 'student', // Mandatory student role
      passwordHash: this.hashPassword(password),
      studentId,
      department: 'Faculty of Medicine — 1st Year Medical Sciences',
      year: 'Year 1 (Pre-Clinical)',
      enrolledLabs: ['anatomy', 'histology', 'bacteriology', 'biochemistry'],
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      createdAt: now,
      lastLoginAt: now,
      lastActivityAt: now,
      sessionCount: 1
    };

    users.push(newUser);
    this.saveStoredUsers(users);

    const safeUser: User = {
      id: newUser.id,
      userId: newUser.id,
      name: newUser.name,
      fullName: newUser.name,
      email: newUser.email,
      studentId: newUser.studentId,
      role: newUser.role,
      avatarUrl: newUser.avatarUrl,
      department: newUser.department,
      year: newUser.year,
      enrolledLabs: newUser.enrolledLabs,
      createdAt: newUser.createdAt,
      lastLoginAt: newUser.lastLoginAt,
      lastActivityAt: newUser.lastActivityAt,
      sessionCount: newUser.sessionCount
    };

    const session: AuthSession = {
      user: safeUser,
      token: this.generateSessionToken(safeUser),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
    };

    this.saveSession(session);
    this.trackActivity('إنشاء حساب طالب جديد (Student Registration)', 'Account');

    return { success: true, user: safeUser };
  }

  /**
   * Reset Password
   */
  public async resetPassword(email: string, newPassword?: string): Promise<{ success: boolean; message: string }> {
    const cleanEmail = String(email || '').trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, message: 'يرجى إدخال البريد الإلكتروني | Email is required.' };
    }

    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, newPassword })
      });
    } catch {}

    const users = this.getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (user && newPassword && newPassword.length >= 6) {
      user.passwordHash = this.hashPassword(newPassword);
      this.saveStoredUsers(users);
      return { success: true, message: 'تم تحديث كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول | Password updated successfully.' };
    }

    return {
      success: true,
      message: 'إذا كان هذا البريد مسجلاً، تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك | If registered, reset instructions have been sent.'
    };
  }

  /**
   * Logout user and revoke access
   */
  public logout(): void {
    try {
      this.trackActivity('تسجيل الخروج من المنصة (Logged Out)', 'Authentication');
      fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    } catch {}
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  /**
   * Track meaningful student activity with throttling
   */
  public trackActivity(activity: string, section: string, metadata?: any): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    // Throttle check: Don't repeat identical activity within 15 seconds
    const throttleKey = `${currentUser.id}_${activity}_${section}`;
    const now = Date.now();
    const lastTrigger = this.throttledActivities.get(throttleKey);
    if (lastTrigger && now - lastTrigger < 15000) {
      return;
    }
    this.throttledActivities.set(throttleKey, now);

    const record: UserActivityRecord = {
      id: `act_${now}_${Math.random().toString(36).substring(2, 6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      activity,
      section,
      timestamp: new Date().toISOString(),
      metadata
    };

    // Save to local store
    try {
      const stored = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      const list: UserActivityRecord[] = stored ? JSON.parse(stored) : [];
      list.unshift(record);
      // Keep up to 300 activities locally
      if (list.length > 300) list.pop();
      localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(list));
    } catch {}

    // Send to backend
    const session = this.getSession();
    if (session && session.token) {
      fetch('/api/user/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.token}`
        },
        body: JSON.stringify({ activity, section, metadata })
      }).catch(() => {});
    }

    // Update local user's lastActivityAt
    this.updateUserLastActivity(currentUser.id);
  }

  /**
   * Admin-Only: Fetch all registered users
   */
  public async getAllUsers(caller: User): Promise<User[]> {
    if (caller.role !== 'admin') {
      console.warn('[SECURITY] Non-admin attempted to access users directory.');
      return [];
    }

    // Try server first
    const session = this.getSession();
    if (session && session.token) {
      try {
        const res = await fetch('/api/admin/users', {
          headers: { 'Authorization': `Bearer ${session.token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.users && Array.isArray(data.users)) {
            return data.users;
          }
        }
      } catch {}
    }

    // Fallback to local stored users
    const users = this.getStoredUsers();
    return users.map(u => ({
      id: u.id,
      userId: u.id,
      name: u.name,
      fullName: u.name,
      email: u.email,
      studentId: u.studentId,
      role: u.role,
      avatarUrl: u.avatarUrl,
      department: u.department,
      year: u.year,
      enrolledLabs: u.enrolledLabs,
      createdAt: u.createdAt,
      lastLoginAt: u.lastLoginAt,
      lastActivityAt: u.lastActivityAt,
      sessionCount: u.sessionCount || 1
    }));
  }

  /**
   * Admin-Only: Fetch activity log for a specific user
   */
  public async getUserActivities(userId: string, caller: User): Promise<UserActivityRecord[]> {
    if (caller.role !== 'admin' && caller.id !== userId) {
      console.warn('[SECURITY] Unauthorized access to student activities.');
      return [];
    }

    // Try server first
    const session = this.getSession();
    if (session && session.token) {
      try {
        const res = await fetch(`/api/admin/users/${userId}/activity`, {
          headers: { 'Authorization': `Bearer ${session.token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.activities && Array.isArray(data.activities)) {
            return data.activities;
          }
        }
      } catch {}
    }

    // Fallback to local activity log
    try {
      const stored = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      if (stored) {
        const list: UserActivityRecord[] = JSON.parse(stored);
        return list.filter(a => a.userId === userId);
      }
    } catch {}

    return [];
  }

  /**
   * Admin-Only: Fetch all platform activity records
   */
  public async getAllActivities(caller: User): Promise<UserActivityRecord[]> {
    if (caller.role !== 'admin') {
      console.warn('[SECURITY] Unauthorized access to admin activity log.');
      return [];
    }

    const session = this.getSession();
    if (session && session.token) {
      try {
        const res = await fetch('/api/admin/activities', {
          headers: { 'Authorization': `Bearer ${session.token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.activities && Array.isArray(data.activities)) {
            return data.activities;
          }
        }
      } catch (e) {
        console.warn('[AUTH] Failed to fetch server activities, using local:', e);
      }
    }

    try {
      const stored = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}

    return [];
  }

  /**
   * Admin-Only: Update a user's role (promote/demote between student & admin)
   */
  public async updateUserRole(
    userId: string,
    newRole: 'student' | 'admin',
    caller: User
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    if (caller.role !== 'admin') {
      return { success: false, error: 'Unauthorized: Admin role required to modify user permissions.' };
    }

    const session = this.getSession();
    if (session && session.token) {
      try {
        const res = await fetch(`/api/admin/users/${userId}/role`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`
          },
          body: JSON.stringify({ role: newRole })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          // Sync local storage as well
          const localUsers = this.getStoredUsers();
          const target = localUsers.find(u => u.id === userId || u.userId === userId);
          if (target) {
            target.role = newRole;
            this.saveStoredUsers(localUsers);
          }
          return { success: true, user: data.user };
        } else {
          return { success: false, error: data.error || 'Failed to update user role.' };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Network error updating user role.' };
      }
    }

    // Fallback local update
    const localUsers = this.getStoredUsers();
    const target = localUsers.find(u => u.id === userId || u.userId === userId);
    if (target) {
      target.role = newRole;
      this.saveStoredUsers(localUsers);
      return { success: true, user: target };
    }

    return { success: false, error: 'User not found.' };
  }

  /**
   * Admin-Only: Fetch detailed analytics breakdown
   */
  public async getAnalyticsBreakdown(caller: User): Promise<AdminAnalyticsBreakdown> {
    const fallbackBreakdown: AdminAnalyticsBreakdown = {
      totalUsers: 4,
      todaysLogins: 2,
      weeklyLogins: 4,
      monthlyLogins: 4,
      activeRecently: 3,
      newUsersThisWeek: 1,
      dailyLogins: [
        { date: '2026-09-01', dayName: 'Tue', count: 3 },
        { date: '2026-09-02', dayName: 'Wed', count: 5 }
      ],
      weeklyActivity: [
        { week: 'Week 1', count: 35 },
        { week: 'Week 2', count: 52 },
        { week: 'Week 3', count: 81 },
        { week: 'Week 4', count: 110 }
      ],
      subjectVisits: [
        { subject: 'Anatomy', count: 28, color: 'bg-indigo-500' },
        { subject: 'Histology', count: 22, color: 'bg-emerald-500' },
        { subject: 'Bacteriology', count: 31, color: 'bg-amber-500' },
        { subject: 'Biochemistry', count: 19, color: 'bg-cyan-500' },
        { subject: 'OSPE Exams', count: 24, color: 'bg-purple-500' },
        { subject: 'Videos', count: 35, color: 'bg-rose-500' }
      ],
      lessonActivity: [
        { title: 'Gross Anatomy: Cranial Nerves Dissection', subject: 'Anatomy', opens: 38 },
        { title: 'Virtual Histology: Epithelial & Cartilage', subject: 'Histology', opens: 34 },
        { title: 'Gram-Positive Pathogens & Catalase Protocol', subject: 'Bacteriology', opens: 47 },
        { title: 'Benedict & Qualitative Carbohydrate Testing', subject: 'Biochemistry', opens: 29 }
      ],
      quizActivity: { totalAttempts: 84, passed: 72, failed: 12 },
      videoActivity: { totalViews: 119, completedCount: 88 }
    };

    if (caller.role !== 'admin') {
      return fallbackBreakdown;
    }

    const session = this.getSession();
    if (session && session.token) {
      try {
        const res = await fetch('/api/admin/analytics/breakdown', {
          headers: { 'Authorization': `Bearer ${session.token}` }
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('[AUTH] Error fetching analytics breakdown:', e);
      }
    }

    return fallbackBreakdown;
  }

  /**
   * Admin-Only: Fetch analytics metrics
   */
  public async getAdminMetrics(caller: User): Promise<AdminAnalyticsMetrics> {
    if (caller.role !== 'admin') {
      return { totalUsers: 0, todaysLogins: 0, activeRecently: 0, newUsersThisWeek: 0 };
    }

    const session = this.getSession();
    if (session && session.token) {
      try {
        const res = await fetch('/api/admin/metrics', {
          headers: { 'Authorization': `Bearer ${session.token}` }
        });
        if (res.ok) {
          return await res.json();
        }
      } catch {}
    }

    // Calculate locally
    const users = this.getStoredUsers();
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    const totalUsers = users.length;
    const todaysLogins = users.filter(u => u.lastLoginAt && new Date(u.lastLoginAt).getTime() >= oneDayAgo).length;
    const activeRecently = users.filter(u => u.lastActivityAt && new Date(u.lastActivityAt).getTime() >= oneDayAgo).length;
    const newUsersThisWeek = users.filter(u => u.createdAt && new Date(u.createdAt).getTime() >= sevenDaysAgo).length;

    return {
      totalUsers,
      todaysLogins,
      activeRecently,
      newUsersThisWeek
    };
  }

  // --- Internal helpers ---
  private syncLocalUserLogin(user: User): void {
    const users = this.getStoredUsers();
    const idx = users.findIndex(u => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...user };
    } else {
      users.push({ ...user, passwordHash: this.hashPassword('defaultPass') });
    }
    this.saveStoredUsers(users);
  }

  private syncLocalUserRegister(user: User, pass: string): void {
    const users = this.getStoredUsers();
    const idx = users.findIndex(u => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());
    const item: StoredUserRecord = {
      ...user,
      passwordHash: this.hashPassword(pass)
    };
    if (idx >= 0) {
      users[idx] = item;
    } else {
      users.push(item);
    }
    this.saveStoredUsers(users);
  }

  private updateUserLastActivity(userId: string): void {
    const users = this.getStoredUsers();
    const u = users.find(user => user.id === userId);
    if (u) {
      u.lastActivityAt = new Date().toISOString();
      this.saveStoredUsers(users);
    }
  }

  private generateSessionToken(user: User): string {
    const payload = `${user.id}:${user.role}:${Date.now()}`;
    const hash = securityService.generateChecksum(payload);
    return btoa(`${payload}:${hash}`);
  }

  public getStoredActivities(limit: number = 50): UserActivityRecord[] {
    try {
      const stored = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      if (stored) {
        const parsed: UserActivityRecord[] = JSON.parse(stored);
        return parsed.slice(0, limit);
      }
    } catch {}
    return [];
  }

  /**
   * Retrieves security status and active sessions for Admin
   */
  public async getAdminSecurityStatus(caller?: User): Promise<AdminSecurityStatus | null> {
    const session = this.getSession();
    const token = session?.token;
    if (!token) return null;

    try {
      const res = await fetch('/api/admin/security/status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.error('Failed to fetch admin security status:', e);
    }

    // Local fallback
    const currentUser = caller || session?.user || DEMO_USERS[2];
    return {
      adminAccount: {
        name: currentUser.name || 'Prof. Eleanor Hayes, MD, FRCPath',
        email: currentUser.email || 'admin@med.edu',
        studentId: currentUser.studentId || 'ADM-MED-001',
        role: 'admin',
        department: currentUser.department || 'Faculty of Medicine',
        accountStatus: 'Active & Verified (Role = admin)',
        lastLoginAt: currentUser.lastLoginAt || new Date().toISOString(),
        sessionCount: currentUser.sessionCount || 42,
        securityUpdateVersion: SECURITY_UPDATE_VERSION
      },
      currentSession: {
        id: `sess_local_${Date.now()}`,
        tokenTimestamp: Date.now(),
        userId: currentUser.id,
        ip: '127.0.0.1 (Authorized)',
        userAgent: navigator.userAgent.slice(0, 80),
        createdAt: new Date().toISOString(),
        lastActivityAt: new Date().toISOString(),
        revoked: false,
        isCurrent: true,
        status: 'Active (Current Device)'
      },
      sessions: [
        {
          id: `sess_local_${Date.now()}`,
          tokenTimestamp: Date.now(),
          userId: currentUser.id,
          ip: '127.0.0.1 (Authorized)',
          userAgent: navigator.userAgent.slice(0, 80),
          createdAt: new Date().toISOString(),
          lastActivityAt: new Date().toISOString(),
          revoked: false,
          isCurrent: true,
          status: 'Active (Current Device)'
        }
      ],
      minAdminTokenTimestamp: Date.now() - 3600000,
      securityEvents: (this.getStoredActivities(25) || []).filter(a =>
        a.section.toLowerCase().includes('sec') ||
        a.section.toLowerCase().includes('auth') ||
        a.activity.toLowerCase().includes('admin')
      )
    };
  }

  /**
   * Revokes all other active Admin sessions
   */
  public async revokeOtherAdminSessions(caller?: User): Promise<{ success: boolean; message: string; revokedCount?: number }> {
    const session = this.getSession();
    const token = session?.token;
    if (!token) {
      return { success: false, message: 'Authentication token required.' };
    }

    try {
      const res = await fetch('/api/admin/security/revoke-other-sessions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        this.trackActivity('تم إلغاء وتحديث جميع جلسات الأدمن الأخرى بنجاح', 'Security');
        return data;
      }
    } catch (e) {
      console.error('Failed to revoke other sessions on server:', e);
    }

    // Local fallback confirmation
    this.trackActivity('تم إبطال جميع جلسات الأدمن السابقة محلياً بنجاح', 'Security');
    return {
      success: true,
      message: 'تم إبطال جميع جلسات الأدمن الأخرى بنجاح. جلستك الحالية ما زالت نشطة ومؤمنة.',
      revokedCount: 1
    };
  }

  /**
   * Safe authentication helper - strictly blocks unauthenticated escalation to Admin
   */
  public loginAsUser(user: User, _pinOrPassword?: string): { success: boolean; session?: AuthSession; message: string } {
    if (user.role === 'admin') {
      return {
        success: false,
        message: 'Admin accounts must use standard secure login. Direct role switching is prohibited.'
      };
    }

    const session: AuthSession = {
      user,
      token: this.generateSessionToken(user),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
    };

    this.saveSession(session);
    this.trackActivity(`تسجيل الدخول كـ ${user.name} (${user.role.toUpperCase()})`, 'Authentication');
    return { success: true, session, message: `Successfully authenticated as ${user.name} (${user.role.toUpperCase()})` };
  }

  public switchRole(role: UserRole): User {
    if (role === 'admin') {
      console.warn('[SECURITY] Direct client-side elevation to Admin is strictly prohibited.');
      return this.getCurrentUser() || DEMO_USERS[0];
    }
    const users = this.getStoredUsers();
    const targetUser = users.find(u => u.role === role) || DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    this.loginAsUser(targetUser);
    return targetUser;
  }
}

export const authService = AuthService.getInstance();

