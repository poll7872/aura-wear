import { formatCurrency } from "@/src/utils";

type AmountProps = {
  label: string;
  amount: number;
};

export const Amount = ({ label, amount }: AmountProps) => {
  return (
    <div className="flex justify-between">
      <dt className="font-bold">{label}</dt>
      <dd className="text-gray-900">{formatCurrency(amount)}</dd>
    </div>
  );
};
