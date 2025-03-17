export async function query<T = unknown>(endpoint: string, body?: unknown): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/db/${endpoint}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error('Database query failed');
  }

  return response.json();
} 