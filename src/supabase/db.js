import supabase, { supabaseUrl } from "@/lib/config";

export const dbService = {
  // Urls
  getUrls: async (user_id) => {
    if (!user_id) {
      throw new Error("User ID is required to fetch URLs");
    }
    try {
      const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("user_id", user_id);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error in getUrls", error);
      throw error;
    }
  },

  deleteUrl: async (id) => {
    try {
      const { data, error } = await supabase.from("urls").delete().eq("id", id);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error in deleteUrl", error);
      throw error;
    }
  },

  createUrl: async (title, longUrl, user_id, customUrl, qr_code) => {
    try {
      const short_url = Math.random().toString(36).substring(2, 6);

      const fileName = `qr_${short_url}`;
      const { error: storageError } = await supabase.storage
        .from("qrs")
        .upload(fileName, qr_code);

      if (storageError) {
        throw new Error(storageError.message);
      }

      const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

      const { data, error } = await supabase
        .from("urls")
        .insert([
          {
            title,
            original_url: longUrl,
            user_id,
            custom_url: customUrl || null,
            short_url,
            qr,
          },
        ])
        .select();

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error in createUrl", error);
      throw error;
    }
  },

  // Clicks
  getClicks: async (url_ids) => {
    try {
      const { data, error } = await supabase
        .from("clicks")
        .select("*")
        .in("url_id", url_ids);

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error in getClicks", error);
      throw error;
    }
  },
};
