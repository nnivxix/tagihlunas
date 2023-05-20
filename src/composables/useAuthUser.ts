import { ref } from "vue";
import { supabase } from "@/helpers/supabase";
import { Auth } from "@/schema";

const user = ref();
export function useAuthUser() {
  const userLogin = async ({ email, password }: Auth) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };
  const userLogout = async () => {
    await supabase.auth.signOut();
  };
  const isLoggedIn = () => {
    return !!user.value;
  };
  const userRegister = async ({ email, password, name }: Auth) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    if (error == null) {
      return data;
    } else {
      return error;
    }
  };

  return {
    user,
    userLogin,
    isLoggedIn,
    userLogout,
    userRegister,
  };
}
