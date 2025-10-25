'use client'

import { useErrorSimulation } from '@/app/contexts/ErrorSimulationContext'

export function ErrorSimulationToggle() {
  const { simulateError, setSimulateError } = useErrorSimulation()

  return (
    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-yellow-900 mb-1">
            Error Simulation Mode
          </h3>
          <p className="text-sm text-yellow-700">
            Enable to test optimistic update rollback when server requests fail
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={simulateError}
            onChange={(e) => setSimulateError(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
        </label>
      </div>
      {simulateError && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          ⚠️ All update, delete, and create operations will fail. Watch the UI
          revert to original state after the error.
        </div>
      )}
    </div>
  )
}
