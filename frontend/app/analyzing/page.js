import AnalyzingPageView from "../../components/AnalyzingPageView";

export const metadata = {
  title: "Analyzing Style",
  description:
    "VastraAI is analyzing your uploaded photo and styling preferences to generate personalized outfit recommendations.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyzingPage() {
  return <AnalyzingPageView />;
}
