export default function isDateSelected(value: Date | string, date: Date | string) {
  const parsedValue = new Date(value);
  const parsedDate = new Date(date);

  return (
    parsedValue.getFullYear() === parsedDate.getFullYear() &&
    parsedValue.getMonth() === parsedDate.getMonth()
  );
}
