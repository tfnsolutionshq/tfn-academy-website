/**
 * Domain types for TFN Academy's static content.
 * These mirror the shape of the generated data in shared/constants/academyData.ts,
 * which was converted from the approved content prototype.
 */

export type ProgrammeCategory = 'software' | 'infra' | 'data' | 'creative' | 'business' | 'kids';

export interface ProgrammeModule {
  n: string;
  t: string;
}

export interface ProgrammeProject {
  k: string;
  t: string;
}

export interface ProgrammeLevel {
  kind: 'Beginner' | 'Advanced' | 'Single course';
  pre: string;
  expect: string;
  mods: ProgrammeModule[];
  projs: ProgrammeProject[];
}

export interface ProgrammeFAQ {
  'Need to know': string;
  'Able to do': string;
  'Real-world problem': string;
  'Proof project': string;
  'Career translation': string;
}

export interface Programme {
  slug: string;
  name: string;
  short: string;
  ic: string;
  cat: ProgrammeCategory;
  line: string;
  tags: string[];
  tools: string;
  certs: string[];
  fq: ProgrammeFAQ;
  levels: ProgrammeLevel[];
}

export interface ProgrammeCategoryInfo {
  id: ProgrammeCategory;
  name: string;
  ic: string;
}

export interface KidsProgramme {
  ic: string;
  t: string;
  d: string;
  tags: string[];
}

export interface StudentStory {
  n: string;
  s: string;
  p: number;
  q: string;
  r: string;
}

export interface TalentProfile {
  id: string;
  n: string;
  s: string;
  p: number;
  role: string;
  skills: string[];
  av: string;
  bio: string;
  proj: string;
}

export interface VerifyRecord {
  n: string;
  s: string;
  l: 'Beginner' | 'Advanced';
}

export type BlogBlock = ['p', string] | ['h', string] | ['ul', string[]];

export interface BlogPost {
  slug: string;
  t: string;
  cat: string;
  read: string;
  ic: string;
  v: number; // cover image variant seed
  ex: string;
  body: BlogBlock[];
}

export interface HubSpace {
  id: 'training' | 'flexi' | 'meeting';
  n: string;
  cap: number;
  ic: string;
  v: number;
  tag?: string;
  d: string;
  feat: string[];
}

export type HubPlanKey = 'h' | 'd' | 'm' | 'y';
export type HubPriceTable = Record<string, Partial<Record<HubPlanKey, number>>>;
export type HubPlanInfo = [HubPlanKey, string, string, string];
export type HubAmenity = [icon: string, title: string, description: string];

export interface CareerRole {
  id: string;
  t: string;
  dept: string;
  type: 'Full-time' | 'Part-time' | 'Volunteer';
  loc: string;
  sum: string;
  resp: string[];
  req: string[];
}

export interface Scholarship {
  id: string;
  n: string;
  pct: number;
  ic: string;
  tag?: string;
  d: string;
  req: string[];
  ask: string;
  fin: boolean;
  rule?: 'age1830' | 'female' | 'minor';
}

export interface BankDetails {
  bank: string;
  name: string;
  no: string;
}

export interface PromoCode {
  pct?: number;
  flat?: number;
  label: string;
}

export interface VideoTeaser {
  id: string;
  t: string;
  d: string;
  ic: string;
  scene?: number;
  person?: number;
}

export type CorpItem = [icon: string, title: string, description: string];
export type StepTuple = [title: string, description: string];

export interface OpenDecision {
  id: string;
  t: string;
  d: string;
}

export type FaqItem = [question: string, answer: string, odId?: string];

export type Track = Programme;


