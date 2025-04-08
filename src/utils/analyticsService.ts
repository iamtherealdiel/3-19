import { supabase } from "../lib/supabase";

async function getYoutubeChannelInfos(youtubeUrls: string[]) {
  try {
    const { data, error } = await supabase.functions.invoke("get statistics", {
      body: { youtubeUrls },
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching YouTube channel info:", error);
    throw error;
  }
}
