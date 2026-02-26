import { TransactionsResponseSchema } from "./schemas";

export async function getSalesByDate(date: string) {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/api?transactionDate=${date}`;
  const req = await fetch(url);

  if (!req.ok) {
    console.error("Fetch error:", req.status, req.statusText);
    throw new Error(`Error: ${req.status}`);
  }

  const json = await req.json();

  try {
    const transactions = TransactionsResponseSchema.parse(json);
    return transactions;
  } catch (error) {
    console.error("Zod parse error:", error);
    throw error;
  }
}
