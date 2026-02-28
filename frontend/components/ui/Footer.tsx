import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border/70 bg-card/70 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground md:text-right">
            &copy; {new Date().getFullYear()} Aura Wear. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
