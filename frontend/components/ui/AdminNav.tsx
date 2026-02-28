import Link from "next/link";
import { Logo } from "./Logo";

export const AdminNav = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          <Logo />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link
            href={"/admin/products"}
            className="whitespace-nowrap rounded-full border border-border/80 bg-muted/35 px-4 py-2 text-sm font-bold uppercase tracking-wide text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            Productos
          </Link>

          <Link
            href={"/admin/sales"}
            className="whitespace-nowrap rounded-full border border-border/80 bg-muted/35 px-4 py-2 text-sm font-bold uppercase tracking-wide text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            Ventas
          </Link>

          <Link
            href={"/"}
            className="whitespace-nowrap rounded-full border border-primary/35 bg-primary px-5 py-2 text-sm font-black uppercase tracking-[0.1em] text-primary-foreground shadow-[0_10px_24px_hsl(var(--primary)/0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_14px_30px_hsl(var(--primary)/0.42)]"
          >
            Tienda
          </Link>
        </div>
      </div>
    </header>
  );
};
