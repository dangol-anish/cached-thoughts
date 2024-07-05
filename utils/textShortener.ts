export function highlightShortener(highlight: string, length: number) {
  const words = highlight.split(" ");
  if (words.length > length) {
    return words.slice(0, length).join(" ") + "...";
  }
  return highlight;
}
