import { useEffect } from "react";
import { useSession } from "@/context/SesssionContext";
import useFetch from "@/hooks/useFetch";
import { dbService } from "@/supabase/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Copy, Download, LinkIcon, Loader2, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { DeviceStats, LocationStats } from "@/components";
import { useToast } from "@/hooks/use-toast";

export default function Link() {
  const shortLink = import.meta.env.VITE_SHORT_URL;
  const { id } = useParams();
  const { user } = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { loading, data, error, fn: fnGetUrl } = useFetch(dbService.getUrl);
  const {
    loading: loadingStats,
    data: stats,
    fn: fnGetClicksforUrl,
  } = useFetch(dbService.getClicksForUrl);

  const { loading: loadingDelete, fn: fnDeleteUrl } = useFetch(
    dbService.deleteUrl
  );

  useEffect(() => {
    fnGetUrl(id, user.id);
    fnGetClicksforUrl(id);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      shortLink + (data?.custom_url ? data?.custom_url : data?.short_url)
    );
    toast({
      title: "Copied to clipboard",
      description: "The shortened URL has been copied to the clipboard",
      status: "default",
    });
  };

  const handleDownload = () => {
    const imageUrl = data?.qr;
    const fileName = data?.title;
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleDelete = () => {
    fnDeleteUrl(data?.id);
    navigate("/dashboard");
    toast({
      title: "URL Deleted",
      description: "The URL has been deleted successfully",
      variant:"default",
    });
  };

  const handleRedirect = () => {
    navigate(`/${data?.id}`);
  };

  if (error) {
    navigate("/dashboard");
    return null;
  }

  let link = "";
  if (data) {
    link = data?.custom_url ? data?.custom_url : data?.short_url;
  }

  return (
    <div className="bg-gray-900 text-gray-100 p-6">
      {(loading || loadingStats) && (
        <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
      )}

      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {data?.title}
          </span>
          <span
            onClick={handleRedirect}
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            https://ClipIt/
            {link}
          </span>
          <a
            href={`${data?.original_url}`}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer text-gray-300"
          >
            <LinkIcon className="w-6 h-6" />
            {data?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm text-gray-400">
            {new Date(data?.created_at).toLocaleString()}
          </span>
          <div>
            <Button
              variant="ghost"
              onClick={handleCopy}
              className="text-blue-400 hover:text-blue-300"
            >
              <Copy />
            </Button>
            <Button
              variant="ghost"
              onClick={handleDownload}
              className="text-blue-400 hover:text-blue-300"
            >
              <Download />
            </Button>
            <Button
              variant="ghost"
              onClick={handleDelete}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 />
              {loadingDelete && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
                  Deleting URL...
                </div>
              )}
            </Button>
          </div>
          <img
            src={data?.qr}
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain bg-white"
            alt={data?.title}
          />
        </div>

        <Card className="sm:w-3/5 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold text-blue-400">
              Stats
            </CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card className="bg-gray-700 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-blue-400">Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats?.length || 0}</p>
                </CardContent>
              </Card>

              <CardTitle className="text-blue-400">Location Data</CardTitle>
              <LocationStats stats={stats} />
              <CardTitle className="text-blue-400">Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No Statistics yet"
                : "Loading Statistics.."}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
