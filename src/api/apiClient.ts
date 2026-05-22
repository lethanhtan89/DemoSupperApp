export async function apiGet<T>(url: string): Promise<T> {
  console.log('[ApiClient] GET', url);

  await new Promise(resolve =>
    setTimeout(() => {
      resolve(null);
    }, 700),
  );

  throw new Error('Demo backend is not ready');
}
