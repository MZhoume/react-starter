export default function normalizePort(
  value: string | number,
  defaultPort = 3000
): number {
  const port = typeof value === 'string' ? parseInt(value, 10) : value;

  if (Number.isNaN(port)) {
    return defaultPort;
  }
  return port > 0 && port < 65536 ? port : defaultPort;
}
