import { redirect } from "@sveltejs/kit";

export const GET = async (event) => {
  const {
    url,
    locals: { supabase },
    cookies,
  } = event;

  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/";
  console.log(code, next);

  if (code) {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (!sessionError) {
      const { session } = sessionData;
      const { access_token, expires_in, refresh_token, user } = session;

      const userData = {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.user_metadata.name,
        fullname: user.user_metadata.full_name,
        avatar_url: user.user_metadata.avatar_url,
        username: user.user_metadata.preferred_username,
      };

      // Insert user data into the users table
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert([userData]);

      if (insertError) {
        console.error("Error inserting user data:", insertError);
        // You can choose to redirect to an error page or handle the error differently
        throw redirect(500, "/error?_=" + JSON.stringify(insertError));
      } else {
        console.log("User data inserted successfully:", insertData);
      }

      const options = { path: "/", sameSite: "strict", maxAge: expires_in };
      cookies.set("accessToken", access_token, options);
      cookies.set("refreshToken", refresh_token, {
        path: "/",
        sameSite: "strict",
      });

      throw redirect(303, `/${next.slice(1)}`);
    } else {
      console.error("Error exchanging code for session:", sessionError);
      throw redirect(500, "/error?_=" + JSON.stringify(sessionError));
    }
  }

  // return the user to an error page with instructions
  throw redirect(500, "/error?_=Unknow Server Error");
};
