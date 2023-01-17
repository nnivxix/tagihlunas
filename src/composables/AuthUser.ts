import { ref } from "vue";
import { supabase } from "@/services/supabase";
import { SignIn } from "@/interfaces/Form";

export const user = ref();
export default function useAuthUser() {
  const userLogin = async ({email, password}: SignIn ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error == null){
      return data;
    } else {
      return error;
    }
  };
  const userLogout = async () => {
    await supabase.auth.signOut();
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