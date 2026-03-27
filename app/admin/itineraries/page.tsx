"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Save, X, DollarSign, Clock } from "lucide-react";

interface Itinerary {
  id: string;
  title: string;
  description: string;
  duration: string;
  priceEstimate: string;
}

export default function AdminItinerariesPage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([
    { id: "1", title: "Bush & Beach Retreat", description: "10-day combination of thrilling wildlife encounters in the Mara and relaxation on Diani Beach.", duration: "10 Days", priceEstimate: "$3,100" },
    { id: "2", title: "Cultural Immersion Tour", description: "7-day deep dive into Kenya's diverse cultures, from Nairobi to Lamu Island.", duration: "7 Days", priceEstimate: "$2,200" },
    { id: "3", title: "Great Migration Safari", description: "Witness the spectacular wildebeest migration in the Maasai Mara.", duration: "5 Days", priceEstimate: "$2,800" },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", duration: "", priceEstimate: "" });
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!form.title) return;
    setSaving(true);

    try {
      const res = await fetch("/api/admin/itineraries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        setItineraries(prev => [...prev, data.itinerary || { id: crypto.randomUUID(), ...form }]);
        setForm({ title: "", description: "", duration: "", priceEstimate: "" });
        setShowCreate(false);
      }
    } catch (e) {
      // Fallback: add locally
      setItineraries(prev => [...prev, { id: crypto.randomUUID(), ...form }]);
      setForm({ title: "", description: "", duration: "", priceEstimate: "" });
      setShowCreate(false);
    }
    setSaving(false);
  };

  const handleUpdate = async (id: string) => {
    setSaving(true);
    try {
      await fetch(`/api/admin/itineraries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (e) { /* continue anyway */ }

    setItineraries(prev => prev.map(it => it.id === id ? { ...it, ...form } : it));
    setEditingId(null);
    setForm({ title: "", description: "", duration: "", priceEstimate: "" });
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this itinerary?")) return;

    try {
      await fetch(`/api/admin/itineraries/${id}`, { method: "DELETE" });
    } catch (e) { /* continue */ }

    setItineraries(prev => prev.filter(it => it.id !== id));
  };

  const startEdit = (it: Itinerary) => {
    setEditingId(it.id);
    setForm({ title: it.title, description: it.description, duration: it.duration, priceEstimate: it.priceEstimate });
    setShowCreate(false);
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Itineraries Management</h1>
          <p className="text-slate-500">Create, edit, and delete travel itineraries for your catalog.</p>
        </div>
        <button
          onClick={() => { setShowCreate(true); setEditingId(null); setForm({ title: "", description: "", duration: "", priceEstimate: "" }); }}
          className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> New Itinerary
        </button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="bg-white border rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Plus className="h-5 w-5" /> Create New Itinerary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Title *</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full h-10 px-3 rounded-md border text-sm" placeholder="e.g. Big Five Safari" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Duration</label>
              <input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className="w-full h-10 px-3 rounded-md border text-sm" placeholder="e.g. 7 Days" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Price Estimate</label>
              <input value={form.priceEstimate} onChange={e => setForm(f => ({ ...f, priceEstimate: e.target.value }))} className="w-full h-10 px-3 rounded-md border text-sm" placeholder="e.g. $2,500" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-3 py-2 rounded-md border text-sm" placeholder="Describe the itinerary..." />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate} disabled={saving || !form.title} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1.5 hover:bg-primary/90 disabled:opacity-50">
              <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={() => setShowCreate(false)} className="h-9 px-4 rounded-md border text-sm font-medium hover:bg-muted">Cancel</button>
          </div>
        </div>
      )}

      {/* Itineraries List */}
      <div className="space-y-3">
        {itineraries.map(it => (
          <div key={it.id} className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            {editingId === it.id ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="h-10 px-3 rounded-md border text-sm font-medium" />
                  <input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className="h-10 px-3 rounded-md border text-sm" />
                  <input value={form.priceEstimate} onChange={e => setForm(f => ({ ...f, priceEstimate: e.target.value }))} className="h-10 px-3 rounded-md border text-sm" />
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="px-3 py-2 rounded-md border text-sm md:col-span-2" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate(it.id)} disabled={saving} className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1 hover:bg-primary/90">
                    <Save className="h-3.5 w-3.5" /> {saving ? "Saving..." : "Update"}
                  </button>
                  <button onClick={() => { setEditingId(null); }} className="h-8 px-3 rounded-md border text-xs font-medium hover:bg-muted flex items-center gap-1">
                    <X className="h-3.5 w-3.5" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{it.title}</h3>
                  <p className="text-sm text-slate-500 mb-2 line-clamp-2">{it.description}</p>
                  <div className="flex gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {it.duration}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" /> {it.priceEstimate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => startEdit(it)} className="p-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors" title="Edit">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(it.id)} className="p-2 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {itineraries.length === 0 && (
          <div className="text-center py-16 bg-white border rounded-xl">
            <p className="text-slate-400 mb-2">No itineraries yet.</p>
            <button onClick={() => setShowCreate(true)} className="text-sm text-primary font-medium hover:underline">Create your first itinerary</button>
          </div>
        )}
      </div>
    </div>
  );
}
