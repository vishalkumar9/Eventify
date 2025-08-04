'use client'

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'
import { useUserTier } from '@/hooks/useUserTier'

export default function Navbar() {
  const { tier, isLoading } = useUserTier()

  const getTierColor = (tierName) => {
    switch (tierName) {
      case 'free': return 'bg-gray-400'
      case 'silver': return 'bg-gray-500'
      case 'gold': return 'bg-yellow-500'
      case 'platinum': return 'bg-purple-500'
      default: return 'bg-gray-400'
    }
  }

  const getTierLabel = (tierName) => {
    return tierName.charAt(0).toUpperCase() + tierName.slice(1) + ' Member'
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              Eventify
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <SignedIn>
              {/* Current Tier Display */}
              <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                <div className={`w-2 h-2 rounded-full ${getTierColor(tier)}`}></div>
                <span className="text-sm font-medium text-gray-700">
                  {isLoading ? 'Loading...' : getTierLabel(tier)}
                </span>
              </div>

              {/* Upgrade Button - Only show if not platinum */}
              {tier !== 'platinum' && (
                <Link
                  href="/pricing"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Upgrade
                </Link>
              )}

              {/* Clerk User Button */}
              <UserButton />
            </SignedIn>

            <SignedOut>
              {/* Empty space when signed out - sign-in/sign-up buttons are on the welcome page */}
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  )
}