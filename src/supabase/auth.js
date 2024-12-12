import supabase, { supabaseUrl } from "@/lib/config";

export const authService = {
  loginUser: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error in loginUser", error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const { data: session, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      if (!session.session) {
        return null;
      }
      return session.session?.user;
    } catch (error) {
      console.error("Error in getCurrentUser", error);
      throw error;
    }
  },

  registerUser: async (name, email, password, profile_pic) => {
    try {
      const fileName = `dp_${name.split(" ").join("_")}-${Math.random()}`;
      const { error: storageError } = await supabase.storage
        .from("profile_pic")
        .upload(fileName, profile_pic);

      if (storageError) {
        throw new Error(storageError.message);
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error("Error in registerUser", error);
      throw error;
    }
  },

  logoutUser: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error in logoutUser", error);
    }
  },
};
