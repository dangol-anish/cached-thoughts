export function highlightShortener(highlight: string) {
  const words = highlight.split(" ");
  if (words.length > 20) {
    return words.slice(0, 10).join(" ") + "...";
  }
  return highlight;
}
