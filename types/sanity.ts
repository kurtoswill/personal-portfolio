export interface Technology {
  _id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other';
  color: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  image?: SanityImage;
  link?: string;
  featured?: boolean;
  techStack?: Technology[];
  createdDate: string;
}

export interface Competition {
  _id: string;
  competitionName: string;
  position: string;
  teamName?: string;
  projectName: string;
  description: string;
  competitionDate: string;
  myRole: string;
  link?: string;
}

export interface Certification {
  _id: string;
  certificationName: string;
  description: string;
  dateAcquired: string;
  link?: string;
}

export interface Experience {
  _id: string;
  jobTitle: string;
  company: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  keyAchievements?: string[];
  techStack?: Technology[];
  companyWebsite?: string;
}