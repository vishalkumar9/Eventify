import { tierColors } from '@/data/mockData'

export default function EventCard({ event, onRegister }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleRegister = () => {
    if (onRegister) {
      onRegister(event)
    } else {
      console.log('Registering for event:', event.title)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
          <p className="text-sm text-gray-500">
            {formatDate(event.eventDate || event.event_date)}
          </p>
          <button 
            onClick={handleRegister}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}