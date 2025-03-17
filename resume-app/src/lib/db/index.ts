// For server-side operations, use the server.ts file
export { db } from './server';

// For client-side/Edge Runtime operations, use the API layer
import { query } from './api';

export const edgeDb = {
  async query<T = unknown>(sql: string, params?: unknown[]): Promise<T> {
    return query<T>('query', { sql, params });
  },
  async execute<T = unknown>(sql: string, params?: unknown[]): Promise<T> {
    return query<T>('execute', { sql, params });
  }
};