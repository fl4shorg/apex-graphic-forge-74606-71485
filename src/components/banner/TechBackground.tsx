export const TechBackground = () => {
  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-[hsl(var(--bg-primary))] via-[hsl(225_18%_8%)] to-[hsl(var(--bg-primary))] -z-10" />
      
      <div className="fixed inset-0 grid-tech opacity-20 -z-10" />
      
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="absolute top-[10%] left-[10%] w-24 h-24 rounded-full border-2 border-[hsl(var(--neon-cyan))]/20 animate-[float_20s_infinite_linear]" />
        <div className="absolute top-[60%] right-[10%] w-36 h-36 rounded-full border-2 border-[hsl(var(--neon-cyan))]/20 animate-[float_25s_infinite_linear] animation-delay-1000" />
        <div className="absolute bottom-[10%] left-[20%] w-20 h-20 rounded-full border-2 border-[hsl(var(--neon-purple))]/20 animate-[float_18s_infinite_linear] animation-delay-2000" />
        <div className="absolute top-[30%] right-[25%] w-28 h-28 rounded-full border-2 border-[hsl(var(--neon-cyan))]/20 animate-[float_22s_infinite_linear] animation-delay-3000" />
      </div>
      
      <div className="fixed inset-0 bg-gradient-radial from-[hsl(var(--neon-cyan))]/5 via-transparent to-transparent opacity-40 -z-10" />
    </>
  );
};
