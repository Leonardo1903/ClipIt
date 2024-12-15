import { CreateLink, Error, LinkCard } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSession } from "@/context/SesssionContext";
import useFetch from "@/hooks/useFetch";
import { dbService } from "@/supabase/db";
import { Filter, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSession();

  const {
    loading: loadingUrls,
    error: errorUrls,
    data: urls,
    fn: fnGetUrls,
  } = useFetch(dbService.getUrls);

  const {
    loading: loadingClicks,
    error: errorClicks,
    data: clicks,
    fn: fnGetClicks,
  } = useFetch(dbService.getClicks);

  useEffect(() => {
    if (user?.id) {
      fnGetUrls(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (urls?.length) {
      fnGetClicks(urls.map((url) => url.id));
    }
  }, [urls]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 bg-gray-900 text-gray-100 p-6">
      {(loadingUrls || loadingClicks) && (
        <div className="flex items-center justify-center h-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-400">Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{urls?.length || 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-400">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{clicks?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-blue-400">My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          value={searchQuery}
          placeholder="Search Links"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
        />
        <Filter className="absolute top-2 right-2 p-1 text-gray-400" />
        {errorUrls && <Error message={errorUrls.message} />}
        {errorClicks && <Error message={errorClicks.message} />}
      </div>
      <ul className="space-y-4">
        {(filteredUrls || []).map((url) => (
          <LinkCard
            key={url.id}
            url={url}
            fetchUrls={fnGetUrls}
            userId={user?.id}
          />
        ))}
      </ul>
    </div>
  );
}
