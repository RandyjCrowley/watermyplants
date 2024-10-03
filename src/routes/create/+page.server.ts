import { supabase } from '$lib/supabaseClient'
import type { Actions, ServerLoad } from '@sveltejs/kit'

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData()
		console.log(formData)

		return { success: true }
	}


}
