import { Globe, Shield, Zap, Clipboard, Link, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "Share your links worldwide with localized tracking",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Your data and links are protected with top-notch security",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant URL shortening and redirection for optimal performance",
  },
  {
    icon: Clipboard,
    title: "Easy to Use",
    description: "Shorten URLs with just a click",
  },
  {
    icon: Link,
    title: "Custom Links",
    description: "Create branded short links",
  },
  {
    icon: BarChart2,
    title: "Detailed Analytics",
    description: "Track clicks and engagement",
  },
];

export default function Features() {
  return (
    <div className="my-16">
      <h3 className="text-3xl font-bold mb-8 text-center">
        Why Choose ClipIt?
      </h3>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6"
          >
            <feature.icon className="w-8 h-8 mb-4 text-blue-400" />
            <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

