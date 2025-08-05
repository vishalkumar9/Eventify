'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { tierHierarchy } from '@/data/mockData'
import EventCard from '@/components/EventCard'
import { useUserTier } from '@/hooks/useUserTier'
import { useEvents } from '@/hooks/useEvents'

export default function EventsPage() {
  const { tier: userTier, isSignedIn, isLoading } = useUserTier()
  const [selectedFilter, setSelectedFilter] = useState('')
  const { events: allEvents, loading: eventsLoading, error: eventsError } = useEvents(selectedFilter)

  // Debug: Log when selectedFilter changes
  useEffect(() => {
    console.log('🎯 Selected filter changed to:', selectedFilter || 'all')
  }, [selectedFilter])
  const [mounted, setMounted] = useState(false)

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show loading until component is mounted and Clerk is loaded
  if (!mounted || isLoading || eventsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }



  // Show error if events failed to load
  if (eventsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading events: {eventsError}</p>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In Required</h1>
            <p className="text-gray-600">
              Please sign in to view and register for events.
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
        </div>
      </div>
    )
  }

  // Don't filter events - show all events but with different access levels
  const getFilteredEvents = () => {
    let events = allEvents || []
    return events.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
  }

  // Check if user can access an event
  const canAccessEvent = (eventTier) => {
    const allowedTiers = tierHierarchy[userTier]
    return allowedTiers.includes(eventTier)
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
          {filteredEvents.map(event => {
            const hasAccess = canAccessEvent(event.tier)
            
            return (
              <div
                key={event.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative ${
                  !hasAccess ? 'opacity-75' : ''
                }`}
              >
                {/* Lock Overlay for inaccessible events */}
                {!hasAccess && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
                    <div className="text-center text-white p-4">
                      <div className="text-4xl mb-2">🔒</div>
                      <p className="font-semibold mb-1">Upgrade Required</p>
                      <p className="text-sm mb-3">
                        Requires {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)} tier
                      </p>
                      <Link href="/pricing">
                        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all">
                          Upgrade Now
                        </button>
                      </Link>
                    </div>
                  </div>
                )}

                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {event.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                      event.tier === 'free' ? 'bg-gray-100 text-gray-800' :
                      event.tier === 'silver' ? 'bg-gray-200 text-gray-900' :
                      event.tier === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {event.tier}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      {new Date(event.eventDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {hasAccess ? (
                      <button 
                        onClick={() => handleEventRegister(event)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Register
                      </button>
                    ) : (
                      <button 
                        className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                        disabled
                      >
                        Locked
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
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