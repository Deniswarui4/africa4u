"use client";

import { useState } from "react";
import { Mail, CheckCircle2, Clock, ChevronDown, ArrowUpRight } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  status: string | null;
  createdAt: Date | null;
  country?: string | null;
  budget?: string | null;
  interests?: any;
  message?: string | null;
}

export function AdminInquiriesTable({ inquiries }: { inquiries: Inquiry[] }) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        // Revalidate the page
        window.location.reload();
      }
    } catch (e) {
      console.error("Failed to update:", e);
    }
    setUpdatingId(null);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "—";
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const statusBadge = (status: string | null) => {
    switch (status) {
      case "pending":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium"><Clock className="h-3 w-3" /> Pending</span>;
      case "replied":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium"><CheckCircle2 className="h-3 w-3" /> Replied</span>;
      case "converted":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium"><CheckCircle2 className="h-3 w-3" /> Converted</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">{status || "Unknown"}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-7 gap-4 p-4 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wide">
        <div className="col-span-2">Client Details</div>
        <div className="col-span-1">Country</div>
        <div className="col-span-1">Budget</div>
        <div className="col-span-1">Received</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-1 text-right">Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-slate-100">
        {inquiries.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            <p className="text-lg font-medium mb-1">No inquiries yet</p>
            <p className="text-sm">When travelers submit their trip preferences, they'll appear here.</p>
          </div>
        )}

        {inquiries.map((inq) => (
          <div key={inq.id} className="grid grid-cols-1 md:grid-cols-7 gap-2 md:gap-4 p-4 items-center hover:bg-slate-50/80 transition-colors">
            <div className="col-span-2">
              <p className="font-semibold text-slate-900">{inq.name}</p>
              <div className="flex items-center gap-1 text-sm text-slate-500 mt-0.5">
                <Mail className="h-3 w-3" /> {inq.email}
              </div>
            </div>
            <div className="col-span-1 text-sm text-slate-600">{inq.country || "—"}</div>
            <div className="col-span-1 text-sm text-slate-600">{inq.budget || "—"}</div>
            <div className="col-span-1 text-sm text-slate-500">{formatDate(inq.createdAt)}</div>
            <div className="col-span-1">
              {statusBadge(inq.status)}
            </div>
            <div className="col-span-1 flex items-center justify-end gap-2">
              <div className="relative group">
                <button className="text-sm text-slate-600 font-medium hover:text-slate-900 inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-100 transition-colors"
                  disabled={updatingId === inq.id}
                >
                  Update <ChevronDown className="h-3 w-3" />
                </button>
                <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg py-1 w-36 z-10 hidden group-hover:block">
                  <button onClick={() => updateStatus(inq.id, "pending")} className="block w-full text-left px-3 py-1.5 text-sm hover:bg-slate-50">Pending</button>
                  <button onClick={() => updateStatus(inq.id, "replied")} className="block w-full text-left px-3 py-1.5 text-sm hover:bg-slate-50">Replied</button>
                  <button onClick={() => updateStatus(inq.id, "converted")} className="block w-full text-left px-3 py-1.5 text-sm hover:bg-slate-50 text-green-700">Converted</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
