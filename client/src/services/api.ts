import axios from 'axios';

export const SERVER_ORIGIN = import.meta.env.VITE_SERVER_ORIGIN || 'http://localhost:5000';

export type UploadedFileMeta = {
    originalName: string;
    mimeType: string;
    size: number;
    fileId: string;
};

export type TeamMember = {
    name: string;
    email: string;
    phone: string;
};

export type Registration = {
    _id: string;
    createdAt: string;
    updatedAt: string;
    fullName: string;
    email: string;
    phone: string;
    yearOfStudy: string;
    members: TeamMember[];
    preferredProblem: string;
    pptFile?: UploadedFileMeta;
    facultyScore?: number;
    guestScore?: number;
};

export type RegisterTeamPayload = Omit<Registration, '_id' | 'createdAt' | 'updatedAt'>;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerTeam = async (formData: RegisterTeamPayload | FormData) => {
    try {
        const isMultipart = typeof FormData !== 'undefined' && formData instanceof FormData;
        const response = await api.post('/register-team', formData, isMultipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined);
        return response.data as { message: string; registration: Registration };
    } catch (error) {
        console.error('API Error registering team:', error);
        throw error;
    }
};

const ADMIN_KEY_STORAGE = 'hackathon_admin_key';

export function setAdminKey(key: string) {
    localStorage.setItem(ADMIN_KEY_STORAGE, key);
}

export function getAdminKey() {
    return localStorage.getItem(ADMIN_KEY_STORAGE) || '';
}

function adminHeaders() {
    const key = getAdminKey();
    return {
        'x-admin-key': key,
    };
}

export async function adminGetStats() {
    const response = await api.get('/admin/stats', { headers: adminHeaders() });
    return response.data as { total: number; facultyReviewed: number; guestReviewed: number };
}

export async function adminListRegistrations(params: { page?: number; limit?: number; q?: string }) {
    const response = await api.get('/admin/registrations', { params, headers: adminHeaders() });
    return response.data as {
        items: Registration[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export async function adminDeleteRegistration(id: string) {
    const response = await api.delete(`/admin/registrations/${id}`, { headers: adminHeaders() });
    return response.data as { ok: boolean };
}

export async function adminUpdateScores(id: string, scores: { facultyScore: number; guestScore: number }) {
    const response = await api.patch(`/admin/registrations/${id}/scores`, scores, { headers: adminHeaders() });
    return response.data as { ok: boolean };
}

export default api;
