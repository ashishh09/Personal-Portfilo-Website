export type ProjectCategory = 'All' | 'Java' | 'Web' | 'AI/ML' | 'Cybersecurity' | 'Robotics';

export interface Project {
  id: string;
  title: string;
  categories: ('Java' | 'Web' | 'AI/ML' | 'Cybersecurity' | 'Robotics')[];
  technologies: string[];
  description: string;
  keyFeatures: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  isFeatured?: boolean;
}

export interface SkillItem {
  name: string;
  status?: 'proficient' | 'learning' | 'basic';
  iconName?: string;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  score: string;
  scoreLabel: string;
  highlights: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  category: 'Programming' | 'Web' | 'Job Simulation';
  year?: string;
}

export interface StoredResume {
  fileName: string;
  fileSize: number;
  uploadDate: string;
  dataUrl?: string; // Base64 data URL for instant download
  isCustom: boolean;
}
