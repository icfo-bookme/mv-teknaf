import { fetchApi, isRecord } from './api.mjs';
export default async function postPackageInfo(packageData) {
  return fetchApi('/api/tour-consultations', isRecord, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(packageData), cache: 'no-store', next: undefined,
  });
}
