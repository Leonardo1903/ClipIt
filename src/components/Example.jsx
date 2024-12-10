import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <div className="my-16 bg-emerald-800/50 backdrop-blur-sm rounded-lg p-8">
      <h3 className="text-2xl font-bold mb-6 text-center">
        See ClipIt in Action
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-xl font-semibold">Original URL</h4>
          <div className="p-4 bg-emerald-700/50 rounded-md break-all">
            https://www.example.com/very-long-url-that-needs-shortening?param=value&another=param
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-xl font-semibold">Shortened URL</h4>
          <div className="p-4 bg-emerald-700/50 rounded-md flex items-center justify-between">
            <span className="text-amber-400">https://clipit.com/ab1c2d</span>
            <Button
              size="sm"
              variant="ghost"
              className="text-amber-400 hover:text-amber-300"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
