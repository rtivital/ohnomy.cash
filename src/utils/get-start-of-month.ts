const START_OF_MONTH = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

export default function getStartOfMonth(date?: string | Date) {
  const startOfMonth = date ? new Date(date) : START_OF_MONTH;
  startOfMonth.setHours(23);
  return startOfMonth;
}
