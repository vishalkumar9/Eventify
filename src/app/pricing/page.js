'use client'

import { useState } from 'react'
import Link from 'next/link'
import { pricingPlans } from '@/data/mockData'
import PricingCard from '@/components/PricingCard'
import { useUserTier } from '@/hooks/useUserTier'

export default function PricingPage() {
  const { tier: currentTier, updateTier} = useUserTier()
  const [upgrading, setUpgrading] = useState(false)
  
  const handleSelectPlan = async (selectedTier) => {
    if (upgrading) return
    
    setUpgrading(true)
    console.log('Upgrading to:', selectedTier)
  
    try {
    
      const success = await updateTier(selectedTier)
      
      if (success) {
        alert(`Successfully upgraded to ${selectedTier} tier!`)
      } else {
        alert('Failed to upgrade. Please try again.')
      }
    } catch (error) {
      console.error('Upgrade failed:', error)
      alert('Upgrade failed. Please try again.')
    } finally {
      setUpgrading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Events Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            ← Back to Events
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock exclusive events and premium features with our flexible pricing plans
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.tier}
              plan={plan}
              currentTier={currentTier}
              onSelectPlan={handleSelectPlan}
            />
          ))}
        </div>


      </div>
    </div>
  )
}