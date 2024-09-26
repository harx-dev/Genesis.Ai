import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import KeyFeature from "@/components/KeyFeature";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <main className="flex-1">
        <Hero />
        <KeyFeature/>
        <Footer/>
      </main>
    </div>
  );
}
