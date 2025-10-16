import { useState } from "react";
import { Header } from "@/components/banner/Header";
import { ControlPanel } from "@/components/banner/ControlPanel";
import { PreviewPanel } from "@/components/banner/PreviewPanel";
import { TechBackground } from "@/components/banner/TechBackground";

const Index = () => {
  const [bannerConfig, setBannerConfig] = useState({
    name: "NEEXT",
    speed: "999",
    label: "VELOCIDADE",
    system: "",
    datetime: "",
    wallpaper: null as string | null,
    avatar: null as string | null,
  });

  const [catboxUrl, setCatboxUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <TechBackground />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <ControlPanel
              config={bannerConfig}
              setConfig={setBannerConfig}
              catboxUrl={catboxUrl}
              setCatboxUrl={setCatboxUrl}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
            />
            
            <PreviewPanel
              config={bannerConfig}
              setCatboxUrl={setCatboxUrl}
              setIsUploading={setIsUploading}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
