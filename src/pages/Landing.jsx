import { Hero, Working, Example, Features, FAQ } from "@/components";
export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <main className="container mx-auto px-4 py-16">
        <Hero />
        <Features />
        <Working />
        <Example />
        <FAQ />
      </main>
    </div>
  );
}

