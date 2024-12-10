import { Hero, Working, Example, Features, FAQ } from "@/components";
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-gray-100">
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
