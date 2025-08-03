// Mock data for demonstration
export const mockEvents = [
  {
    id: '1',
    title: 'Community Meetup',
    description: 'Join us for a casual networking event with fellow developers.',
    event_date: '2025-02-15T18:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    tier: 'free'
  },
  {
    id: '2',
    title: 'React Workshop',
    description: 'Advanced React patterns and best practices workshop.',
    event_date: '2025-02-20T14:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    tier: 'silver'
  },
  {
    id: '3',
    title: 'Tech Conference 2025',
    description: 'Annual technology conference featuring industry leaders.',
    event_date: '2025-03-01T09:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400',
    tier: 'gold'
  },
  {
    id: '4',
    title: 'Exclusive VIP Summit',
    description: 'Private summit for platinum members with C-level executives.',
    event_date: '2025-03-10T10:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400',
    tier: 'platinum'
  },
  {
    id: '5',
    title: 'Open Source Hackathon',
    description: '48-hour hackathon focused on open source projects.',
    event_date: '2025-02-25T09:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400',
    tier: 'free'
  },
  {
    id: '6',
    title: 'AI & Machine Learning Workshop',
    description: 'Deep dive into AI/ML with hands-on projects.',
    event_date: '2025-03-05T13:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
    tier: 'gold'
  }
]

export const tierHierarchy = {
  free: ['free'],
  silver: ['free', 'silver'],
  gold: ['free', 'silver', 'gold'],
  platinum: ['free', 'silver', 'gold', 'platinum']
}

export const tierColors = {
  free: 'bg-gray-100 text-gray-800',
  silver: 'bg-gray-200 text-gray-900',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-purple-100 text-purple-800'
}