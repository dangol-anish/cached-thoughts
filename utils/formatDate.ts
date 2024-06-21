export function formatDate(input: string): string {
  // Create a new Date object from the input string
  const date = new Date(input);

  // Get day, month, and year from the date object
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getUTCFullYear();

  // Return the formatted string
  return `${day} ${month} ${year}`;
}
