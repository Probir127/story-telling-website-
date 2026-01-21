import React, { useState, useEffect, useRef } from 'react';

/**
 * NarrativeSequencer - Word-by-word text reveal synchronized with image transitions
 * Images are rendered separately in App.jsx left panel
 * This component only handles text reveal and triggers image change callbacks
 */
const NarrativeSequencer = ({
    isActive,
    narrative,
    transitionPoints = [],
    delay = 500,
    wordInterval = 120,
    onImageChange,
    onComplete,
    className = ''
}) => {
    const [words, setWords] = useState([]);
    const [visibleWords, setVisibleWords] = useState(0);
    const wordRevealTimerRef = useRef(null);

    // Parse narrative into words on mount
    useEffect(() => {
        if (narrative) {
            const wordArray = narrative.split(' ').map(word => word.trim()).filter(w => w);
            setWords(wordArray);
        }
    }, [narrative]);

    // Reset when scene becomes active
    useEffect(() => {
        if (isActive && words.length > 0) {
            setVisibleWords(0);

            // Start word reveal after initial delay
            const startTimer = setTimeout(() => {
                startWordReveal();
            }, delay);

            return () => clearTimeout(startTimer);
        } else if (!isActive) {
            // Reset when inactive
            setVisibleWords(0);
            if (wordRevealTimerRef.current) {
                clearInterval(wordRevealTimerRef.current);
            }
        }
    }, [isActive, words.length]);

    // Word reveal animation
    const startWordReveal = () => {
        let currentWord = 0;
        wordRevealTimerRef.current = setInterval(() => {
            currentWord++;
            setVisibleWords(currentWord);

            // Check for image transitions
            const progress = (currentWord / words.length) * 100;
            checkImageTransition(progress, currentWord);

            // Complete when all words revealed
            if (currentWord >= words.length) {
                clearInterval(wordRevealTimerRef.current);
                if (onComplete) {
                    setTimeout(onComplete, 1000); // Delay before auto-advance
                }
            }
        }, wordInterval);
    };

    // Check if we should transition to next image
    const checkImageTransition = (progress, wordCount) => {
        if (!transitionPoints || transitionPoints.length === 0 || !onImageChange) return;

        // Find which image index we should be at based on progress
        let targetIndex = 0;
        for (let i = 0; i < transitionPoints.length; i++) {
            if (progress >= transitionPoints[i]) {
                targetIndex = i;
            }
        }

        // Trigger callback to change image
        onImageChange(targetIndex);
    };

    return (
        <div className={`narrative-sequencer ${className}`}>
            {/* Text Layer - Word-by-word reveal */}
            <div
                className="relative z-10 text-white/90 text-base md:text-xl font-light tracking-wide leading-relaxed text-center px-6 max-w-2xl mx-auto"
                style={{
                    textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)'
                }}
            >
                {words.map((word, index) => (
                    <span
                        key={index}
                        className="inline-block mr-1.5 transition-all duration-300"
                        style={{
                            opacity: index < visibleWords ? 1 : 0,
                            transform: index < visibleWords ? 'translateY(0)' : 'translateY(8px)',
                            transitionDelay: `${index * 20}ms`
                        }}
                    >
                        {word}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default NarrativeSequencer;
