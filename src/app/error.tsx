'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
    
    // You can also send to external services like Sentry
    // Sentry.captureException(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-800 mb-4">
          Something went wrong!
        </h2>
        
        <div className="mb-4">
          <p className="text-red-600 mb-2">
            {error.message || 'An unexpected error occurred'}
          </p>
          
          {error.digest && (
            <p className="text-sm text-gray-500">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={reset}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  )
}