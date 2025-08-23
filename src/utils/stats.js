// src/utils/stats.js
import { supabase } from "../supabaseClient";

/**
 * Change a metadata counter by delta (+1 / -1).
 * metaKey: 'reports_count' | 'scans_count' | 'quizzes_count'
 * Returns the new value.
 */
export async function changeStat(metaKey, delta) {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  const currentUser = data?.user;
  if (!currentUser) throw new Error("Not signed in");

  const current = currentUser.user_metadata?.[metaKey] ?? 0;
  const next = Math.max(0, current + delta);

  const { error: updateError } = await supabase.auth.updateUser({
    data: { [metaKey]: next },
  });
  if (updateError) throw updateError;

  return next;
}

export const incrementReports = () => changeStat("reports_count", +1);
export const decrementReports = () => changeStat("reports_count", -1);
export const incrementScans   = () => changeStat("scans_count", +1);
export const decrementScans   = () => changeStat("scans_count", -1);
export const incrementQuizzes = () => changeStat("quizzes_count", +1);
export const decrementQuizzes = () => changeStat("quizzes_count", -1);
