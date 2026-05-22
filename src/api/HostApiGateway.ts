export type HostApiRequest = {
  service: 'wallet' | 'booking' | 'payment' | 'user';
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
};

export async function hostApiGateway<T>(request: HostApiRequest): Promise<T> {
  console.log('[HostApiGateway] request:', request);

  await new Promise(resolve =>
    setTimeout(() => {
      resolve(null);
    }, 500),
  );

  if (request.service === 'wallet' && request.path === '/balance') {
    return {
      balance: 500000,
      currency: 'VND',
    } as T;
  }

  if (request.service === 'booking' && request.path === '/hotels') {
    return {
      hotels: [
        {
          id: 'hotel-001',
          name: 'Demo Hotel',
        },
      ],
    } as T;
  }

  return {
    success: true,
  } as T;
}
