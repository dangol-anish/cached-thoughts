import { Angry, Frown, Laugh, Meh, Smile } from "lucide-react";

export function moodConverter(mood: string) {
  switch (mood) {
    case "angry":
      return <Angry />;
      break;
    case "frown":
      return <Frown />;
      break;
    case "meh":
      return <Meh />;
      break;
    case "smile":
      return <Smile />;
      break;
    case "laugh":
      return <Laugh />;
      break;
  }
}
