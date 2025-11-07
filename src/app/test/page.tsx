"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    overview: "",
    venue: "",
    location: "",
    date: "",
    time: "",
    mode: "",
    audience: "",
    organizer: "",
    agenda: "",
    tags: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMessage("Please select an image");
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await fetch("/api/events", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || data.message);
      setMessage("✅ Event created successfully!");
    //   setTimeout(() => router.push("/admin/events"), 1500);
    } catch (err) {
      setMessage(`❌ Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white654 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/** الحقول النصية */}
        <input name="title" placeholder="Title" required onChange={handleChange} className="w-full border p-2 rounded"/>
        <textarea name="description" placeholder="Description" required onChange={handleChange} className="w-full border p-2 rounded h-20"/>
        <textarea name="overview" placeholder="Overview" required onChange={handleChange} className="w-full border p-2 rounded h-20"/>
        <input name="venue" placeholder="Venue" required onChange={handleChange} className="w-full border p-2 rounded"/>
        <input name="location" placeholder="Location" required onChange={handleChange} className="w-full border p-2 rounded"/>
        <div className="flex gap-4">
          <input name="date" type="date" required onChange={handleChange} className="w-1/2 border p-2 rounded"/>
          <input name="time" type="time" required onChange={handleChange} className="w-1/2 border p-2 rounded"/>
        </div>
        <select name="mode" required onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Mode</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <input name="audience" placeholder="Audience" required onChange={handleChange} className="w-full border p-2 rounded"/>
        <input name="organizer" placeholder="Organizer" required onChange={handleChange} className="w-full border p-2 rounded"/>
        <input name="agenda" placeholder="Agenda (comma separated)" required onChange={handleChange} className="w-full border p-2 rounded"/>
        <input name="tags" placeholder="Tags (comma separated)" required onChange={handleChange} className="w-full border p-2 rounded"/>

        {/** رفع الصورة */}
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full border p-2 rounded"/>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          {loading ? "Saving..." : "Create Event"}
        </button>

        {message && <p className={`text-center mt-2 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
      </form>
    </div>
  );
}
