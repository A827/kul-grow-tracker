"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { useStore } from "@/lib/store/useStore";
import type { LocationType } from "@/lib/store/types";

const typeLabels: Record<LocationType, string> = {
  area: "Garden Area",
  pot: "Pot",
  tray: "Seed Tray",
};

export default function LocationsPage() {
  const { locations, addLocation, deleteLocation } = useStore();
  const [type, setType] = useState<LocationType>("area");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const canAdd = useMemo(() => name.trim().length >= 2, [name]);

  return (
    <div>
      <PageHeader
        title="Locations"
        subtitle="Create and manage garden areas, pots, and seed trays."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Create form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold">Add location</div>

          <label className="mt-3 block text-xs font-semibold text-slate-600">
            Type
          </label>
          <select
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            value={type}
            onChange={(e) => setType(e.target.value as LocationType)}
          >
            <option value="area">Garden Area</option>
            <option value="pot">Pot</option>
            <option value="tray">Seed Tray</option>
          </select>

          <label className="mt-3 block text-xs font-semibold text-slate-600">
            Name
          </label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="e.g. North Bed / Pot A12 / Tray T03"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="mt-3 block text-xs font-semibold text-slate-600">
            Notes (optional)
          </label>
          <textarea
            className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="e.g. 35m² rectangle, shaded after 16:00..."
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button
            disabled={!canAdd}
            onClick={() => {
              addLocation({ type, name: name.trim(), notes: notes.trim() || undefined });
              setName("");
              setNotes("");
            }}
            className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Add {typeLabels[type]}
          </button>
        </div>

        {/* List */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">All locations</div>
            <div className="text-xs text-slate-500">{locations.length} total</div>
          </div>

          {locations.length === 0 ? (
            <p className="mt-3 text-sm text-slate-600">
              No locations yet — add your first Area / Pot / Tray on the left.
            </p>
          ) : (
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs text-slate-500">
                  <tr>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Notes</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {locations.map((loc) => (
                    <tr key={loc.id} className="border-t border-slate-200">
                      <td className="px-3 py-2 text-slate-700">
                        {typeLabels[loc.type]}
                      </td>
                      <td className="px-3 py-2 font-medium">{loc.name}</td>
                      <td className="px-3 py-2 text-slate-600">
                        {loc.notes || "—"}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button
                          onClick={() => deleteLocation(loc.id)}
                          className="rounded-lg px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}