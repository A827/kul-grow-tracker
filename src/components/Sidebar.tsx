"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/locations", label: "Locations" },
  { href: "/plants", label: "Plants" },
  { href: "/harvest", label: "Harvest" },
  { href: "/scan/demo", label: "Scan" },
];

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="h-10 w-10 rounded-xl bg-slate-900" />
        <div>
          <div className="text-sm font-semibold leading-tight">
            Kül Grow Tracker
          </div>
          <div className="text-xs text-slate-500">Clean light</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Menu
        </div>

        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-sm transition",
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
        v0.1 · MVP
      </div>
    </aside>
  );
}