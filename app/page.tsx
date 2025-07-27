"use client";


import { useState, useEffect } from 'react'
import UserForm from '@/components/UserForm'
import UserList from '@/components/UserList'
import Toast from '@/components/Toast'
import { User, CreateUserData, UpdateUserData } from '@/types/user'

interface ToastState {
  message: string
  type: 'success' | 'error'
}
export default function Home() {


  const [users, setUsers] = useState<User[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<ToastState | null>(null)

  // Fetch users on component mount
    useEffect(() => {
      fetchUsers()
    }, [])

  const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users')
        if (response.ok) {
          const data = await response.json()
          setUsers(data)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
        setToast({ message: 'Failed to fetch users', type: 'error' })
      }
    }




     const createUser = async (userData: CreateUserData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        const newUser = await response.json()
        setUsers([newUser, ...users])
        setToast({ message: 'User created successfully!', type: 'success' })
      } else {
        const error = await response.json()
        setToast({ message: error.error || 'Failed to create user', type: 'error' })
      }
    } catch (error) {
      console.error('Error creating user:', error)
      setToast({ message: 'Failed to create user', type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }



  const updateUser = async (userData: UpdateUserData) => {
    if (!editingUser) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        setUsers(users.map(user => 
          user.id === editingUser.id ? updatedUser : user
        ))
        setEditingUser(null)
        setToast({ message: 'User updated successfully!', type: 'success' })
      } else {
        const error = await response.json()
        setToast({ message: error.error || 'Failed to update user', type: 'error' })
      }
    } catch (error) {
      console.error('Error updating user:', error)
      setToast({ message: 'Failed to update user', type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }



  const deleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setUsers(users.filter(user => user.id !== id))
        setToast({ message: 'User deleted successfully!', type: 'success' })
      } else {
        const error = await response.json()
        setToast({ message: error.error || 'Failed to delete user', type: 'error' })
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      setToast({ message: 'Failed to delete user', type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }


  const handleEdit = (user: User) => {
    setEditingUser(user)
  }

  const handleCancelEdit = () => {
    setEditingUser(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">User Management</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingUser ? 'Edit User' : 'Create New User'}
            </h2>
            <UserForm
              user={editingUser || undefined}
              onSubmit={editingUser ? updateUser : createUser}
              onCancel={editingUser ? handleCancelEdit : undefined}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Users ({users.length})
          </h2>
          <UserList
            users={users}
            onEdit={handleEdit}
            onDelete={deleteUser}
            isLoading={isLoading}
          />
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
