import { ref } from "vue";
import { supabase } from "@/services/supabase";
import { FormSignIn } from "@/interfaces/FormSignIn";

export const user = ref()
export default function useAuthUser() {
  const userLogin = async ({email, password}: FormSignIn ) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error;
      return data;      
    } catch (error) {
      if (error instanceof Error) {
          return error;
        }
    }
  };
  const userLogout = async () => {
    return;
  };
  const isLoggedIn = () => {
    return !!user.value;
  };

  return {
    user,
    userLogin,
    isLoggedIn,
    userLogout,
    // register,
  };
}