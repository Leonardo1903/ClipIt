import supabase, { supabaseUrl } from "@/lib/config";
import { UAParser } from "ua-parser-js";

const parser = new UAParser();

export const dbService = {
  // Urls
  getUrls: async (user_id) => {
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

  getUrl: async (id, user_id) => {
    try {
      const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("id", id)
        .eq("user_id", user_id)
        .single();
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

  getLongUrl: async (id) => {
    try {
      let { data: shortLinkData, error: shortLinkError } = await supabase
        .from("urls")
        .select("id, original_url")
        .or(`short_url.eq.${id},custom_url.eq.${id},id.eq.${id}`)
        .single();

      if (shortLinkError && shortLinkError.code !== "PGRST116") {
        return;
      }

      return shortLinkData;
    } catch (error) {
      console.error("Error in getLongUrl", error);
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

  storeClicks: async (id, original_url) => {
    try {
      const res = parser.getResult();
      const device = res.device.type || "Desktop";
      const response = await fetch("https://ipapi.co/json");
      const { city, country_name: country } = await response.json();

      await supabase.from("clicks").insert([
        {
          url_id: id,
          device,
          city,
          country,
        },
      ]);

      window.location.href = original_url;
    } catch (error) {
      console.error("Error in storeClicks", error);
      throw error;
    }
  },

  getClicksForUrl: async (url_id) => {
    try {
      const { data, error } = await supabase
        .from("clicks")
        .select("*")
        .eq("url_id", url_id);

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error in getClicksForUrl", error);
      throw error;
    }
  },
};
