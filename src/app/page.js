'use client'

import { useState } from 'react'
import { mockEvents, tierHierarchy, tierColors } from '@/data/mockData'
import EventCard from '@/components/EventCard'

export default function Home() {
  const [userTier, setUserTier] = useState('gold') // Mock user tier
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900">Eventify</h1>
              <span className="text-sm text-gray-500">Events</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Your tier:</span>
              <select
                value={userTier}
                onChange={(e) => setUserTier(e.target.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize border-0 ${tierColors[userTier]}`}
              >
                <option value="free">Free</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </select>
            </div>
          </div>
        </div>
      </header>

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

        {/* Tier Info */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tier Access Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(tierHierarchy).map(([tier, access]) => (
              <div key={tier} className={`p-4 rounded-lg border-2 ${userTier === tier ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                <h3 className={`font-medium capitalize mb-2 ${tierColors[tier].split(' ')[1]}`}>
                  {tier} Tier
                </h3>
                <p className="text-sm text-gray-600">
                  Access to: {access.join(', ')} events
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}