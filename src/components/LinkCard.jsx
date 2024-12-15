import { Copy, Download, LinkIcon, Loader2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";
import { dbService } from "@/supabase/db";

export default function LinkCard({ url, fetchUrls, userId }) {
  const shortUrl = import.meta.env.VITE_SHORT_URL;
  const { loading: loadingDelete, fn: fnDeleteUrl } = useFetch(
    dbService.deleteUrl
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(
      shortUrl + (url?.custom_url ? url?.custom_url : url.short_url)
    );
  };

  const handleDownload = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleDelete = () => {
    fnDeleteUrl(url?.id).then(() => fetchUrls(userId));
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 border border-gray-700 p-4 bg-gray-800 rounded-lg">
      <img
        src={url?.qr}
        className="h-32 object-contain ring ring-blue-500 self-start bg-white"
        alt={url?.title}
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          {shortUrl + (url?.custom_url ? url?.custom_url : url.short_url)}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer text-gray-300">
          <LinkIcon className="p-1" />
          {url?.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1 text-gray-400">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

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
  );
}
