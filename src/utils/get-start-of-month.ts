export default function getStartOfMonth(date?: string | Date) {
  const parsed = date ? new Date(date) : new Date();
  return new Date(parsed.getFullYear(), parsed.getMonth(), 2);
}
