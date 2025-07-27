import React, { useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}



export default function Toast({ message, type, onClose }: ToastProps) {

    useEffect(() => {
        const timer = setTimeout(() => {
        onClose()
        }, 5000)

        return () => clearTimeout(timer)
    }, [onClose])


  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`px-4 py-2 rounded-md shadow-lg ${
          type === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        }`}
      >
        <div className="flex items-center justify-between">
          <span>{message}</span>
          <button
            onClick={onClose}
            className="ml-4 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
