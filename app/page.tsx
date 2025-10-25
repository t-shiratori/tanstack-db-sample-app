'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { ErrorSimulationProvider } from './contexts/ErrorSimulationContext'
import { NotificationProvider } from './contexts/NotificationContext'

// Dynamically import components to ensure they only run on client side
const AddTodoForm = dynamic(() => import('./components/AddTodoForm').then(mod => ({ default: mod.AddTodoForm })), {
  ssr: false,
  loading: () => <div className="text-center py-4 text-gray-500">Loading form...</div>
})

const TodoList = dynamic(() => import('./components/TodoList').then(mod => ({ default: mod.TodoList })), {
  ssr: false,
  loading: () => <div className="text-center py-8 text-gray-500">Loading todos...</div>
})

const ErrorSimulationToggle = dynamic(() => import('./components/ErrorSimulationToggle').then(mod => ({ default: mod.ErrorSimulationToggle })), {
  ssr: false,
})

const ToastContainer = dynamic(() => import('./components/ToastContainer').then(mod => ({ default: mod.ToastContainer })), {
  ssr: false,
})

export default function Home() {
  return (
    <NotificationProvider>
      <ErrorSimulationProvider>
        <ToastContainer />
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              TanStack DB Sample
            </h1>
            <p className="text-gray-600">
              A simple todo app demonstrating TanStack DB's three pillars
            </p>
            <div className="mt-4 flex gap-4 justify-center text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Collections
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Live Queries
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Optimistic Mutations
              </div>
            </div>
          </div>

          {/* Error Simulation Toggle */}
          <ErrorSimulationToggle />

          {/* Main content */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Suspense fallback={<div className="text-center py-4 text-gray-500">Loading...</div>}>
              <AddTodoForm />
              <TodoList />
            </Suspense>
          </div>

          {/* Info section */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="font-semibold text-blue-900 mb-2">
              Learning Points:
            </h2>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • <strong>Collections:</strong> Type-safe data storage with
                automatic sync (see app/db/collections.ts)
              </li>
              <li>
                • <strong>Live Queries:</strong> Reactive queries with filtering
                and sorting (see TodoList.tsx)
              </li>
              <li>
                • <strong>Optimistic Mutations:</strong> Instant UI updates with
                background sync (see TodoItem.tsx)
              </li>
              <li>
                • <strong>Error Handling:</strong> Toggle error simulation mode to
                see optimistic updates automatically rollback on server errors
              </li>
            </ul>
          </div>
        </div>
      </main>
      </ErrorSimulationProvider>
    </NotificationProvider>
  )
}
