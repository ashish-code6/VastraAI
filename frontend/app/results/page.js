import ResultsPageView from "../../components/ResultsPageView";

export const metadata = {
  title: "Style Results",
  description:
    "Browse AI-picked outfit recommendations from VastraAI with trusted explanations, price ranges, and shopping actions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResultsPage() {
  return <ResultsPageView />;
}
