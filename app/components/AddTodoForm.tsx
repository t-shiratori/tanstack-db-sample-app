"use client";

import { type FormEvent, useState } from "react";
import { todoCollection } from "@/app/db/collections";

export function AddTodoForm() {
  const [title, setTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    setIsAdding(true);

    try {
      // Optimistic mutation - Insert new todo
      // This adds the item to UI immediately and syncs with the server
      todoCollection.insert({
        id: `temp-${Date.now()}`, // Temporary ID
        title: title.trim(),
        completed: false,
        createdAt: Date.now(),
      });

      setTitle("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="何をする必要がありますか？"
          disabled={isAdding}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!title.trim() || isAdding}
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isAdding ? "追加中..." : "Todoを追加"}
        </button>
      </div>
    </form>
  );
}
