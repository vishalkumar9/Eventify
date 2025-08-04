export default function PricingCard({ plan, currentTier, onSelectPlan }) {
    const isCurrentPlan = currentTier === plan.tier

    return (
        <div
            className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${plan.popular
                ? 'border-blue-500 scale-105'
                : 'border-gray-200 hover:border-blue-300'
                } ${isCurrentPlan ? 'ring-2 ring-green-500' : ''
                }`}
        >

            <div className="p-8">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        {plan.price !== '$0' && (
                            <span className="text-gray-600">/{plan.period}</span>
                        )}
                    </div>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>



                <button
                    onClick={() => onSelectPlan(plan.tier)}
                    disabled={isCurrentPlan}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${isCurrentPlan
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : plan.popular
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                >
                    {isCurrentPlan ? 'Current Plan' : `Choose ${plan.name}`}
                </button>
            </div>
        </div>
    )
}