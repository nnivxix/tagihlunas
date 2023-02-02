import { ref } from "vue";
import { supabase } from "@/helpers/supabase";
import { Register, SignIn } from "@/interfaces/Form";

export const user = ref();
export default function useAuthUser() {
  const userLogin = async ({email, password}: SignIn ) => {
    const { data, error } = await supabase
    .auth.signInWithPassword({
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
  const userRegister = async ({email, password, name}: Register) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    if (error == null){
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