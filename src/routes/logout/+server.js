import { redirect } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

export const GET = async (event) => {
  const { error } = await supabase.auth.signOut();
  console.log(error);
  // return the user to an error page with instructions
  throw redirect(303, "/");
};
