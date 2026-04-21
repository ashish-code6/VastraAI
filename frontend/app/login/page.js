import AuthFormView from "../../components/AuthFormView";

export const metadata = {
  title: "Login",
  description:
    "Log in to VastraAI to access your personal style dashboard, saved looks, and AI-powered outfit recommendations.",
};

export default function LoginPage() {
  return <AuthFormView mode="login" />;
}
