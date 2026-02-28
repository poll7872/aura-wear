import { TransactionFilter } from "@/components/transactions/TransactionFilter";
import { Heading } from "@/components/ui/Heading";
import { getSalesByDate } from "@/src/api";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { format } from "date-fns";

export default async function SalesPage() {
  const queryClient = new QueryClient();

  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");
  await queryClient.prefetchQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  });

  return (
    <>
      <Heading>Ventas</Heading>
      <p className="mb-6 rounded-xl border border-border/70 bg-muted/25 px-4 py-3 text-base font-medium text-muted-foreground">
        En está sección aparecerán las ventas, utiliza el calendario para
        filtrar por fecha
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionFilter />
      </HydrationBoundary>
    </>
  );
}
