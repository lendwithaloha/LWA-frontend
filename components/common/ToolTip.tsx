'use client'

import React, { useState } from 'react'

interface TooltipProps {
    text: string
    children: React.ReactNode
    className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children, className = '' }) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="relative inline-flex items-center">
            {/* Child Wrapper - Ensures Icon/Button Stays in Place */}
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onFocus={() => setIsVisible(true)}
                onBlur={() => setIsVisible(false)}
                className="relative z-20" // Ensures child is above other elements
                aria-describedby="tooltip"
            >
                {children}
            </div>

            {/* Tooltip Container */}
            {isVisible && (
                <div
                    id="tooltip"
                    role="tooltip"
                    className={`absolute left-1/2 top-full normal-case mt-2 -translate-x-1/2 px-3 py-2 text-sm text-white font-light bg-gray-800 rounded-md shadow-lg transition-opacity duration-300 opacity-100 z-50 ${className}`}
                    style={{ width: 'max-content', maxWidth: '250px' }}
                >
                    {/* Tooltip Arrow */}
                    <div className="absolute left-1/2 bottom-full -translate-x-1/2 border-4 border-transparent border-b-gray-800" />
                    {text}
                </div>
            )}
        </div>
    )
}
