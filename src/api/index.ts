import http from '@/utils/request'

export interface User {
  id: number
  name: string
  email: string
}

export const userApi = {
  getList: (params?: Record<string, string>) => http.get<User[]>('/users', { params }),

  getById: (id: number) => http.get<User>(`/users/${id}`),

  create: (data: Omit<User, 'id'>) => http.post<User>('/users', data as Record<string, unknown>),

  update: (id: number, data: Partial<User>) =>
    http.put<User>(`/users/${id}`, data as Record<string, unknown>),

  remove: (id: number) => http.delete<void>(`/users/${id}`)
}
