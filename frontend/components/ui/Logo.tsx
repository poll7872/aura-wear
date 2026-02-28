export const Logo = () => {
  return (
    <div className="inline-flex items-center gap-2.5 sm:gap-3">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-[11px] font-black text-primary shadow-[0_8px_18px_hsl(var(--primary)/0.25)] sm:h-10 sm:w-10 sm:text-sm">
        AW
      </span>
      <h1 className="text-2xl font-black uppercase tracking-[0.16em] sm:text-3xl">
        <span className="animate-aura-glow text-foreground">Aura</span>
        <span className="ml-1 bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
          Wear
        </span>
      </h1>
    </div>
  );
};
