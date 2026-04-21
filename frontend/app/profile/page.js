import ProfilePageView from "../../components/ProfilePageView";
import RequireAuth from "../../components/RequireAuth";

export const metadata = {
  title: "Profile",
  description:
    "Manage your VastraAI account, styling preferences, and personal fashion history from your profile.",
};

export default function ProfilePage() {
  return (
    <RequireAuth redirectTo="/login?next=/profile">
      <ProfilePageView />
    </RequireAuth>
  );
}
