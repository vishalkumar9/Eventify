export default function PricingCard({ plan, currentTier, onSelectPlan }) {
    const isCurrentPlan = currentTier === plan.tier

    return (
        <div className="relative bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-xl h-full flex flex-col">
            <div className="p-8 flex-1 flex flex-col">
                <div className="text-center mb-8 flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        {plan.price !== '$0' && (
                            <span className="text-gray-600">/{plan.period}</span>
                        )}
                    </div>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                    
                    {/* Features List */}
                    <div className="mt-6">
                        <ul className="text-left space-y-2">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm text-gray-600">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button
                    onClick={() => onSelectPlan(plan.tier)}
                    disabled={isCurrentPlan}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors mt-auto ${isCurrentPlan
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                >
                    {isCurrentPlan ? 'Current Plan' : `Choose ${plan.name}`}
                </button>
            </div>
        </div>
    )
}