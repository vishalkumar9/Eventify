'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { tierHierarchy } from '@/data/mockData'
import LockedEventCard from '@/components/LockedEventCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import SignInPrompt from '@/components/SignInPrompt'
import { useUserTier } from '@/hooks/useUserTier'
import { useEvents } from '@/hooks/useEvents'

export default function EventsPage() {
  const { tier: userTier, isSignedIn, isLoading } = useUserTier()
  const [selectedFilter, setSelectedFilter] = useState('')
  const { events: allEvents, loading: eventsLoading, error: eventsError } = useEvents(selectedFilter)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading || eventsLoading) {
    return <LoadingSpinner />
  }

  if (eventsError) {
    return <LoadingSpinner message={`Error: ${eventsError}`} />
  }

  if (!isSignedIn) {
    return <SignInPrompt message="Please sign in to view and register for events." />
  }

  const filteredEvents = (allEvents || []).sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
  const availableTiers = tierHierarchy[userTier]

  const canAccessEvent = (eventTier) => tierHierarchy[userTier].includes(eventTier)
  const handleEventRegister = (event) => console.log('Registering for event:', event.title)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
              <p className="text-gray-600">Discover events based on your {userTier} membership</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedFilter === ''
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border'
                }`}
            >
              All Events
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
            <LockedEventCard
              key={event.id}
              event={event}
              hasAccess={canAccessEvent(event.tier)}
              onRegister={handleEventRegister}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events available for your current filter.</p>
            <Link href="/pricing" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
              Upgrade your membership to access more events
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}