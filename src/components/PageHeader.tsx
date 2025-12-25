import React from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};

export default function PageHeader({
  title,
  subtitle,
  right,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        )}
      </div>

      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}