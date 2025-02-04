interface StatusCount {
  status: string;
  count: number;
}

interface StatusPillsProps {
  counts: StatusCount[];
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export function StatusPills({
  counts,
  selectedStatus,
  onStatusChange,
}: StatusPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {counts.map(({ status, count }) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`px-4 py-1 rounded-full text-sm transition-colors ${
            selectedStatus === status
              ? "bg-zinc-900 text-white"
              : "bg-gray-300 text-sm  text-black "
          }`}
        >
          {status}{" "}
          <span
            className={`ml-2 px-2  rounded-full text-sm transition-colors ${
              selectedStatus === status
                ? "bg-white text-black"
                : "bg-gray-400 text-sm  text-black "
            }`}
          >
            {count}
          </span>
        </button>
      ))}
    </div>
  );
}
