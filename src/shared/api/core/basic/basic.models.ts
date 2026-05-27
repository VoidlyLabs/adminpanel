/**
 * Main types file for backend response modals
 */

export interface BasicAPIResponse<T> {
  body: T;
  error: boolean;
  message: string;
}

export interface BasicAPIPaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  items: T;
}

export interface BasicAPIPaginationRequest {
  page: number;
  limit: number;
  search_by?: string;
  search?: string;
  sort_by?: string;
  sort_direction?: 'asc' | 'desc';
}

export enum Statuses {
  'PENDING' = 'pending',
  'ACCEPTED' = 'accepted',
  'FINISHED' = 'finished',
  'ARCHIVED' = 'archived',
  'IN_PROGRESS' = 'in_progress',
  'SUBMITTED' = 'submitted',
  'COMPLETED' = 'completed',
}
