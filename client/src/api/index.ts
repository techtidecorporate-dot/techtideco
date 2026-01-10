import axios from 'axios';
export * from "@/types";
import { User, TeamMember, BlogPost, Service, JobApplication, ContactMessage } from '@/types';


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
  create: (data: Partial<BlogPost>) => api.post('/blogs', data),
  update: (id: string, data: Partial<BlogPost>) => api.put(`/blogs/${id}`, data),
  delete: (id: string) => api.delete(`/blogs/${id}`),
};

export const serviceAPI = {
  getAll: () => api.get<Service[]>('/services'),
  create: (data: Partial<Service>) => api.post('/services', data),
  update: (id: string, data: Partial<Service>) => api.put(`/services/${id}`, data),
  delete: (id: string) => api.delete(`/services/${id}`),
};

export const jobAPI = {
  getAll: () => api.get<JobApplication[]>('/jobs'),
  create: (data: any) => api.post('/jobs', data),
  updateStatus: (id: string, status: string) => api.put(`/jobs/${id}`, { status }),
  delete: (id: string) => api.delete(`/jobs/${id}`),
};

export const contactAPI = {
  getAll: () => api.get<ContactMessage[]>('/contacts'),
  create: (data: any) => api.post('/contacts', data),
  updateStatus: (id: string, status: string) => api.put(`/contacts/${id}`, { status }),
  delete: (id: string) => api.delete(`/contacts/${id}`),
};

export { api };
export default api;
