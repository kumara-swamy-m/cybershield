import { supabase } from "../supabaseClient";

export default function SignOutButton() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error.message);
    } else {
      alert("Signed out successfully!");
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition text-white font-semibold"
    >
      Sign Out
    </button>
  );
}
