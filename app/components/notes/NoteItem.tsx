import { useFormStatus } from "react-dom";

export function NoteItem() {
  return (
    <form>
      <NoteCard />
    </form>
  );
}

export function NoteCard() {
  const { pending } = useFormStatus();

  return <>Hello</>;
}
