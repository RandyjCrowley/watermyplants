import { supabase } from '$lib/supabaseClient'
import type { Actions, ServerLoad } from '@sveltejs/kit'



export const load: ServerLoad = async () => {
	const { data, error } = await supabase.from("users").select();
	if (error) {
		console.error("Error fetching users:", error);
	}
	return {
		users: data ?? []
	};
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData()
		console.log(formData)

		return { success: true }
	}


}
