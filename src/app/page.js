'use client'

import { useState } from 'react'
import { mockEvents, tierHierarchy } from '@/data/mockData'
import EventCard from '@/components/EventCard'
import Header from '@/components/Header'

export default function Home() {
  const [userTier] = useState('gold') // Mock user tier (removed setUserTier)
  const [selectedFilter, setSelectedFilter] = useState('all')


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
      <Header pageTitle="Events" />

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