import express from 'express';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INITIAL_PROJECTS, INITIAL_PROGRAMS, TESTIMONIALS_DATA, INITIAL_ROADMAP, INITIAL_MEDIA_CONFIG } from './src/data/mockData';
import type { ContactInquiry, StudentRegistration } from './src/types';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8787);
const production = process.env.NODE_ENV === 'production';
const supabaseUrl = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || '';
const secretKey = process.env.SUPABASE_SECRET_KEY || '';
const adminEmails = new Set((process.env.ADMIN_EMAILS || '').split(',').map(v => v.trim().toLowerCase()).filter(Boolean));
if (!supabaseUrl || !publishableKey || !secretKey || !adminEmails.size) throw new Error('Configure SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_SECRET_KEY, and ADMIN_EMAILS.');

const defaults = { projects: INITIAL_PROJECTS, programs: INITIAL_PROGRAMS, testimonials: TESTIMONIALS_DATA, roadmap: INITIAL_ROADMAP, mediaConfig: INITIAL_MEDIA_CONFIG };
type ContentKey = keyof typeof defaults;
const contentKeys = Object.keys(defaults) as ContentKey[];
const serviceHeaders = { apikey: secretKey, 'Content-Type': 'application/json' };
async function sb<T>(route: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${supabaseUrl}${route}`, { ...init, headers: { ...serviceHeaders, ...init.headers } });
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(body?.message || body?.error_description || `Supabase request failed (${response.status})`);
  return body as T;
}
async function content() {
  const rows = await sb<Array<{ key: ContentKey; value: unknown }>>('/rest/v1/site_content?select=key,value');
  const result: any = { ...defaults };
  for (const row of rows) result[row.key] = row.value;
  if (rows.length < contentKeys.length) {
    const found = new Set(rows.map(r => r.key));
    const missing = contentKeys.filter(key => !found.has(key)).map(key => ({ key, value: defaults[key] }));
    await sb('/rest/v1/site_content?on_conflict=key', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(missing) });
  }
  return result as typeof defaults;
}
const fromContact = (r: any): ContactInquiry => ({ id: r.id, name: r.name, email: r.email, phone: r.phone || '', company: r.company, budget: r.budget || '', projectType: r.project_type || '', description: r.description, status: r.status, notes: r.notes || '', date: r.created_at });
const toContact = (r: ContactInquiry) => ({ id: r.id, name: r.name, email: r.email, phone: r.phone || null, company: r.company, budget: r.budget, project_type: r.projectType, description: r.description, status: r.status, notes: r.notes || null, created_at: r.date });
const fromStudent = (r: any): StudentRegistration => ({ id: r.id, fullName: r.full_name, email: r.email, phone: r.phone, programId: r.program_id, programTitle: r.program_title, paymentPreference: r.payment_preference, enrollmentStatus: r.enrollment_status, registeredDate: String(r.created_at).slice(0, 10), progressPercentage: r.progress_percentage, assignedMentor: r.assigned_mentor || '', showreelUrl: r.showreel_url || '', notes: r.notes || '', tuitionAmount: r.tuition_amount || '' });
const toStudent = (r: StudentRegistration) => ({ id: r.id, full_name: r.fullName, email: r.email, phone: r.phone, program_id: r.programId, program_title: r.programTitle, payment_preference: r.paymentPreference, enrollment_status: r.enrollmentStatus, progress_percentage: r.progressPercentage, assigned_mentor: r.assignedMentor || null, showreel_url: r.showreelUrl || null, notes: r.notes || null, tuition_amount: r.tuitionAmount, created_at: r.registeredDate });

const app = express(); app.disable('x-powered-by'); app.use(express.json({ limit: '1mb' }));
app.use((_req, res, next) => { res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin'); next(); });
const attempts = new Map<string, { count: number; reset: number }>();
function limited(req: express.Request, res: express.Response, next: express.NextFunction) { const key = req.ip || 'unknown', now = Date.now(), old = attempts.get(key); if (!old || old.reset < now) attempts.set(key, { count: 1, reset: now + 900_000 }); else if (++old.count > 15) return res.status(429).json({ error: 'Too many attempts. Try again later.' }); next(); }
const cookies = (req: express.Request) => Object.fromEntries((req.headers.cookie || '').split(';').filter(Boolean).map(v => { const [k, ...x] = v.trim().split('='); return [k, decodeURIComponent(x.join('='))]; }));
async function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) { try { const token = cookies(req).damca_session; if (!token) return res.status(401).json({ error: 'Authentication required.' }); const response = await fetch(`${supabaseUrl}/auth/v1/user`, { headers: { apikey: publishableKey, Authorization: `Bearer ${token}` } }); const user: any = await response.json(); if (!response.ok || !adminEmails.has(String(user.email).toLowerCase())) return res.status(401).json({ error: 'Authentication required.' }); (req as any).admin = user; next(); } catch (e) { next(e); } }
const clean = (v: unknown, max = 500) => typeof v === 'string' ? v.trim().slice(0, max) : '';
const validEmail = (v: unknown) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(v, 254));

app.get('/api/content', async (_req, res, next) => { try { res.json(await content()); } catch (e) { next(e); } });
app.post('/api/auth/login', limited, async (req, res, next) => { try { const email = clean(req.body?.email, 254).toLowerCase(); if (!adminEmails.has(email)) return res.status(401).json({ error: 'Invalid credentials.' }); const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { apikey: publishableKey, 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: req.body?.password }) }); const auth: any = await response.json(); if (!response.ok) return res.status(401).json({ error: 'Invalid credentials.' }); res.setHeader('Set-Cookie', `damca_session=${encodeURIComponent(auth.access_token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${auth.expires_in || 3600}${production ? '; Secure' : ''}`); res.json({ ok: true }); } catch (e) { next(e); } });
app.post('/api/auth/logout', (_req, res) => { res.setHeader('Set-Cookie', 'damca_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0'); res.json({ ok: true }); });
app.get('/api/admin/data', requireAdmin, async (_req, res, next) => { try { const [base, contacts, students] = await Promise.all([content(), sb<any[]>('/rest/v1/contacts?select=*&order=created_at.desc'), sb<any[]>('/rest/v1/students?select=*&order=created_at.desc')]); res.json({ ...base, contacts: contacts.map(fromContact), students: students.map(fromStudent) }); } catch (e) { next(e); } });
app.put('/api/admin/data/:key', requireAdmin, async (req, res, next) => { try { const key = req.params.key; if (contentKeys.includes(key as ContentKey)) await sb('/rest/v1/site_content?on_conflict=key', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ key, value: req.body, updated_at: new Date().toISOString() }) }); else if (key === 'contacts' || key === 'students') { if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Expected an array.' }); const table = key, mapped = key === 'contacts' ? req.body.map(toContact) : req.body.map(toStudent); if (mapped.length) await sb(`/rest/v1/${table}?on_conflict=id`, { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(mapped) }); const ids = mapped.map((v: any) => v.id).filter(Boolean); await sb(`/rest/v1/${table}${ids.length ? `?id=not.in.(${ids.join(',')})` : '?id=not.is.null'}`, { method: 'DELETE', headers: { Prefer: 'return=minimal' } }); } else return res.status(404).json({ error: 'Unknown collection.' }); res.json({ ok: true }); } catch (e) { next(e); } });
app.post('/api/admin/reset', requireAdmin, async (_req, res, next) => { try { await sb('/rest/v1/site_content?on_conflict=key', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(contentKeys.map(key => ({ key, value: defaults[key] }))) }); await Promise.all([sb('/rest/v1/contacts?id=not.is.null', { method: 'DELETE' }), sb('/rest/v1/students?id=not.is.null', { method: 'DELETE' })]); res.json({ ...defaults, contacts: [], students: [] }); } catch (e) { next(e); } });
app.post('/api/contact', limited, async (req, res, next) => { try { if (!clean(req.body?.name,100) || !validEmail(req.body?.email) || !clean(req.body?.description,4000)) return res.status(400).json({ error: 'Name, valid email, and project description are required.' }); const id = crypto.randomUUID(); await sb('/rest/v1/contacts', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ id, name: clean(req.body.name,100), email: clean(req.body.email,254), phone: clean(req.body.phone,40) || null, company: clean(req.body.company,150) || 'Direct Client', budget: clean(req.body.budget,100), project_type: clean(req.body.projectType,100), description: clean(req.body.description,4000) }) }); res.status(201).json({ ok: true, id }); } catch (e) { next(e); } });
app.post('/api/enroll', limited, async (req, res, next) => { try { if (!clean(req.body?.fullName,100) || !validEmail(req.body?.email) || !clean(req.body?.phone,40)) return res.status(400).json({ error: 'Name, valid email, and phone are required.' }); const id = crypto.randomUUID(); await sb('/rest/v1/students', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ id, full_name: clean(req.body.fullName,100), email: clean(req.body.email,254), phone: clean(req.body.phone,40), program_id: clean(req.body.programId,100), program_title: clean(req.body.programTitle,150), payment_preference: ['paid','installment','scholarship'].includes(req.body.paymentPreference) ? req.body.paymentPreference : 'pending', tuition_amount: clean(req.body.tuitionAmount,50) }) }); res.status(201).json({ ok: true, id }); } catch (e) { next(e); } });
if (production) { app.use(express.static(path.join(root, 'dist'))); app.get('*', (_req, res) => res.sendFile(path.join(root, 'dist', 'index.html'))); }
app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => { console.error(error); res.status(500).json({ error: 'Database request failed.' }); });
if (!process.env.NETLIFY) app.listen(port, () => console.log(`DAMCA Supabase server listening on http://localhost:${port}`));

export default app;
