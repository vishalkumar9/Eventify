'use client'

import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'

// Custom event for tier updates
const TIER_UPDATE_EVENT = 'tierUpdate'

export function useUserTier() {
    const { user, isLoaded } = useUser()
    const [tier, setTier] = useState('free') // default tier
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Wait for Clerk to finish loading
        if (!isLoaded) {
            setIsLoading(true)
            return
        }

        if (user) {
            // Try to get tier from localStorage first, then fallback to metadata
            const tierKey = `user_tier_${user.id}`
            const storedTier = localStorage.getItem(tierKey)
            const userTier = storedTier || user.publicMetadata?.tier || 'free'
            setTier(userTier)
        } else {
            // User not signed in, default to free
            setTier('free')
        }
        
        setIsLoading(false)
    }, [user, isLoaded])

    // Listen for tier updates from other components
    useEffect(() => {
        const handleTierUpdate = (event) => {
            if (user && event.detail.userId === user.id) {
                setTier(event.detail.newTier)
            }
        }

        window.addEventListener(TIER_UPDATE_EVENT, handleTierUpdate)
        return () => window.removeEventListener(TIER_UPDATE_EVENT, handleTierUpdate)
    }, [user])

    const updateTier = async (newTier) => {
        if (!user) return false

        try {
            setIsLoading(true)
            
            // Store in localStorage
            const tierKey = `user_tier_${user.id}`
            localStorage.setItem(tierKey, newTier)
            
            // Update local state
            setTier(newTier)
            
            // Dispatch custom event to update all other components
            window.dispatchEvent(new CustomEvent(TIER_UPDATE_EVENT, {
                detail: { userId: user.id, newTier }
            }))
            
            setIsLoading(false)
            return true
        } catch (error) {
            console.error('Failed to update tier:', error)
            setIsLoading(false)
            return false
        }
    }

    return {
        tier,
        isLoading,
        updateTier,
        isSignedIn: !!user
    }
}