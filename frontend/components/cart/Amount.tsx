import { formatCurrency } from "@/src/utils";

type AmountProps = {
  label: string;
  amount: number;
  discount?: boolean;
};

export const Amount = ({ label, amount, discount }: AmountProps) => {
  return (
    <div
      className={`flex justify-between p-2 rounded-md ${
        discount ? "bg-constructive/20 text-constructive" : ""
      }`}
    >
      <dt className="font-bold">{label}</dt>
      <dd className="font-semibold text-foreground">
        {discount && "-"}
        {formatCurrency(amount)}
      </dd>
    </div>
  );
};
