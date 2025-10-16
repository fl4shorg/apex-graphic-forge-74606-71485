import { useState, useEffect } from "react";
import { z } from "zod";
import { Header } from "@/components/banner/Header";
import { ControlPanel } from "@/components/banner/ControlPanel";
import { PreviewPanel } from "@/components/banner/PreviewPanel";
import { TechBackground } from "@/components/banner/TechBackground";

// Schema de validação para parâmetros da URL
const urlParamsSchema = z.object({
  name: z.string().max(50).nullish(),
  speed: z.string().max(10).nullish(),
  label: z.string().max(30).nullish(),
  system: z.string().max(30).nullish(),
  datetime: z.string().max(50).nullish(),
  wallpaper: z.string().url().max(500).nullish(),
  avatar: z.string().url().max(500).nullish(),
});

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
  const [autoGenerate, setAutoGenerate] = useState(false);

  // Carregar parâmetros da URL ao montar o componente
  useEffect(() => {
    // Ler parâmetros do hash para funcionar com HashRouter
    const hash = window.location.hash;
    console.log("Full hash:", hash);
    const searchParams = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');
    console.log("SearchParams:", searchParams.toString());
    
    const params = {
      name: searchParams.get("name"),
      speed: searchParams.get("speed"),
      label: searchParams.get("label"),
      system: searchParams.get("system"),
      datetime: searchParams.get("datetime"),
      wallpaper: searchParams.get("wallpaper"),
      avatar: searchParams.get("avatar"),
    };

    console.log("URL Params:", params);

    // Validar parâmetros
    const validation = urlParamsSchema.safeParse(params);
    
    if (validation.success) {
      const validParams = validation.data;
      const hasParams = Object.values(params).some(v => v !== null);
      
      console.log("Has params:", hasParams, "Valid params:", validParams);
      
      setBannerConfig((prev) => ({
        ...prev,
        ...(validParams.name && { name: validParams.name }),
        ...(validParams.speed && { speed: validParams.speed }),
        ...(validParams.label && { label: validParams.label }),
        ...(validParams.system && { system: validParams.system }),
        ...(validParams.datetime && { datetime: validParams.datetime }),
        ...(validParams.wallpaper && { wallpaper: validParams.wallpaper }),
        ...(validParams.avatar && { avatar: validParams.avatar }),
      }));
      
      // Se tiver parâmetros, auto-gerar após carregar
      if (hasParams) {
        console.log("Setting autoGenerate to true");
        setAutoGenerate(true);
      }
    } else {
      console.error("Validation error:", validation.error);
    }
  }, []);

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
              autoGenerate={autoGenerate}
              setAutoGenerate={setAutoGenerate}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
