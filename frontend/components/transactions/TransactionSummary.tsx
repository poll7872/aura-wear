import { Transaction } from "@/src/schemas";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";

export default function TransactionSummary({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <>
      <div className="mb-6 rounded-2xl border border-border/70 bg-card text-sm font-medium text-muted-foreground shadow-[0_12px_30px_hsl(var(--foreground)/0.1)]">
        <p className="rounded-t-2xl border-b border-border/70 bg-muted/35 p-3 text-xs font-black uppercase tracking-[0.12em] text-foreground">
          ID:{transaction.id}
        </p>
        <ul
          role="list"
          className="divide-y divide-border/70 border-b border-border/70"
        >
          {transaction.contents.map((item) => (
            <li
              key={item.id}
              className="p-4 transition-colors duration-200 hover:bg-muted/20 sm:p-5"
            >
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-border/70 bg-muted/25 shadow-sm sm:h-28 sm:w-28">
                  <Image
                    src={getImagePath(item.product.image)}
                    alt={`Imagen del producto ${item.product.name}`}
                    className="absolute object-cover"
                    fill
                    unoptimized
                  />
                </div>
                <div className="flex-auto space-y-1">
                  <h3 className="text-base font-bold text-foreground">
                    {item.product.name}
                  </h3>
                  <p className="text-lg font-black text-foreground">
                    {formatCurrency(+item.price)}
                  </p>
                  <p className="text-sm font-semibold text-muted-foreground">
                    Cantidad: {item.quantity}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <dl className="space-y-4 p-5 text-sm font-medium text-muted-foreground">
          {transaction.coupon && (
            <>
              <div className="flex justify-between">
                <dt>Cupón Utilizado</dt>
                <dd className="font-semibold text-foreground">
                  {transaction.coupon}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt>Descuento</dt>
                <dd className="font-bold text-constructive">
                  - {formatCurrency(+transaction.discount!)}
                </dd>
              </div>
            </>
          )}

          <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/25 px-3 py-2.5">
            <dt className="text-base font-black text-foreground">Total</dt>
            <dd className="text-lg font-black text-primary">
              {formatCurrency(+transaction.total)}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
