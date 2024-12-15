import useFetch from "@/hooks/useFetch";
import { dbService } from "@/supabase/db";
import { Loader2 } from 'lucide-react';
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RedirectLink() {
  const { id } = useParams();
  const { loading, data, fn: fnGetLongUrl } = useFetch(dbService.getLongUrl);

  const { loading: loadingStats, fn: fnStats } = useFetch(
    dbService.storeClicks
  );

  useEffect(() => {
    fnGetLongUrl(id);
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats(data?.id, data?.original_url);
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
      </div>
    );
  }

  return null;
}
