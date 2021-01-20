export default function isSameMonth(date: Date, compared: Date) {
  return date.getMonth() === compared.getMonth() && date.getFullYear() === compared.getFullYear();
}
