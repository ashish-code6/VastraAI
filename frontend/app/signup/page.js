import AuthFormView from "../../components/AuthFormView";

export const metadata = {
  title: "Sign Up",
  description:
    "Create a VastraAI account to save looks, take the style quiz, and unlock AI-powered fashion recommendations.",
};

export default function SignupPage() {
  return <AuthFormView mode="signup" />;
}
