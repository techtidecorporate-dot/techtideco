import axios from 'axios';
export * from "@/types";
import { User, TeamMember, BlogPost, Service, JobPosition, JobApplication, ContactMessage } from '@/types';


const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (credentials: any) => api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
  getProfile: () => api.get<User>('/auth/profile'),
  getUsers: () => api.get<User[]>('/auth/users'),
  createUser: (userData: any) => api.post('/auth/users', userData),
  deleteUser: (id: string) => api.delete(`/auth/users/${id}`),
};

export const teamAPI = {
  getAll: () => api.get<TeamMember[]>('/teams'),
  create: (data: FormData | Partial<TeamMember>) => api.post('/teams', data),
  update: (id: string, data: FormData | Partial<TeamMember>) => api.put(`/teams/${id}`, data),
  delete: (id: string) => api.delete(`/teams/${id}`),
};


export const blogAPI = {
  getAll: () => api.get<BlogPost[]>('/blogs'),
  create: (data: FormData | Partial<BlogPost>) => api.post('/blogs', data),
  update: (id: string, data: FormData | Partial<BlogPost>) => api.put(`/blogs/${id}`, data),
  delete: (id: string) => api.delete(`/blogs/${id}`),
};

export const serviceAPI = {
  getAll: () => api.get<Service[]>('/services'),
  getBySlug: (slug: string) => api.get<Service>(`/services/${slug}`),
  create: (data: FormData | Partial<Service>) => api.post('/services', data),
  update: (id: string, data: FormData | Partial<Service>) => api.put(`/services/${id}`, data),
  delete: (id: string) => api.delete(`/services/${id}`),
};

export const jobPositionAPI = {
  getActive: () => api.get<JobPosition[]>('/job-positions'),
  getAll: () => api.get<JobPosition[]>('/job-positions/all'),
  create: (data: Partial<JobPosition>) => api.post('/job-positions', data),
  update: (id: string, data: Partial<JobPosition>) => api.put(`/job-positions/${id}`, data),
  delete: (id: string) => api.delete(`/job-positions/${id}`),
};

export const jobAPI = {
  getAll: () => api.get<JobApplication[]>('/jobs'),
  create: (data: FormData) => api.post('/jobs', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  updateStatus: (id: string, status: string) => api.put(`/jobs/${id}`, { status }),
  delete: (id: string) => api.delete(`/jobs/${id}`),
};

export const contactAPI = {
  getAll: () => api.get<ContactMessage[]>('/contacts'),
  create: (data: any) => api.post('/contacts', data),
  updateStatus: (id: string, status: string) => api.put(`/contacts/${id}`, { status }),
  delete: (id: string) => api.delete(`/contacts/${id}`),
};

export const partnerAPI = {
  getAll: () => api.get('/partners'),
  create: (data: any) => api.post('/partners', data),
};

export { api };
export default api;
