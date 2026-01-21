/**
 * TextOverlay Component - Awwwards-Quality Word Reveal
 * 
 * Displays animated text with cinematic word-by-word reveal.
 * Features: staggered reveal, glow on emotional words, floating depth.
 */

import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';

// Words that get emphasized with a subtle glow
const EMOTIONAL_WORDS = ['sister', 'victim', 'bully', 'impossible', 'replaced', 'quiet', 'free', 'married', 'love', 'heart', '❤️', '🕊️', '🫡'];

const TextOverlay = ({ text, isVisible, position = 'center', delay = 0 }) => {
    const containerRef = useRef(null);

    // Parse text into words with emotional detection
    const words = useMemo(() => {
        return text.split(' ').map((word, i) => ({
            text: word,
            isEmotional: EMOTIONAL_WORDS.some(ew => word.toLowerCase().includes(ew.toLowerCase()))
        }));
    }, [text]);

    useEffect(() => {
        if (!containerRef.current) return;

        const wordElements = containerRef.current.querySelectorAll('.word');

        if (isVisible) {
            // Reset state
            gsap.set(wordElements, {
                opacity: 0,
                y: 15,
                scale: 0.95,
                filter: 'blur(4px)'
            });

            // Cinematic word-by-word reveal
            gsap.to(wordElements, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.5,
                stagger: 0.12, // Slightly faster for better flow
                ease: "power3.out",
                delay: delay / 1000,
            });

            // Subtle floating for depth
            gsap.to(containerRef.current, {
                y: "-=3",
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: delay / 1000 + 0.5
            });
        } else {
            // Fade out
            gsap.to(wordElements, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                ease: "power2.in"
            });
            gsap.killTweensOf(containerRef.current);
        }
    }, [isVisible, text, delay]);

    const positionClasses = {
        center: 'top-[10%] md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2',
        bottom: 'top-[10%] md:bottom-[15%] left-1/2 -translate-x-1/2',
        top: 'top-[10%] md:top-[15%] left-1/2 -translate-x-1/2'
    };

    return (
        <div
            ref={containerRef}
            className={`text-overlay absolute ${positionClasses[position]} z-50 pointer-events-none w-full text-center px-4 md:px-8`}
            style={{ fontFamily: 'Gagalin, "Inter", sans-serif' }}
        >
            <div className="flex flex-wrap justify-center gap-x-[0.35em] gap-y-[0.15em]">
                {words.map((wordObj, i) => (
                    <span
                        key={i}
                        className={`word inline-block text-base md:text-2xl lg:text-3xl font-light tracking-wide 
                            ${wordObj.isEmotional
                                ? 'text-yellow-100/95 drop-shadow-[0_0_12px_rgba(255,255,200,0.5)]'
                                : 'text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
                            }`}
                        style={{
                            opacity: 0,
                            textShadow: wordObj.isEmotional
                                ? '0 0 20px rgba(255,255,200,0.4), 0 2px 10px rgba(0,0,0,0.8)'
                                : '0 2px 15px rgba(0,0,0,0.9)'
                        }}
                    >
                        {wordObj.text}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default React.memo(TextOverlay);
