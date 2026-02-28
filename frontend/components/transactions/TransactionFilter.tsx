"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getSalesByDate } from "@/src/api";
import TransactionSummary from "./TransactionSummary";
import { formatCurrency } from "@/src/utils";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const TransactionFilter = () => {
  const [date, setDate] = useState<Value>(new Date());
  const formattedDate = format(date?.toString() || new Date(), "yyyy-MM-dd");
  const { data, isLoading } = useQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  });

  const total =
    data?.reduce((total, transaction) => total + +transaction.total, 0) ?? 0;

  return (
    <div className="relative mt-10 space-y-5">
      <div className="rounded-2xl border border-border/70 bg-card/80 px-4 py-3 shadow-[0_10px_24px_hsl(var(--foreground)/0.08)]">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Fecha seleccionada
        </p>
        <p className="text-lg font-black text-foreground">{formattedDate}</p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <div className="lg:sticky lg:top-10">
          <div className="rounded-2xl border border-border/70 bg-card/90 p-4 shadow-[0_14px_34px_hsl(var(--foreground)/0.1)]">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Selecciona fecha
            </p>
            <div className="overflow-hidden rounded-xl border border-border/70 bg-background p-2">
              <Calendar
                value={date}
                onChange={setDate}
                className="text-black rounded-md"
                locale="es-ES"
                tileClassName={({ view }) =>
                  view === "month" ? "py-2 text-sm" : "text-sm"
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-muted/20 px-4 py-2.5">
            <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Ventas del día
            </p>
          </div>
          {isLoading && (
            <p className="rounded-xl border border-border/70 bg-muted/25 px-4 py-6 text-center text-base font-semibold text-muted-foreground">
              Cargando...
            </p>
          )}
          {data ? (
            data.length ? (
              data.map((transaction) => (
                <TransactionSummary
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            ) : (
              <p className="rounded-xl border border-dashed border-border/80 bg-muted/20 px-4 py-8 text-center text-base font-semibold text-muted-foreground">
                No hay ventas en está fecha
              </p>
            )
          ) : null}

          <p className="my-5 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-right text-lg font-black text-foreground">
            Total del día:{" "}
            <span className="text-primary">{formatCurrency(total)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
