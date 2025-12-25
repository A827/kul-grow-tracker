type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
};

export default function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>

      <div className="mt-2 text-2xl font-semibold text-slate-900">
        {value}
      </div>

      {hint && (
        <div className="mt-1 text-xs text-slate-500">
          {hint}
        </div>
      )}
    </div>
  );
}