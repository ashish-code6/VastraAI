import StylePageView from "../../components/StylePageView";
import RequireAuth from "../../components/RequireAuth";

export const metadata = {
  title: "Style Quiz",
  description:
    "Take the VastraAI style quiz to share your occasion, budget, vibe, and color preferences for personalized outfit recommendations.",
};

export default function StylePage() {
  return (
    <RequireAuth redirectTo="/login?next=/style">
      <StylePageView />
    </RequireAuth>
  );
}
