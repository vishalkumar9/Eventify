export default function TierDisplay({ tier, label = "Member", showLabel = true }) {
  return (
    <div className="inline-flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
      {showLabel && (
        <span className="text-sm text-gray-600">Currently on:</span>
      )}
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${
          tier === 'free' ? 'bg-gray-400' :
          tier === 'silver' ? 'bg-gray-500' :
          tier === 'gold' ? 'bg-yellow-500' :
          'bg-purple-500'
        }`}></div>
        <span className="text-sm font-medium text-gray-700 capitalize">
          {tier} {label}
        </span>
      </div>
    </div>
  )
}