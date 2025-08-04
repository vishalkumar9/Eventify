'use client'

import { useState } from 'react'

export default function Header({
    pageTitle = "Events",
    showBackButton = false,
    backUrl = "/",
    showUserControls = true
}) {
    const [userTier] = useState('gold') // Mock user tier
    const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state

    const handleLogin = () => {
        setIsLoggedIn(true)
        console.log('Login clicked')
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
        console.log('Logout clicked')
    }

    const handleUpgrade = () => {
        window.location.href = '/pricing'
    }

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-2xl font-bold text-gray-900">Eventify</h1>
                        <span className="text-sm text-gray-500">{pageTitle}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        {showBackButton && (
                            <a
                                href={backUrl}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                ← Back to Events
                            </a>
                        )}

                        {showUserControls && (
                            <>
                                {isLoggedIn ? (
                                    <>
                                        {/* Current Tier Display */}
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                                                <div className={`w-2 h-2 rounded-full ${userTier === 'free' ? 'bg-gray-400' :
                                                    userTier === 'silver' ? 'bg-gray-500' :
                                                        userTier === 'gold' ? 'bg-yellow-500' :
                                                            'bg-purple-500'
                                                    }`}></div>
                                                <span className="text-sm font-medium text-gray-700 capitalize">
                                                    {userTier} Member
                                                </span>
                                            </div>
                                        </div>

                                        {/* Upgrade Button */}
                                        {userTier !== 'platinum' && (
                                            <button
                                                onClick={handleUpgrade}
                                                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
                                            >
                                                Upgrade
                                            </button>
                                        )}

                                        {/* User Menu */}
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-700">U</span>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleLogin}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Login
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}