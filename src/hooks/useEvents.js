import { useState, useEffect } from 'react'

export function useEvents(tier = null) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        const url = tier && tier.trim() !== ''
          ? `/api/events?tier=${tier}`
          : '/api/events'

        console.log('🔍 API Call:', url)
        const response = await fetch(url)
        console.log('✅ Response status:', response.status)
        const result = await response.json()

        if (result.success) {
          setEvents(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError('Failed to fetch events')
        console.error('Error fetching events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [tier])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const url = tier && tier.trim() !== ''
        ? `/api/events?tier=${tier}`
        : '/api/events'

      const response = await fetch(url)
      const result = await response.json()

      if (result.success) {
        setEvents(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Failed to fetch events')
      console.error('Error fetching events:', err)
    } finally {
      setLoading(false)
    }
  }

  return { events, loading, error, refetch }
}