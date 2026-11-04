import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { fetchApi, isList, isSchedules } from '../src/lib/api.mjs';
import sanitizeHtml from 'sanitize-html';
const originalFetch = globalThis.fetch;
const originalBase = process.env.NEXT_PUBLIC_BASE_URL;
afterEach(() => { globalThis.fetch = originalFetch; if (originalBase === undefined) delete process.env.NEXT_PUBLIC_BASE_URL; else process.env.NEXT_PUBLIC_BASE_URL = originalBase; });
test('API rejects HTTP errors instead of presenting empty availability', async () => {
 process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com';
 globalThis.fetch = async () => new Response('{"error":"unavailable"}', {status: 503});
 await assert.rejects(fetchApi('/api/packages', isList), /temporarily unavailable/);
});
test('API rejects malformed data', async () => {
 process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com';
 globalThis.fetch = async () => Response.json({error: 'invalid'});
 await assert.rejects(fetchApi('/api/packages', isList), /invalid data/);
});
test('API accepts empty and populated lists', async () => {
 process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com';
 globalThis.fetch = async () => Response.json([{id: 1}]);
 assert.deepEqual(await fetchApi('/api/packages', isList), [{id: 1}]);
 assert.equal(isList([]), true);
});
test('schedule validation rejects non-array months and missing times', () => {
 assert.equal(isSchedules({November: 'invalid'}), false);
 assert.equal(isSchedules({November: [{id: 1}]}), false);
 assert.equal(isSchedules({November: [{depart_date:'2026-11-04',return_date:'2026-11-04',depart_time:'09:00:00',return_time:'15:00:00'}]}), true);
});
test('rich descriptions remove executable HTML but retain formatting', () => {
 const clean = sanitizeHtml('<strong>Trip</strong><img src=x onerror=alert(1)><script>alert(1)</script><a href="javascript:alert(1)">link</a>');
 assert.ok(clean.includes('<strong>Trip</strong>'));
 assert.doesNotMatch(clean, /script|onerror|<img/);
});

test('consultation submission uses the verified endpoint and reports backend failures', async () => {
 const { default: postPackageInfo } = await import('../src/lib/postPacageInfo.js');
 process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com';
 let captured;
 globalThis.fetch = async (url, options) => { captured = {url: String(url), options}; return Response.json({success: true}); };
 assert.deepEqual(await postPackageInfo({name: 'Test'}), {success: true});
 assert.equal(captured.url, 'https://example.com/api/tour-consultations');
 assert.equal(captured.options.method, 'POST');
 assert.equal(captured.options.cache, 'no-store');
 assert.deepEqual(JSON.parse(captured.options.body), {name: 'Test'});
 globalThis.fetch = async () => new Response('', {status: 422});
 await assert.rejects(postPackageInfo({}), /temporarily unavailable/);
});
test('empty backend schedules normalize to an empty month map', async () => {
 const { default: getSchedules } = await import('../src/lib/getSchedules.js');
 process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com';
 globalThis.fetch = async () => Response.json([]);
 assert.deepEqual(await getSchedules(819), {});
});
