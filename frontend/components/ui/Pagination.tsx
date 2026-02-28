import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  baseUrl: string;
};

export const Pagination = ({ page, totalPages, baseUrl }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center py-10">
      <div className="inline-flex items-center overflow-hidden rounded-xl border border-border/70 bg-card shadow-[0_10px_24px_hsl(var(--foreground)/0.08)]">
        {page > 1 && (
          <Link
            href={`${baseUrl}?page=${page - 1}`}
            className="px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-muted focus:z-20 focus:outline-none"
          >
            &laquo;
          </Link>
        )}

        {pages.map((currentPage) => (
          <Link
            key={currentPage}
            className={`${page === currentPage ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"} px-4 py-2.5 text-sm font-semibold transition-colors focus:z-20 focus:outline-none`}
            href={`${baseUrl}?page=${currentPage}`}
          >
            {currentPage}
          </Link>
        ))}

        {page < totalPages && (
          <Link
            href={`${baseUrl}?page=${page + 1}`}
            className="px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-muted focus:z-20 focus:outline-none"
          >
            &raquo;
          </Link>
        )}
      </div>
    </nav>
  );
};
