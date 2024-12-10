import { Scissors, Share2, PieChart } from "lucide-react";

export default function Working() {
  return (
    <div className="my-16 bg-emerald-800/50 backdrop-blur-sm rounded-lg p-8">
      <h3 className="text-2xl font-bold mb-6 text-center">How It Works</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Scissors,
            title: "Shorten",
            description:
              "Paste your long URL and click 'Shorten Now' to generate a compact link instantly",
          },
          {
            icon: Share2,
            title: "Share",
            description:
              "Copy your new short URL and share it across any platform or medium",
          },
          {
            icon: PieChart,
            title: "Analyze",
            description:
              "Track your link's performance with detailed click analytics and insights",
          },
        ].map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-amber-500 rounded-full p-4 mb-4">
              <step.icon className="w-8 h-8 text-emerald-900" />
            </div>
            <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
            <p className="text-emerald-100">{step.description}</p>
            {index < 2 && (
              <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                <svg
                  className="w-6 h-6 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
