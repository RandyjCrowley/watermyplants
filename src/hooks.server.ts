import { supabase } from '$lib/supabaseClient';
import { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');
	event.locals.supabase = supabase;
	return resolve(event);
};
