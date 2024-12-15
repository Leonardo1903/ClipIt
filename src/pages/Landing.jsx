import { Hero, Working, Example, Features, FAQ } from "@/components";
export default function Landing() {
  return (
    <main className="container mx-auto px-4 py-16">
      <Hero />
      <Features />
      <Working />
      <Example />
      <FAQ />
    </main>
  );
}
