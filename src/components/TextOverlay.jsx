/**
 * TextOverlay Component
 * 
 * Displays animated text overlays with word-by-word reveal animation.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.text - The text content to display
 * @param {boolean} props.isVisible - Controls visibility and animation state
 * @param {'center'|'bottom'|'top'} [props.position='center'] - Vertical positioning
 * @param {number} [props.delay=0] - Delay before animation starts (in milliseconds)
 * 
 * @example
 * <TextOverlay 
 *   text="Hello World" 
 *   isVisible={true} 
 *   position="bottom" 
 *   delay={500} 
 * />
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TextOverlay = ({ text, isVisible, position = 'center', delay = 0 }) => {
    const containerRef = useRef(null);
    const wordsRef = useRef([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const words = containerRef.current.querySelectorAll('.word');

        if (isVisible) {
            // Reset state
            gsap.set(words, { opacity: 0, y: 10 });

            // Animate words in sequence with stagger effect
            gsap.to(words, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                delay: delay / 1000, // Convert to seconds
            });

            // Gentle floating drift for depth
            gsap.to(containerRef.current, {
                y: "-=5",
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        } else {
            // Animate out
            gsap.to(words, {
                opacity: 0,
                y: -5,
                duration: 0.4,
                ease: "power2.in"
            });
            gsap.killTweensOf(containerRef.current);
        }
    }, [isVisible, text, delay]);

    const positionClasses = {
        center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        bottom: 'bottom-[15%] left-1/2 -translate-x-1/2',
        top: 'top-[15%] left-1/2 -translate-x-1/2'
    };

    const words = text.split(' ');

    return (
        <div
            ref={containerRef}
            className={`text-overlay absolute ${positionClasses[position]} z-30 pointer-events-none`}
        >
            <div className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-[0.1em]">
                {words.map((word, i) => (
                    <span
                        key={i}
                        className="word inline-block text-base md:text-3xl font-light tracking-wide text-white/95 drop-shadow-lg"
                        style={{ opacity: 0 }}
                    >
                        {word}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default React.memo(TextOverlay);
