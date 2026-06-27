export function ErrorFallback({ message }: { message: string }) {
  if (!message) return null;
  return <div className="error-fallback">{message}</div>;
}
