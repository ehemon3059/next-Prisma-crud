"use client";


import React, { useEffect, useState } from 'react'
import { User, CreateUserData, UpdateUserData } from '@/types/user'

interface UserFormPorps{
    user?: User
    onSubmit: (data: CreateUserData | UpdateUserData) => Promise<void>
    onCancel?: () => void
    isLoading?: boolean
}


export default function UserForm({user, onSubmit, onCancel, isLoading}: UserFormPorps) {

    const [formData, setFormData] = useState({
        name: '',
        email: ''
    })

    // Update form data when user prop changes (for edit mode)
    useEffect(() => {
        if (user) {
        setFormData({
            name: user.name,
            email: user.email
        })
        } else {
        // Reset form for create mode
        setFormData({
            name: '',
            email: ''
        })
        }
    }, [user])



    const handelSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        await onSubmit(formData);
    }

  return (
    <form onSubmit={handelSubmit} className='space-y-4'>
              <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          required
          disabled={isLoading}
            placeholder="Enter user name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          required
          disabled={isLoading}
          placeholder="Enter user email"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : user ? 'Update User' : 'Create User'}
        </button>

        

            <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setFormData({ name: '', email: '' })} // clear all fields
            >
            Clear Form
            </button>




        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        )}
      </div>
      
    </form>
  )
}
