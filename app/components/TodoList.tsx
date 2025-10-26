"use client";

import { eq, useLiveQuery } from "@tanstack/react-db";
import { useState } from "react";
import { todoCollection } from "@/app/db/collections";
import { TodoItem } from "./TodoItem";

type FilterType = "all" | "active" | "completed";

export function TodoList() {
	const [filter, setFilter] = useState<FilterType>("all");

	// Live Query - This automatically updates when the collection changes
	// Demonstrates TanStack DB's reactive query capabilities
	const { data: allTodos, isLoading } = useLiveQuery((q) =>
		q
			.from({ todo: todoCollection })
			.orderBy(({ todo }) => todo.createdAt, "desc"),
	);

	const { data: activeTodos } = useLiveQuery((q) =>
		q
			.from({ todo: todoCollection })
			.where(({ todo }) => eq(todo.completed, false))
			.orderBy(({ todo }) => todo.createdAt, "desc"),
	);

	const { data: completedTodos } = useLiveQuery((q) =>
		q
			.from({ todo: todoCollection })
			.where(({ todo }) => eq(todo.completed, true))
			.orderBy(({ todo }) => todo.createdAt, "desc"),
	);

	if (isLoading) {
		return (
			<div className="text-center py-8 text-gray-500">Loading todos...</div>
		);
	}

	const displayedTodos =
		filter === "all"
			? allTodos
			: filter === "active"
				? activeTodos
				: completedTodos;

	const activeCount = activeTodos?.length ?? 0;
	const completedCount = completedTodos?.length ?? 0;

	return (
		<div>
			{/* Filter buttons */}
			<div className="mb-6 flex gap-2 justify-center">
				<button
					type="button"
					onClick={() => setFilter("all")}
					className={`px-4 py-2 rounded-lg font-medium transition-colors ${
						filter === "all"
							? "bg-blue-500 text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					}`}
				>
					All ({allTodos?.length ?? 0})
				</button>
				<button
					type="button"
					onClick={() => setFilter("active")}
					className={`px-4 py-2 rounded-lg font-medium transition-colors ${
						filter === "active"
							? "bg-blue-500 text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					}`}
				>
					Active ({activeCount})
				</button>
				<button
					type="button"
					onClick={() => setFilter("completed")}
					className={`px-4 py-2 rounded-lg font-medium transition-colors ${
						filter === "completed"
							? "bg-blue-500 text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					}`}
				>
					Completed ({completedCount})
				</button>
			</div>

			{/* Todo list */}
			{!displayedTodos || displayedTodos.length === 0 ? (
				<div className="text-center py-8 text-gray-500">No todos found</div>
			) : (
				<div className="space-y-2">
					{displayedTodos.map((todo) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</div>
			)}
		</div>
	);
}
