import { Zap } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border/30 backdrop-blur-xl bg-card/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Zap className="w-8 h-8 text-[hsl(var(--neon-cyan))] animate-pulse" />
              <div className="absolute inset-0 blur-xl bg-[hsl(var(--neon-cyan))] opacity-50" />
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black orbitron bg-gradient-to-r from-[hsl(var(--neon-cyan))] via-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] bg-clip-text text-transparent">
                NEON BANNER GENERATOR
              </h1>
              <span className="hidden sm:inline-block px-3 py-1 text-xs font-bold orbitron bg-gradient-to-r from-[hsl(var(--neon-cyan))] to-[hsl(var(--neon-purple))] text-black rounded-full glow-cyan">
                PREMIUM PRO
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
