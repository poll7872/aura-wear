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
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-10">
        <div className="flex justify-center md:justify-start">
          <Logo />
        </div>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 overflow-x-auto pb-1">
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category.id} className="min-w-0">
                  <Link
                    href={`/${category.id}`}
                    className="inline-flex touch-manipulation items-center px-1 py-2 text-base font-semibold tracking-wide text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="max-w-36 truncate">{category.name}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li>
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground">
                  Loading categories...
                </span>
              </li>
            )}
            <Link
              href={"/admin/sales"}
              className="rounded bg-primary font-bold py-2 px-10"
            >
              Panel de administración
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};
