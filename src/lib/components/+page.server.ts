import type { Actions } from '@sveltejs/kit'
export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData()
		console.log(formData)
		
		return {success: true}
	}


}
