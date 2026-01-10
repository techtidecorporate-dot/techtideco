export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface TeamMember {
  _id: string; // Required for existing members in admin panel
  name: string;
  role: string;
  category: string;
  department: string;
  image: any; 
  skills: string[];

  description?: string;
  social?: {
    linkedin?: string;
    email?: string;
    twitter?: string;
    github?: string;
  };
}

export interface TeamCategory {
  head: TeamMember[];
  senior: TeamMember[];
  junior: TeamMember[];
  intern: TeamMember[];
}

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
  tags: string[];
  slug?: string;
  createdAt: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  color?: string;
  bgColor?: string;
}

export interface JobApplication {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  resume?: string;
  status: 'pending' | 'reviewed' | 'contacted' | 'rejected';
  createdAt: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}
