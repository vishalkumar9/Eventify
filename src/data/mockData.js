// Configuration data for the application

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

export const pricingPlans = [
  {
    tier: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with basic events',
    features: [
      'Access to free events',
      'Basic event notifications',
      'Community support',
      'Standard registration'
    ],
    popular: false
  },
  {
    tier: 'silver',
    name: 'Silver',
    price: '$9',
    period: 'month',
    description: 'Great for regular event attendees',
    features: [
      'Access to free & silver events',
      'Priority notifications',
      'Email support',
      'Early bird discounts',
      'Event calendar sync'
    ],
    popular: false
  },
  {
    tier: 'gold',
    name: 'Gold',
    price: '$29',
    period: 'month',
    description: 'Best for professionals and enthusiasts',
    features: [
      'Access to free, silver & gold events',
      'VIP support',
      'Exclusive networking sessions',
      'Premium content access',
      'Personal event recommendations',
      'Mobile app access'
    ],
    popular: true
  },
  {
    tier: 'platinum',
    name: 'Platinum',
    price: '$99',
    period: 'month',
    description: 'Ultimate experience for industry leaders',
    features: [
      'Access to all events',
      'Dedicated account manager',
      'Private executive sessions',
      'Custom event requests',
      'Direct speaker access',
      'Exclusive venue previews',
      'Priority seating'
    ],
    popular: false
  }
]