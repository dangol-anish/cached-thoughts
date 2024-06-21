export function titleShortener(highlight: string) {
  const words = highlight.split(" ");
  if (words.length > 3) {
    return words.slice(0, 3).join(" ") + "...";
  }
  return highlight;
}
