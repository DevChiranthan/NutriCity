import React, { useState, useEffect, useRef } from 'react';
import { Leaf, ChevronRight, Flower, Sun, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLogoRevealed, setIsLogoRevealed] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Reveal logo after initial load
    const revealTimer = setTimeout(() => {
      setIsLogoRevealed(true);
    }, 500);

    // Mouse movement tracking
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(revealTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleExploreClick = () => {
    navigate('/login');
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-ugadi-light to-white overflow-hidden flex items-center justify-center"
    >
      {/* Animated Background Elements */}
      {[...Array(15)].map((_, i) => {
        const distance = 100 + (i * 20); // Increasing distance for each element
        const speed = 0.5 + (i * 0.1); // Increasing speed for each element
        return (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              transform: `translate(${mousePosition.x / distance}px, ${mousePosition.y / distance}px)`,
              transition: `transform ${speed}s cubic-bezier(0.4, 0, 0.2, 1)`
            }}
          >
            {i % 3 === 0 ? (
              <Flower className="w-8 h-8 text-ugadi-saffron/30 animate-float" />
            ) : i % 3 === 1 ? (
              <Sun className="w-6 h-6 text-ugadi-yellow/30 animate-float" />
            ) : (
              <Star className="w-4 h-4 text-ugadi-green/30 animate-float" />
            )}
          </div>
        );
      })}

      {/* Interactive Content Container */}
      <div 
        className="relative z-10 text-center"
        style={{
          transform: `translate(${-mousePosition.x / 150}px, ${-mousePosition.y / 150}px)`,
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Logo Container */}
        <div 
          className={`
            w-48 h-48 mx-auto mb-6 bg-white rounded-full shadow-2xl 
            flex items-center justify-center transition-all duration-1000
            border-4 border-ugadi-saffron/20
            ${isLogoRevealed 
              ? 'scale-100 opacity-100 rotate-0' 
              : 'scale-0 opacity-0 rotate-180'}
          `}
        >
          <Leaf 
            className="text-ugadi-green" 
            size={80} 
            strokeWidth={1.5}
          />
        </div>

        {/* Title */}
        <h1 
          className={`
            text-6xl font-bold text-ugadi-maroon mb-4 transition-all duration-1000
            font-festive
            ${isLogoRevealed 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'}
          `}
        >
          NutriCity
        </h1>

        {/* Subtitle */}
        <p 
          className={`
            text-xl text-ugadi-maroon/70 mb-8 transition-all duration-1000 delay-500
            ${isLogoRevealed 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'}
          `}
        >
          Nourishing Communities, Cultivating Health
        </p>

        {/* CTA Button */}
        <button 
          onClick={handleExploreClick}
          className={`
            bg-ugadi-saffron text-white px-8 py-3 rounded-full 
            flex items-center mx-auto hover:bg-ugadi-saffron/90
            transition-all duration-300 group shadow-lg
            ${isLogoRevealed 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'}
          `}
        >
          Explore Now 
          <ChevronRight 
            className="ml-2 group-hover:translate-x-1 transition-transform" 
          />
        </button>
      </div>

      {/* Mouse Cursor Highlight */}
      <div 
        className="fixed pointer-events-none z-50"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div 
          className="w-8 h-8 border-2 border-ugadi-saffron/50 rounded-full 
          absolute top-0 left-0 animate-pulse"
        />
      </div>
    </div>
  );
};

export default LandingPage; 