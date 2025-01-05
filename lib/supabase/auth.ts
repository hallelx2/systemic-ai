import { supabase } from "./supabaseClient";

const signUp = async (name: string, email: string, password: string) => {
    const {data: authData, error: authError} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name
            }
        }
    })

    if (authError) {
        // If user already exists, return a specific error message
        if (authError.message.includes("Email already registered")) {
          return { success: false, message: "User already registered. Please sign in." };
        }
        throw new Error(authError.message);
      }
    if (authData.user) {
    // User has been created, but email needs verification
    return { success: true, message: "Please check your email for a verification link." };
    }

      throw new Error("Unknown error during sign-up");
    };
}
