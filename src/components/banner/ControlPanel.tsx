import { Settings, Image, Type, Clock, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ControlPanelProps {
  config: {
    name: string;
    speed: string;
    label: string;
    system: string;
    datetime: string;
    wallpaper: string | null;
    avatar: string | null;
  };
  setConfig: (config: any) => void;
  catboxUrl: string | null;
  setCatboxUrl: (url: string | null) => void;
  isUploading: boolean;
  setIsUploading: (uploading: boolean) => void;
}

export const ControlPanel = ({
  config,
  setConfig,
  catboxUrl,
  setCatboxUrl,
  isUploading,
  setIsUploading,
}: ControlPanelProps) => {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "wallpaper" | "avatar"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setConfig({ ...config, [type]: result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <aside className="w-full lg:w-96 lg:sticky lg:top-24 h-fit">
      <Card className="bg-card/70 backdrop-blur-xl border-border/50 shadow-2xl">
        <CardHeader className="border-b border-border/30">
          <CardTitle className="flex items-center gap-2 text-lg orbitron text-[hsl(var(--neon-cyan))] text-glow-cyan">
            <Settings className="w-5 h-5" />
            CONTROLES DO BANNER
            <span className="ml-auto w-2 h-2 rounded-full bg-[hsl(var(--neon-green))] glow-cyan animate-pulse" />
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          {/* Visual Content Section */}
          <div className="space-y-4 p-4 rounded-xl bg-secondary/30 border border-border/30">
            <h3 className="text-sm font-semibold orbitron text-[hsl(var(--neon-cyan))] flex items-center gap-2">
              <Image className="w-4 h-4" />
              CONTEÚDO VISUAL
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="wallpaper" className="text-xs text-muted-foreground">
                  Papel de Parede
                </Label>
                <Input
                  id="wallpaper"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "wallpaper")}
                  className="mt-1 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[hsl(var(--neon-cyan))]/10 file:text-[hsl(var(--neon-cyan))] hover:file:bg-[hsl(var(--neon-cyan))]/20"
                />
              </div>
              
              <div>
                <Label htmlFor="avatar" className="text-xs text-muted-foreground">
                  Foto de Perfil
                </Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "avatar")}
                  className="mt-1 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[hsl(var(--neon-cyan))]/10 file:text-[hsl(var(--neon-cyan))] hover:file:bg-[hsl(var(--neon-cyan))]/20"
                />
              </div>
            </div>
          </div>

          {/* Text Content Section */}
          <div className="space-y-4 p-4 rounded-xl bg-secondary/30 border border-border/30">
            <h3 className="text-sm font-semibold orbitron text-[hsl(var(--neon-cyan))] flex items-center gap-2">
              <Type className="w-4 h-4" />
              CONTEÚDO DE TEXTO
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="name" className="text-xs text-muted-foreground">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  placeholder="Digite o nome"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="speed" className="text-xs text-muted-foreground">
                  Velocidade
                </Label>
                <Input
                  id="speed"
                  type="number"
                  value={config.speed}
                  onChange={(e) => setConfig({ ...config, speed: e.target.value })}
                  placeholder="Digite a velocidade"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="label" className="text-xs text-muted-foreground">
                  Rótulo Inferior
                </Label>
                <Input
                  id="label"
                  value={config.label}
                  onChange={(e) => setConfig({ ...config, label: e.target.value })}
                  placeholder="Digite o rótulo"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="system" className="text-xs text-muted-foreground">
                  Tipo de Sistema
                </Label>
                <Input
                  id="system"
                  value={config.system}
                  onChange={(e) => setConfig({ ...config, system: e.target.value })}
                  placeholder="Digite o tipo de sistema"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Date Time Section */}
          <div className="space-y-4 p-4 rounded-xl bg-secondary/30 border border-border/30">
            <h3 className="text-sm font-semibold orbitron text-[hsl(var(--neon-cyan))] flex items-center gap-2">
              <Clock className="w-4 h-4" />
              DATA E HORA
            </h3>
            
            <div>
              <Label htmlFor="datetime" className="text-xs text-muted-foreground">
                Data e Hora Personalizada
              </Label>
              <Input
                id="datetime"
                value={config.datetime}
                onChange={(e) => setConfig({ ...config, datetime: e.target.value })}
                placeholder="DD/MM/AAAA - HH:MM"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Deixe em branco para usar a data e hora atual
              </p>
            </div>
          </div>

          {/* Catbox Download */}
          {catboxUrl && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-[hsl(var(--neon-cyan))]/10 to-[hsl(var(--neon-purple))]/10 border border-[hsl(var(--neon-cyan))]/30">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-[hsl(var(--neon-cyan))] to-[hsl(var(--neon-purple))] text-black font-bold orbitron hover:opacity-90 glow-cyan"
              >
                <a href={catboxUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  BAIXAR DO CATBOX
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </aside>
  );
};
