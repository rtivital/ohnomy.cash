export default function getYearsData() {
  return Array(new Date().getFullYear() + 2 - 2020)
    .fill(0)
    .map((_, year) => ({
      label: (2020 + year).toString(),
      value: (2020 + year).toString(),
    }));
}
