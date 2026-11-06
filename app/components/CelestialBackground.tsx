'use client'
import { useEffect, useState } from 'react'

export function CelestialBackground() {
  const [stars, setStars] = useState<{id: number, top: string, left: string, size: string, duration: string, delay: string, isGold: boolean}[]>([])

  useEffect(() => {
    // On génère 60 étoiles pour un ciel bien rempli
    const generatedStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.9 ? '3px' : Math.random() > 0.6 ? '2px' : '1.5px',
      duration: `${Math.random() * 4 + 2}s`,
      delay: `${Math.random() * 4}s`,
      isGold: Math.random() > 0.7
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Le fond dégradé céleste */}
      <div className="absolute inset-0 bg-divine-gradient"></div>
      
      {/* Le halo divin */}
      <div className="divine-aura"></div>
      
      {/* Les étoiles filantes */}
      <div className="shooting-star shooting-star-1"></div>
      <div className="shooting-star shooting-star-2"></div>
      <div className="shooting-star shooting-star-3"></div>
      <div className="shooting-star" style={{ top: '60%', left: '10%', animationDelay: '5s', animationDuration: '6s' }}></div>
      <div className="shooting-star" style={{ top: '20%', left: '90%', animationDelay: '12s', animationDuration: '8s' }}></div>

      {/* Les étoiles fixes */}
      {stars.map(star => (
        <div
          key={star.id}
          className={`star ${star.isGold ? 'star-gold' : ''}`}
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            animationDelay: star.delay
          }}
        />
      ))}
    </div>
  )
}