export async function fetchApi(path, validate, options = {}) {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (!base) throw new Error('The booking service is not configured. Please call us for assistance.');
  const response = await fetch(new URL(path, base), {
    next: { revalidate: 0 }, signal: AbortSignal.timeout(10000), ...options,
  });
  if (!response.ok) throw new Error('The booking service is temporarily unavailable. Please try again or call us.');
  const data = response.status === 204 ? {} : await response.json();
  if (!validate(data)) throw new Error('The booking service returned invalid data. Please try again later.');
  return data;
}
export const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
export const isList = value => Array.isArray(value) && value.every(isRecord);
export const isSchedules = value => isRecord(value) && Object.values(value).every(items => isList(items) && items.every(item => ['depart_date', 'return_date', 'depart_time', 'return_time'].every(key => typeof item[key] === 'string')));
