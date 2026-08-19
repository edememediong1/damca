import type { AcademyProgram, ContactInquiry, Project, RoadmapWeek, SiteMediaConfig, StudentRegistration, Testimonial } from './types';

export interface PublicContent {
  projects: Project[];
  programs: AcademyProgram[];
  testimonials: Testimonial[];
  roadmap: RoadmapWeek[];
  mediaConfig: SiteMediaConfig;
}

export interface AdminContent extends PublicContent {
  contacts: ContactInquiry[];
  students: StudentRegistration[];
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: 'same-origin',
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || `Request failed (${response.status})`);
  return body as T;
}

export const api = {
  publicContent: () => request<PublicContent>('/api/content'),
  adminContent: () => request<AdminContent>('/api/admin/data'),
  login: (email: string, password: string) => request<{ ok: true }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => request<{ ok: true }>('/api/auth/logout', { method: 'POST' }),
  save: <K extends keyof AdminContent>(key: K, value: AdminContent[K]) =>
    request<{ ok: true }>(`/api/admin/data/${key}`, { method: 'PUT', body: JSON.stringify(value) }),
  reset: () => request<AdminContent>('/api/admin/reset', { method: 'POST' }),
  contact: (value: Omit<ContactInquiry, 'id' | 'date' | 'status'>) =>
    request<{ ok: true; id: string }>('/api/contact', { method: 'POST', body: JSON.stringify(value) }),
  enroll: (value: Pick<StudentRegistration, 'fullName' | 'email' | 'phone' | 'programId' | 'programTitle' | 'paymentPreference' | 'tuitionAmount'>) =>
    request<{ ok: true; id: string }>('/api/enroll', { method: 'POST', body: JSON.stringify(value) }),
};
