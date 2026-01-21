'use client';

import { useEffect, useState } from 'react';
import './celebration.css';

export default function Celebration() {
    const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number }>>([]);

    useEffect(() => {
        // Disable scrolling
        document.body.style.overflow = 'hidden';

        // Generate hearts for continuous animation
        const newHearts = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 5,
        }));
        setHearts(newHearts);

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="celebration-container">
            {/* Background animated gradient */}
            <div className="animated-background"></div>

            {/* Main content */}
            <div className="celebration-content">
                <div className="message-container">
                    <h1 className="main-message">Thank you for accepting my love ❤️</h1>
                    <p className="sub-message">This means everything to me</p>
                    <div className="heart-pulse">💖</div>
                </div>
            </div>

            {/* Continuous floating hearts */}
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="floating-heart"
                    style={{
                        left: `${heart.x}%`,
                        animationDelay: `${heart.delay}s`,
                    }}
                >
                    {['❤️', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 5)]}
                </div>
            ))}

            {/* Sparkle effects */}
            <div className="sparkle-effects">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="sparkle-effect"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    >
                        ✨
                    </div>
                ))}
            </div>

            {/* Gentle confetti */}
            <div className="gentle-confetti-container">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div
                        key={i}
                        className="gentle-confetti"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            backgroundColor: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#fd79a8'][
                                Math.floor(Math.random() * 6)
                            ],
                            width: `${Math.random() * 8 + 5}px`,
                            height: `${Math.random() * 8 + 5}px`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
