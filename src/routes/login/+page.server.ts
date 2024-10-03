import { supabase } from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: "http://localhost:5173/auth/callback",
		},
	});

	console.log(data);

	if (data?.url) {
		throw redirect(302, data.url); // Use throw to trigger the redirect in SvelteKit
	}

	if (error) {
		console.error("OAuth sign-in error:", error);
		// Handle error if necessary
	}
};

