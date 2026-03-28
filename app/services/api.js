import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Patients API
export const patientsAPI = {
  getAll: () => apiClient.get('/patients'),
  create: (data) => apiClient.post('/patients', data),
  update: (id, data) => apiClient.put(`/patients/${id}`, data),
  delete: (id) => apiClient.delete(`/patients/${id}`),
  get: (id) => apiClient.get(`/patients/${id}`),
};

// Calls API
export const callsAPI = {
  getAll: () => apiClient.get('/calls'),
  get: (id) => apiClient.get(`/calls/${id}`),
  create: (data) => apiClient.post('/calls', data),
  update: (id, data) => apiClient.put(`/calls/${id}`, data),
  startCall: (patientId) => apiClient.post(`/call/start/${patientId}`),
  endCall: (callId) => apiClient.post(`/calls/${callId}/end`),
};

// Health check
export const healthCheck = () => apiClient.get('/health');

export default apiClient;
