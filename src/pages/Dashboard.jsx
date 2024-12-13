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
    <div className="flex flex-col gap-8">
      {(loadingUrls || loadingClicks) && (
        <div className="flex items-center justify-center h-20">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold">My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          value={searchQuery}
          placeholder="Search Links"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
        {errorUrls && <Error message={errorUrls.message} />}
        {errorClicks && <Error message={errorClicks.message} />}
      </div>
      <ul>
        {(filteredUrls || []).map((url) => {
          return (
            <LinkCard
              key={url.id}
              url={url}
              fetchUrls={fnGetUrls}
              userId={user?.id}
            />
          );
        })}
      </ul>
    </div>
  );
}
