import type { Todo } from "@/types/todo";

// In-memory database
const todos: Todo[] = [
	{
		id: "1",
		title: "Learn TanStack DB",
		completed: false,
		createdAt: Date.now() - 1000 * 60 * 5,
	},
	{
		id: "2",
		title: "Build a sample app",
		completed: false,
		createdAt: Date.now() - 1000 * 60 * 3,
	},
	{
		id: "3",
		title: "Understand live queries",
		completed: true,
		createdAt: Date.now() - 1000 * 60 * 1,
	},
];

export const db = {
	todos: {
		findAll: async (): Promise<Todo[]> => {
			// Simulate async operation
			await new Promise((resolve) => setTimeout(resolve, 100));
			return [...todos];
		},

		findById: async (id: string): Promise<Todo | undefined> => {
			await new Promise((resolve) => setTimeout(resolve, 50));
			return todos.find((todo) => todo.id === id);
		},

		create: async (data: Omit<Todo, "id" | "createdAt">): Promise<Todo> => {
			await new Promise((resolve) => setTimeout(resolve, 100));
			const newTodo: Todo = {
				...data,
				id: String(Date.now()),
				createdAt: Date.now(),
			};
			todos.push(newTodo);
			return newTodo;
		},

		update: async (
			id: string,
			data: Partial<Omit<Todo, "id" | "createdAt">>,
		): Promise<Todo | null> => {
			await new Promise((resolve) => setTimeout(resolve, 100));
			const index = todos.findIndex((todo) => todo.id === id);
			if (index === -1) return null;

			todos[index] = { ...todos[index], ...data };
			return todos[index];
		},

		delete: async (id: string): Promise<boolean> => {
			await new Promise((resolve) => setTimeout(resolve, 100));
			const index = todos.findIndex((todo) => todo.id === id);
			if (index === -1) return false;

			todos.splice(index, 1);
			return true;
		},
	},
};
