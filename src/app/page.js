'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockEvents, tierHierarchy } from '@/data/mockData'
import EventCard from '@/components/EventCard'
import { useUserTier } from '@/hooks/useUserTier'

export default function Home() {
  const { tier: userTier, isSignedIn, isLoading } = useUserTier()
  const [selectedFilter, setSelectedFilter] = useState('all')

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

  // Show sign-in prompt if user is not authenticated
  if (!isSignedIn) {
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

  // Filter events based on user tier and selected filter
  const getFilteredEvents = () => {
    let events = mockEvents

    // First filter by user tier access
    const allowedTiers = tierHierarchy[userTier]
    events = events.filter(event => allowedTiers.includes(event.tier))

    // Then apply additional filter
    if (selectedFilter !== 'all') {
      events = events.filter(event => event.tier === selectedFilter)
    }

    return events.sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
  }

  const handleEventRegister = (event) => {
    console.log('Registering for event:', event.title)
    // Add registration logic here
  }

  const filteredEvents = getFilteredEvents()
  const availableTiers = tierHierarchy[userTier]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border'
                }`}
            >
              All Available Events
            </button>
            {availableTiers.map(tier => (
              <button
                key={tier}
                onClick={() => setSelectedFilter(tier)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${selectedFilter === tier
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border'
                  }`}
              >
                {tier} Events
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={handleEventRegister}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events available for your current filter.</p>
          </div>
        )}


      </div>


    </div>
  )
}