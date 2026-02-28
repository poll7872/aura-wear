import { formatCurrency } from "@/src/utils";

type AmountProps = {
  label: string;
  amount: number;
  discount?: boolean;
};

export const Amount = ({ label, amount, discount }: AmountProps) => {
  return (
    <div
      className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${
        discount
          ? "border border-constructive/30 bg-constructive/15 text-constructive"
          : "border border-border/70 bg-background"
      }`}
    >
      <dt className="text-sm font-bold tracking-wide">{label}</dt>
      <dd className="text-base font-black text-foreground">
        {discount && "-"}
        {formatCurrency(amount)}
      </dd>
    </div>
  );
};
