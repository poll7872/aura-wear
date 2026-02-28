import { CategoriesReponseSchema } from "@/src/schemas";
import { Logo } from "./Logo";
import Link from "next/link";

async function getCategories() {
  try {
    const url = `${process.env.API_URL}/categories`;
    const req = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!req.ok) {
      return [];
    }

    const json = await req.json();
    return CategoriesReponseSchema.parse(json);
  } catch {
    return [];
  }
}

export const MainNav = async () => {
  const categories = await getCategories();
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center md:justify-between">
          <Logo />
          <Link
            href={"/admin/sales"}
            className="hidden rounded-full border border-primary/40 bg-primary px-5 py-2 text-sm font-black uppercase tracking-[0.1em] text-primary-foreground shadow-[0_10px_24px_hsl(var(--primary)/0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_14px_30px_hsl(var(--primary)/0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:inline-flex"
          >
            Panel admin
          </Link>
        </div>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category.id} className="min-w-0 shrink-0">
                  <Link
                    href={`/${category.id}`}
                    className="inline-flex touch-manipulation items-center whitespace-nowrap rounded-full border border-transparent bg-muted/50 px-4 py-2 text-sm font-semibold tracking-wide text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-background hover:text-foreground hover:shadow-[0_8px_18px_hsl(var(--foreground)/0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="max-w-36 truncate">{category.name}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li>
                <span className="inline-flex items-center rounded-full border border-dashed border-border px-4 py-2 text-sm font-medium text-muted-foreground">
                  Loading categories...
                </span>
              </li>
            )}
            <li className="md:hidden">
              <Link
                href={"/admin/sales"}
                className="inline-flex shrink-0 rounded-full border border-primary/40 bg-primary px-4 py-2 text-sm font-black uppercase tracking-wide text-primary-foreground shadow-[0_8px_20px_hsl(var(--primary)/0.32)]"
              >
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
