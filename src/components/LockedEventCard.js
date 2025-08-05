import { useState, useEffect } from 'react'
import Link from 'next/link'
import { tierColors } from '@/data/mockData'

export default function LockedEventCard({ event, onRegister, hasAccess }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatDate = (dateString) => {
    if (!mounted) return ''
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return new Date(dateString).toLocaleDateString()
    }
  }

  const handleRegister = () => {
    if (onRegister) {
      onRegister(event)
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative ${
      !hasAccess ? 'opacity-75' : ''
    }`}>
      {/* Lock Overlay for inaccessible events */}
      {!hasAccess && (
        <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-lg">
          <div className="text-center bg-white bg-opacity-90 text-gray-900 p-3 rounded-lg shadow-lg border backdrop-blur-sm">
            <div className="text-2xl mb-1">🔒</div>
            <p className="font-semibold mb-1 text-sm">Upgrade Required</p>
            <p className="text-xs mb-2 text-gray-600">
              Requires {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)} tier
            </p>
            <Link href="/pricing">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:from-purple-700 hover:to-blue-700 transition-all">
                Upgrade Now
              </button>
            </Link>
          </div>
        </div>
      )}

      <img
        src={event.imageUrl || event.image_url}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {event.title}
          </h3>
          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${tierColors[event.tier]}`}>
            {event.tier}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500" suppressHydrationWarning>
            {formatDate(event.eventDate || event.event_date)}
          </p>
          {hasAccess ? (
            <button 
              onClick={handleRegister}
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
}