import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent } from "@/components/ui/card";
import { Clipboard } from "lucide-react";

export default function Hero() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
      setShortUrl("");
    }
  };
  return (
    <>
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
          Shorten, Share, <span className="text-lime-400">Simplify</span>
        </h2>
        <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
          ClipIt: The ultimate URL shortener for streamlined sharing and
          powerful analytics.
        </p>
      </div>

      <Card className="w-full max-w-3xl mx-auto bg-emerald-800/50 backdrop-blur-md border-none shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleShorten} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="Enter your long URL"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="flex-1 bg-emerald-700/50 border-none text-gray-100 placeholder-emerald-200"
              />
              <Button
                type="submit"
                className="bg-lime-500 hover:bg-lime-600 text-zinc-900"
              >
                Shorten Now
              </Button>
            </div>
            {shortUrl && (
              <div className="mt-4 p-4 bg-emerald-700/50 rounded-md flex items-center justify-between">
                <span className="text-amber-400">{shortUrl}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-lime-400 hover:text-lime-300"
                  onClick={() => navigator.clipboard.writeText(shortUrl)}
                >
                  <Clipboard className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </>
  );
}
