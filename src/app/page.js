'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUserTier } from '@/hooks/useUserTier'

export default function Home() {
  const { isSignedIn, isLoading } = useUserTier()
  const router = useRouter()

  // Redirect authenticated users to events page
  useEffect(() => {
    if (!isLoading && isSignedIn) {
      router.push('/events')
    }
  }, [isSignedIn, isLoading, router])

  // Show loading spinner while Clerk is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is signed in, show loading while redirecting
  if (isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to events...</p>
        </div>
      </div>
    )
  }

  // Show sign-in prompt if user is not authenticated
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Eventify</h1>
          <p className="text-gray-600">
            Discover and register for exclusive events based on your membership level.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/sign-in">
            <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Sign In
            </button>
          </Link>

          <Link href="/sign-up">
            <button className="w-full bg-[#6c47ff] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#5a3dd9] transition-colors">
              Create Account
            </button>
          </Link>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>Join thousands of professionals discovering amazing events</p>
        </div>
      </div>
    </div>
  )
}