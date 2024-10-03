import type { Actions } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { supabase } from '$lib/supabaseClient';

export const actions: Actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const username = formData.get('username')?.toString();
        const password = formData.get('password')?.toString();
        const confirmPassword = formData.get('confirmPassword')?.toString();

        // Validate input
        if (!username || !password || !confirmPassword) {
            return { error: "All fields are required", success: false };
        }

        if (password !== confirmPassword) {
            return { error: "Passwords do not match", success: false };
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10); // 10 rounds is a good default
        const passwordHash = bcrypt.hashSync(password, salt);

        // Insert into 'users' table
        const { data, error: supabaseError } = await supabase
            .from("users")
            .insert([{ username, password_hash: passwordHash }]);

        if (supabaseError) {
            return { error: `Registration failed: ${supabaseError.message}`, success: false };
        } else {
            return { success: true, message: "Registration successful!" };
        }
    }
};

