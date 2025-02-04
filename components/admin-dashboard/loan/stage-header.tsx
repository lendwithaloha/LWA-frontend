interface StageHeaderProps {
  stage: string;
  count: number;
  totalAmount: number;
}

export default function StageHeader({
  stage,
  count,
  totalAmount,
}: StageHeaderProps) {
  return (
    <div className="bg-slate-200 mt-2  p-4   w-64 flex-shrink-0 border-t-4 border-black">
      <div className="flex items-center gap-4">
        <div className="text-gray-900">{stage}</div>
        <div className="w-5 h-5 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs">
          {count}
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-600">Total Loan Amount</div>
        <div className="font-medium">${totalAmount.toLocaleString()}</div>
      </div>
    </div>
  );
}
