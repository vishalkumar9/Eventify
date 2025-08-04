'use client'

import { useState } from 'react'
import { pricingPlans } from '@/data/mockData'
import PricingCard from '@/components/PricingCard'
import Header from '@/components/Header'
import TierDisplay from '@/components/TierDisplay'

export default function PricingPage() {
  const [currentTier] = useState('gold') // Mock current tier
  
  const handleSelectPlan = (tier) => {
    console.log('Selected plan:', tier)
    // Add plan selection logic here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        pageTitle="Pricing" 
        showBackButton={true} 
        backUrl="/" 
        showUserControls={false}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock exclusive events and premium features with our flexible pricing plans
          </p>
          <div className="mt-6">
            <TierDisplay tier={currentTier} label="Plan" />
          </div>
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