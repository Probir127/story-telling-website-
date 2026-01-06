import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Particle Effects Component
 * Creates floating particles for emotional moments
 * 
 * @param {Object} props
 * @param {'hearts'|'sparkles'|'stars'|'none'} props.type - Type of particles to show
 * @param {boolean} props.isActive - Whether to show particles
 */
const ParticleEffect = ({ type = 'none', isActive = false }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!isActive || type === 'none' || !containerRef.current) return;

        const particles = [];
        const particleCount = type === 'hearts' ? 8 : 12;

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Particle symbol
            let symbol = '✨';
            if (type === 'hearts') symbol = '❤️';
            else if (type === 'stars') symbol = '⭐';

            particle.textContent = symbol;
            particle.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 10}px;
                opacity: 0;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;

            containerRef.current.appendChild(particle);
            particles.push(particle);
        }

        // Animate particles
        particles.forEach((particle, i) => {
            gsap.to(particle, {
                opacity: Math.random() * 0.4 + 0.3,
                y: `-=${Math.random() * 100 + 50}`,
                x: `+=${(Math.random() - 0.5) * 100}`,
                rotation: Math.random() * 360,
                duration: Math.random() * 3 + 2,
                delay: i * 0.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

        // Cleanup
        return () => {
            particles.forEach(p => {
                gsap.killTweensOf(p);
                p.remove();
            });
        };
    }, [type, isActive]);

    if (!isActive || type === 'none') return null;

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none z-5 overflow-hidden"
            aria-hidden="true"
        />
    );
};

export default ParticleEffect;
