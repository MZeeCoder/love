'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';

export default function Home() {
  const router = useRouter();
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current || !yesButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const noButton = noButtonRef.current.getBoundingClientRect();
    const yesButton = yesButtonRef.current.getBoundingClientRect();

    const buttonWidth = 120;
    const buttonHeight = 50;
    const margin = 100; // Minimum distance from Yes button and edges

    let newX, newY;
    let attempts = 0;
    const maxAttempts = 50;

    do {
      // Generate random position across the entire viewport
      newX = Math.random() * (container.width - buttonWidth - 40) + 20;
      newY = Math.random() * (container.height - buttonHeight - 40) + 20;

      // Calculate distance from Yes button
      const yesCenterX = yesButton.left - container.left + yesButton.width / 2;
      const yesCenterY = yesButton.top - container.top + yesButton.height / 2;
      const newCenterX = newX + buttonWidth / 2;
      const newCenterY = newY + buttonHeight / 2;
      const distance = Math.sqrt(
        Math.pow(newCenterX - yesCenterX, 2) + Math.pow(newCenterY - yesCenterY, 2)
      );

      // Check if position is far enough from Yes button
      if (distance > margin && attempts < maxAttempts) {
        break;
      }

      attempts++;
    } while (attempts < maxAttempts);

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoMouseEnter = () => {
    moveNoButton();
  };

  const handleNoClick = () => {
    moveNoButton();
  };

  const handleYesClick = () => {
    setShowCelebration(true);

    // Create multiple hearts
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setHearts(newHearts);

    // Redirect after celebration
    setTimeout(() => {
      router.push('/celebration');
    }, 2000);
  };

  return (
    <div ref={containerRef} className="container">
      {/* Video Section */}
      <div className="video-container">
        <video
          className="video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/love-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
        </video>
        {/* Fallback gradient if no video */}
        <div className="video-fallback"></div>
      </div>

      {/* Question and Buttons */}
      <div className="content">
        <h1 className="question">Did you love me?</h1>

        <div className="buttons-container ">
          <button
            ref={yesButtonRef}
            onClick={handleYesClick}
            className="button yes-button"
            disabled={showCelebration}
          >
            Yes ❤️
          </button>

          <button
            ref={noButtonRef}
            onClick={handleNoClick}
            onMouseEnter={handleNoMouseEnter}
            className="button no-button"
            style={{
              position: noButtonPosition.x || noButtonPosition.y ? 'fixed' : 'relative',
              left: noButtonPosition.x ? `${noButtonPosition.x}px` : 'auto',
              top: noButtonPosition.y ? `${noButtonPosition.y}px` : 'auto',
              transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            }}
          >
            No 💔
          </button>
        </div>
      </div>

      {/* Celebration Animation */}
      {showCelebration && (
        <>
          <div className="celebration-overlay">
            <div className="celebration-message">
              <h2 className="celebration-text">Yay! I knew it ❤️</h2>
            </div>
          </div>

          {/* Floating Hearts */}
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="heart"
              style={{
                left: `${heart.x}%`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              💕
            </div>
          ))}

          {/* Confetti */}
          <div className="confetti-container">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  backgroundColor: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            ))}
          </div>

          {/* Sparkles */}
          <div className="sparkles-container">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1.5}s`,
                }}
              >
                ✨
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

}
