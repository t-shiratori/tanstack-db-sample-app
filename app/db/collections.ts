'use client'

import { createCollection } from '@tanstack/react-db'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { queryClient } from '@/app/lib/queryClient'
import { Todo } from '@/types/todo'

// TanStack DB Collection for Todos
// This demonstrates the three pillars of TanStack DB:
// 1. Collections - typed data sets with sync capabilities
// 2. Live Queries - reactive queries across collections
// 3. Optimistic Mutations - instant UI updates with server sync

export const todoCollection = createCollection(
  queryCollectionOptions<Todo>({
    // QueryClient instance (required for TanStack Query integration)
    queryClient,

    // Query key for TanStack Query integration
    queryKey: ['todos'],

    // Fetch function to load initial data
    queryFn: async () => {
      const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost:3000'
      const response = await fetch(`${baseUrl}/api/todos`)
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      return response.json()
    },

    // Get unique key for each item (required for tracking)
    getKey: (item) => item.id,

    // Handle updates when items are modified
    // This function is called when collection.update() is invoked
    onUpdate: async ({ transaction }) => {
      const mutation = transaction.mutations[0]
      if (!mutation) return

      const { original, modified } = mutation

      // Send update to backend API
      const response = await fetch(`/api/todos/${original.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modified),
      })

      if (!response.ok) {
        throw new Error('Failed to update todo')
      }

      return response.json()
    },

    // Handle deletes when items are removed
    onDelete: async ({ transaction }) => {
      const mutation = transaction.mutations[0]
      if (!mutation) return

      const { original } = mutation

      // Send delete to backend API
      const response = await fetch(`/api/todos/${original.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }
    },

    // Handle inserts when new items are added
    onInsert: async ({ transaction }) => {
      const mutation = transaction.mutations[0]
      if (!mutation) return

      const { modified } = mutation

      // Send create to backend API
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: modified.title,
          completed: modified.completed,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create todo')
      }

      return response.json()
    },
  })
)
