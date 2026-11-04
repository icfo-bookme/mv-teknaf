const remotePatterns = [
  { protocol: 'http', hostname: '127.0.0.1', pathname: '/storage/**' },
  ...['freecvbd.com', 'admin.bookme.com.bd', 'bookme.com.bd'].map(hostname => ({ protocol: 'https', hostname, pathname: '/storage/**' })),
];
if (process.env.NEXT_PUBLIC_BASE_URL) {
  const url = new URL(process.env.NEXT_PUBLIC_BASE_URL);
  remotePatterns.push({ protocol: url.protocol.slice(0, -1), hostname: url.hostname, port: url.port, pathname: '/storage/**' });
}
export default { images: { remotePatterns } };
