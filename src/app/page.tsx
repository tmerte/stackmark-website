import { Hero } from "@/components/Hero";
import { ProcessSection } from "@/components/ProcessSection";
import { FeatureStrip } from "@/components/FeatureStrip";
import { SurveyShell } from "@/components/survey/SurveyShell";

export default function Home() {
  return (
    <SurveyShell>
      <main className="min-h-screen bg-black flex flex-col items-center pt-3 pb-3 px-3 lg:px-0">
        <div className="w-full max-w-[1440px] flex flex-col">
          <Hero />
          <ProcessSection />
          <FeatureStrip />
        </div>

        <footer className="h-[80px] lg:h-[100px] flex items-center justify-center lg:justify-start lg:pl-[74px] text-gray-400 text-sm font-inter w-full max-w-[1440px]">
          © 2026 StackMark. All rights reserved.
        </footer>
      </main>
    </SurveyShell>
  );
}
