'use client'

import { Todo } from '@/types/todo'
import { todoCollection } from '@/app/db/collections'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  // Optimistic mutation - Toggle completion status
  // This updates the UI immediately and syncs with the server in the background
  const handleToggle = () => {
    todoCollection.update(todo.id, (draft) => {
      draft.completed = !draft.completed
    })
  }

  // Optimistic mutation - Delete todo
  // This removes the item from UI immediately and syncs with the server
  const handleDelete = () => {
    todoCollection.delete(todo.id)
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {/* Checkbox for completion status */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />

      {/* Todo title */}
      <span
        className={`flex-1 ${
          todo.completed
            ? 'line-through text-gray-400'
            : 'text-gray-800'
        }`}
      >
        {todo.title}
      </span>

      {/* Created date */}
      <span className="text-xs text-gray-400">
        {new Date(todo.createdAt).toLocaleString('ja-JP', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
      >
        Delete
      </button>
    </div>
  )
}
