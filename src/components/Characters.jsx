import React, { useEffect, useState } from 'react';

// ============================================
// SCENE 1 & 2: Intro & Growing Up Together
// ============================================
export const SiblingsIntro = ({ isActive, sceneType = 'intro', className = '' }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => setAnimate(true), 300);
            return () => clearTimeout(timer);
        }
        setAnimate(false);
    }, [isActive]);

    const isTogetherness = sceneType === 'together';

    // Add blinking animation
    useEffect(() => {
        if (isActive && animate) {
            const blinkInterval = setInterval(() => {
                // Random blink timing for more natural feel
                setTimeout(() => {
                    // Blink animation would go here if we add eye elements
                }, Math.random() * 2000);
            }, 3000 + Math.random() * 2000);
            return () => clearInterval(blinkInterval);
        }
    }, [isActive, animate]);

    return (
        <div className={`relative ${className}`} style={{ width: '300px', height: '400px' }}>
            {/* Big Sister (taller, left) */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 220"
                className="absolute"
                style={{
                    width: '120px',
                    height: '240px',
                    left: isTogetherness ? '28%' : '50%',
                    bottom: '8%',
                    transform: animate
                        ? `translateX(${isTogetherness ? '0' : '-120%'}) rotate(-1deg)`
                        : `translateY(20px)`,
                    opacity: animate ? 1 : 0,
                    transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    transformOrigin: 'bottom center',
                    animation: animate && isTogetherness ? 'breathe 4s ease-in-out infinite' : 'none'
                }}
            >
                <g fill="#e8e8e8">
                    {/* Head with long hair */}
                    <ellipse cx="50" cy="24" rx="14" ry="16" />
                    <path d="M36 20 Q30 2 50 -3 Q70 2 64 20" />
                    <path d="M36 24 Q28 52 34 85" stroke="#e8e8e8" strokeWidth="5" fill="none" />
                    <path d="M64 24 Q72 52 66 85" stroke="#e8e8e8" strokeWidth="5" fill="none" />
                    {/* Body */}
                    <path d="M38 42 Q36 92 40 150 L60 150 Q64 92 62 42 Q56 37 50 37 Q44 37 38 42" />
                    {/* Arm reaching toward brother */}
                    {isTogetherness && (
                        <path d="M61 55 Q74 58 80 52" stroke="#e8e8e8" strokeWidth="5" fill="none" strokeLinecap="round" />
                    )}
                    {/* Legs */}
                    <path d="M40 150 Q38 180 42 215 L48 215 Q50 180 49 150" />
                    <path d="M51 150 Q51 180 54 215 L60 215 Q64 180 60 150" />
                </g>
            </svg>

            {/* Younger Brother (shorter, right) */}
            <svg
                viewBox="0 0 100 200"
                className="absolute"
                style={{
                    width: '95px',
                    height: '190px',
                    right: isTogetherness ? '25%' : '50%',
                    bottom: '8%',
                    transform: animate
                        ? `translateX(${isTogetherness ? '0' : '120%'}) rotate(2deg)`
                        : `translateY(20px)`,
                    opacity: animate ? 1 : 0,
                    transition: 'all 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                    transformOrigin: 'bottom center',
                    animation: animate && isTogetherness ? 'breathe 3.5s ease-in-out infinite 0.5s' : 'none'
                }}
            >
                <g fill="#e8e8e8">
                    {/* Head with short hair */}
                    <ellipse cx="50" cy="38" rx="12" ry="14" />
                    <path d="M38 34 Q35 20 50 16 Q65 20 62 34" />
                    {/* Body */}
                    <path d="M40 54 Q38 95 42 145 L58 145 Q62 95 60 54 Q55 50 50 50 Q45 50 40 54" />
                    {/* Arm reaching back */}
                    {isTogetherness && (
                        <path d="M40 64 Q28 62 22 57" stroke="#e8e8e8" strokeWidth="4" fill="none" strokeLinecap="round" />
                    )}
                    {/* Legs */}
                    <path d="M42 145 Q40 170 44 195 L50 195 Q52 170 51 145" />
                    <path d="M51 145 Q51 170 54 195 L60 195 Q64 170 58 145" />
                </g>
            </svg>

            {/* Warmth between them */}
            {isTogetherness && (
                <div
                    style={{
                        position: 'absolute',
                        left: '43%',
                        bottom: '30%',
                        width: '55px',
                        height: '95px',
                        background: 'radial-gradient(ellipse at center, rgba(255,250,245,0.06) 0%, transparent 70%)',
                        opacity: animate ? 1 : 0,
                        transition: 'opacity 2s ease-out 0.5s'
                    }}
                />
            )}
        </div>
    );
};

// ============================================
// SCENE 3: Poke Gesture (Annoyance)
// ============================================
export const PokeGesture = ({ isActive, className = '' }) => {
    const [animate, setAnimate] = useState(false);
    const [poke, setPoke] = useState(false);

    useEffect(() => {
        if (isActive) {
            const timer1 = setTimeout(() => setAnimate(true), 200);
            const timer2 = setTimeout(() => setPoke(true), 1500);
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
        setAnimate(false);
        setPoke(false);
    }, [isActive]);

    return (
        <div className={`relative ${className}`} style={{ width: '320px', height: '400px' }}>
            {/* Sister (left, annoyed) */}
            <svg
                viewBox="0 0 100 220"
                className="absolute"
                style={{
                    width: '115px',
                    height: '230px',
                    left: '18%',
                    bottom: '8%',
                    transform: animate ? `translateX(${poke ? '-5px' : '0'}) rotate(-2deg)` : 'translateY(20px)',
                    opacity: animate ? 1 : 0,
                    transition: poke ? 'all 0.15s ease-out' : 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                    transformOrigin: 'bottom center'
                }}
            >
                <g fill="#e8e8e8">
                    <ellipse cx="50" cy="24" rx="14" ry="16" />
                    <path d="M36 20 Q30 2 50 -3 Q70 2 64 20" />
                    <path d="M36 24 Q28 52 34 85" stroke="#e8e8e8" strokeWidth="5" fill="none" />
                    <path d="M64 24 Q72 52 66 85" stroke="#e8e8e8" strokeWidth="5" fill="none" />
                    <path d="M38 42 Q36 92 40 150 L60 150 Q64 92 62 42 Q56 37 50 37 Q44 37 38 42" />
                    {/* Arm defensive */}
                    <path d="M38 60 Q28 65 30 80" stroke="#e8e8e8" strokeWidth="5" fill="none" strokeLinecap="round" />
                    <path d="M40 150 Q38 180 42 215 L48 215 Q50 180 49 150" />
                    <path d="M51 150 Q51 180 54 215 L60 215 Q64 180 60 150" />
                </g>
            </svg>

            {/* Brother (right, poking) */}
            <svg
                viewBox="0 0 100 200"
                className="absolute"
                style={{
                    width: '92px',
                    height: '185px',
                    right: '18%',
                    bottom: '8%',
                    transform: animate ? 'translateX(0) rotate(1deg)' : 'translateY(20px)',
                    opacity: animate ? 1 : 0,
                    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
                    transformOrigin: 'bottom center'
                }}
            >
                <g fill="#e8e8e8">
                    <ellipse cx="50" cy="38" rx="12" ry="14" />
                    <path d="M38 34 Q35 20 50 16 Q65 20 62 34" />
                    <path d="M40 54 Q38 95 42 145 L58 145 Q62 95 60 54 Q55 50 50 50 Q45 50 40 54" />
                    {/* Poking arm */}
                    <path
                        d={poke ? "M40 64 Q25 60 18 58" : "M40 64 Q30 62 24 60"}
                        stroke="#e8e8e8"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        style={{ transition: 'all 0.3s ease-out' }}
                    />
                    <path d="M42 145 Q40 170 44 195 L50 195 Q52 170 51 145" />
                    <path d="M51 145 Q51 170 54 195 L60 195 Q64 170 58 145" />
                </g>
            </svg>
        </div>
    );
};

// ============================================
// SCENE 5: Eye Roll / Head Turn (Flirting Assistant)
// ============================================
export const EyeRoll = ({ isActive, className = '' }) => {
    const [animate, setAnimate] = useState(false);
    const [headTurn, setHeadTurn] = useState(false);

    useEffect(() => {
        if (isActive) {
            const timer1 = setTimeout(() => setAnimate(true), 400);
            const timer2 = setTimeout(() => setHeadTurn(true), 1500);
            const timer3 = setTimeout(() => setHeadTurn(false), 2500);
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        }
        setAnimate(false);
        setHeadTurn(false);
    }, [isActive]);

    return (
        <div className={`relative ${className}`} style={{ width: '180px', height: '400px' }}>
            {/* Sister with deadpan expression */}
            <svg
                viewBox="0 0 100 220"
                className="absolute"
                style={{
                    width: '115px',
                    height: '230px',
                    left: '50%',
                    bottom: '8%',
                    transform: animate
                        ? `translateX(-50%) rotate(${headTurn ? '-8deg' : '0deg'})`
                        : 'translateX(-50%) scale(0.95)',
                    opacity: animate ? 1 : 0,
                    transition: headTurn ? 'all 0.5s ease-in-out' : 'all 1.3s ease-out',
                    transformOrigin: 'bottom center'
                }}
            >
                <g fill="#ddd">
                    {/* Head */}
                    <ellipse cx="50" cy="24" rx="14" ry="16" />
                    <path d="M36 20 Q30 2 50 -3 Q70 2 64 20" />
                    <path d="M36 24 Q28 52 34 85" stroke="#ddd" strokeWidth="5" fill="none" />
                    <path d="M64 24 Q72 52 66 85" stroke="#ddd" strokeWidth="5" fill="none" />
                    {/* Body */}
                    <path d="M38 42 Q36 92 40 150 L60 150 Q64 92 62 42 Q56 37 50 37 Q44 37 38 42" />
                    {/* Arms crossed (annoyed) */}
                    <path d="M38 65 Q32 75 35 90" stroke="#ddd" strokeWidth="5" fill="none" strokeLinecap="round" />
                    <path d="M62 65 Q68 75 65 90" stroke="#ddd" strokeWidth="5" fill="none" strokeLinecap="round" />
                    {/* Legs */}
                    <path d="M40 150 Q38 180 42 215 L48 215 Q50 180 49 150" />
                    <path d="M51 150 Q51 180 54 215 L60 215 Q64 180 60 150" />
                </g>
            </svg>
        </div>
    );
};

// ============================================
// SCENE 6: Mouth Movement (She Talked)
// ============================================
export const MouthMovement = ({ isActive, className = '' }) => {
    const [animate, setAnimate] = useState(false);
    const [talking, setTalking] = useState(false);

    useEffect(() => {
        if (isActive && animate) {
            const interval = setInterval(() => {
                setTalking(prev => !prev);
            }, 400);
            return () => clearInterval(interval);
        }
    }, [isActive, animate]);

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => setAnimate(true), 500);
            return () => clearTimeout(timer);
        }
        setAnimate(false);
        setTalking(false);
    }, [isActive]);

    return (
        <div className={`relative ${className}`} style={{ width: '180px', height: '400px' }}>
            {/* Sister talking */}
            <svg
                viewBox="0 0 100 220"
                className="absolute"
                style={{
                    width: '115px',
                    height: '230px',
                    left: '50%',
                    bottom: '8%',
                    transform: animate ? 'translateX(-50%)' : 'translateX(-50%) scale(0.95)',
                    opacity: animate ? 1 : 0,
                    transition: 'all 1.5s ease-out',
                    transformOrigin: 'bottom center'
                }}
            >
                <g fill="#e8e8e8">
                    {/* Head */}
                    <ellipse cx="50" cy="24" rx="14" ry="16" />
                    <path d="M36 20 Q30 2 50 -3 Q70 2 64 20" />
                    <path d="M36 24 Q28 52 34 85" stroke="#e8e8e8" strokeWidth="5" fill="none" />
                    <path d="M64 24 Q72 52 66 85" stroke="#e8e8e8" strokeWidth="5" fill="none" />
                    {/* Mouth (opens/closes) */}
                    <ellipse
                        cx="50"
                        cy="32"
                        rx="4"
                        ry={talking ? "3" : "1.5"}
                        fill="#000"
                        style={{ transition: 'all 0.2s ease-out' }}
                    />
                    {/* Body */}
                    <path d="M38 42 Q36 92 40 150 L60 150 Q64 92 62 42 Q56 37 50 37 Q44 37 38 42" />
                    {/* Arm gesturing while talking */}
                    <path
                        d={talking ? "M38 60 Q25 55 20 60" : "M38 60 Q28 65 30 75"}
                        stroke="#e8e8e8"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        style={{ transition: 'all 0.3s ease-out' }}
                    />
                    {/* Legs */}
                    <path d="M40 150 Q38 180 42 215 L48 215 Q50 180 49 150" />
                    <path d="M51 150 Q51 180 54 215 L60 215 Q64 180 60 150" />
                </g>
            </svg>
        </div>
    );
};

// ============================================
// NEW: Brother-In-Law Scene (STICK FIGURE STYLE)
// ============================================
export const BrotherInLawScene = ({ isActive, className = '' }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => setAnimate(true), 300);
            return () => clearTimeout(timer);
        }
        setAnimate(false);
    }, [isActive]);

    return (
        <div className={`relative ${className}`} style={{ width: '300px', height: '400px' }}>
            {/* Sister (Left, Happy) */}
            <svg
                viewBox="0 0 100 220"
                className="absolute"
                style={{
                    width: '115px',
                    height: '230px',
                    left: '20%',
                    bottom: '8%',
                    transform: animate ? 'translateX(0) rotate(1deg)' : 'translateY(20px)',
                    opacity: animate ? 1 : 0,
                    transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    transformOrigin: 'bottom center'
                }}
            >
                <g fill="#e8e8e8">
                    {/* Head */}
                    <ellipse cx="50" cy="24" rx="14" ry="16" />
                    <path d="M36 20 Q30 2 50 -3 Q70 2 64 20" />
                    {/* Hair strands */}
                    <path d="M36 24 Q28 52 34 85" stroke="#e8e8e8" strokeWidth="5" fill="none" />
                    <path d="M64 24 Q72 52 66 85" stroke="#e8e8e8" strokeWidth="5" fill="none" />
                    {/* Body */}
                    <path d="M38 42 Q36 92 40 150 L60 150 Q64 92 62 42 Q56 37 50 37 Q44 37 38 42" />
                    {/* Legs */}
                    <path d="M40 150 Q38 180 42 215 L48 215 Q50 180 49 150" />
                    <path d="M51 150 Q51 180 54 215 L60 215 Q64 180 60 150" />
                    {/* Arm linking */}
                    <path d="M60 60 Q70 70 80 65" stroke="#e8e8e8" strokeWidth="4" fill="none" strokeLinecap="round" />
                </g>
            </svg>

            {/* Brother-in-Law (Right, Taller, Blockier) */}
            <svg
                viewBox="0 0 100 240"
                className="absolute"
                style={{
                    width: '125px',
                    height: '250px',
                    right: '18%',
                    bottom: '8%',
                    transform: animate ? 'translateX(0)' : 'translateY(20px)',
                    opacity: animate ? 1 : 0,
                    transition: 'all 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                    transformOrigin: 'bottom center'
                }}
            >
                <g fill="#d0d0d0">
                    {/* Head (Square jaw) */}
                    <path d="M35 15 Q35 5 50 5 Q65 5 65 15 L65 35 Q65 45 50 45 Q35 45 35 35 Z" />
                    {/* Body (Broad shoulders) */}
                    <path d="M30 45 L70 45 L70 160 L30 160 Z" />
                    {/* Legs */}
                    <path d="M35 160 L35 230 L45 230 L45 160 Z" />
                    <path d="M55 160 L55 230 L65 230 L65 160 Z" />
                    {/* Arm holding her */}
                    <path d="M30 65 Q20 70 10 65" stroke="#d0d0d0" strokeWidth="5" fill="none" strokeLinecap="round" />
                </g>
            </svg>
        </div>
    );
};

// ============================================
// SCENE 7: Walking Away (Distance)
// ============================================
export const WalkingAway = ({ isActive, progress = 0, className = '' }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => setAnimate(true), 200);
            return () => clearTimeout(timer);
        }
        setAnimate(false);
    }, [isActive]);

    const scale = 1 - (progress * 0.65);
    const opacity = 1 - (progress * 0.7);
    const translateX = progress * 20;
    const blur = progress * 3;
    const legSwing = Math.sin(progress * 20) * 5;

    return (
        <div className={`relative ${className}`} style={{ width: '280px', height: '400px' }}>
            {/* Sister walking away */}
            <svg
                viewBox="0 0 100 220"
                className="absolute"
                style={{
                    width: '115px',
                    height: '230px',
                    left: '50%',
                    bottom: '5%',
                    transform: `translateX(calc(-50% + ${translateX}px)) scale(${scale})`,
                    opacity: animate ? opacity : 0,
                    filter: `blur(${blur}px)`,
                    transition: animate ? 'opacity 0.3s ease-out' : 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <g fill="#d5d5d5">
                    {/* Head looking away */}
                    <ellipse cx="50" cy="24" rx="14" ry="16" />
                    <path d="M36 20 Q30 2 50 -3 Q70 2 64 20" />
                    <path d="M36 24 Q22 55 30 95" stroke="#d5d5d5" strokeWidth="5" fill="none" />
                    <path d="M64 24 Q78 55 70 95" stroke="#d5d5d5" strokeWidth="5" fill="none" />
                    {/* Body */}
                    <path d="M38 42 Q36 92 40 150 L60 150 Q64 92 62 42 Q56 37 50 37 Q44 37 38 42" />
                    {/* Walking arms */}
                    <path
                        d={`M38 55 Q${22 + legSwing} 70 ${28 + legSwing} 100`}
                        stroke="#d5d5d5"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <path
                        d={`M62 55 Q${78 - legSwing} 65 ${72 - legSwing} 90`}
                        stroke="#d5d5d5"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                    />
                    {/* Walking legs */}
                    <path
                        d={`M40 150 Q${32 + legSwing} 185 ${37 + legSwing * 0.5} 215`}
                        fill="#d5d5d5"
                    />
                    <path d={`M40 150 L${37 + legSwing * 0.5} 215 L${43 + legSwing * 0.5} 215 Q${46 + legSwing} 185 ${44 + legSwing} 150 Z`} />
                    <path
                        d={`M54 150 Q${62 - legSwing} 185 ${57 - legSwing * 0.5} 215`}
                        fill="#d5d5d5"
                    />
                    <path d={`M54 150 L${57 - legSwing * 0.5} 215 L${63 - legSwing * 0.5} 215 Q${68 - legSwing} 185 ${60 - legSwing} 150 Z`} />
                </g>
            </svg>

            {/* Fading trail */}
            <div
                style={{
                    position: 'absolute',
                    left: '25%',
                    bottom: '20%',
                    width: '50px',
                    height: '220px',
                    background: `linear-gradient(to right, rgba(240,240,240,${0.03 * (1 - progress)}) 0%, transparent 100%)`,
                    opacity: animate ? 1 : 0,
                    transition: 'opacity 1s ease-out'
                }}
            />
        </div>
    );
};

// ============================================
// SCENE 8: Ghost Outline (Ending)
// ============================================
export const GhostOutline = ({ isActive, className = '' }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => setAnimate(true), 1000);
            return () => clearTimeout(timer);
        }
        setAnimate(false);
    }, [isActive]);

    return (
        <div className={`relative ${className}`} style={{ width: '180px', height: '400px' }}>
            {/* Ghost outline where she was */}
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '10%',
                    transform: 'translateX(-50%)',
                    width: '75px',
                    height: '270px',
                    background: 'radial-gradient(ellipse at center bottom, rgba(245,245,245,0.015) 0%, transparent 60%)',
                    opacity: animate ? 1 : 0,
                    transition: 'opacity 3.5s ease-out',
                    borderRadius: '40% 40% 0 0'
                }}
            />

            {/* Pulse where she used to be */}
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '45%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '4px',
                    background: 'rgba(245,245,245,0.12)',
                    borderRadius: '50%',
                    opacity: animate ? 1 : 0,
                    transition: 'opacity 4.5s ease-out 1.5s',
                    animation: animate ? 'ping 3.5s cubic-bezier(0, 0, 0.2, 1) infinite' : 'none'
                }}
            />
        </div>
    );
};

// ============================================
// SCENE: Slapping / Beating (Roasting)
// ============================================
export const SlappingScene = ({ isActive, className = '' }) => {
    const [animate, setAnimate] = useState(false);
    const [slap, setSlap] = useState(false);

    useEffect(() => {
        if (isActive) {
            const timer1 = setTimeout(() => setAnimate(true), 300);
            const slapInterval = setInterval(() => {
                setSlap(prev => !prev);
            }, 600); // Recurring slap
            return () => {
                clearTimeout(timer1);
                clearInterval(slapInterval);
            };
        }
        setAnimate(false);
        setSlap(false);
    }, [isActive]);

    return (
        <div className={`relative ${className}`} style={{ width: '320px', height: '400px' }}>
            {/* Sister (Left, Angry) */}
            <svg
                viewBox="0 0 100 220"
                className="absolute"
                style={{
                    width: '120px',
                    height: '240px',
                    left: '20%',
                    bottom: '8%',
                    transform: animate ? 'translateX(0)' : 'translateY(20px)',
                    opacity: animate ? 1 : 0,
                    transition: 'opacity 0.5s ease-out, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
            >
                <g fill="#e8e8e8">
                    {/* Head */}
                    <ellipse cx="50" cy="24" rx="14" ry="16" />
                    <path d="M36 20 Q30 2 50 -3 Q70 2 64 20" />
                    {/* Hair - Messy/Action */}
                    <path d="M36 24 Q20 52 30 85" stroke="#e8e8e8" strokeWidth="5" fill="none" />
                    <path d="M64 24 Q80 52 70 85" stroke="#e8e8e8" strokeWidth="5" fill="none" />
                    {/* Body */}
                    <path d="M38 42 Q36 92 40 150 L60 150 Q64 92 62 42 Q56 37 50 37 Q44 37 38 42" />
                    {/* Slapping Arm */}
                    <path
                        d={slap ? "M60 55 Q90 60 110 50" : "M60 55 Q75 30 90 20"}
                        stroke="#e8e8e8"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        style={{ transition: 'd 0.15s ease-in-out' }}
                    />
                    {/* Lungs/Heaving */}
                    <path d="M40 150 Q38 180 42 215 L48 215 Q50 180 49 150" />
                    <path d="M51 150 Q51 180 54 215 L60 215 Q64 180 60 150" />
                </g>
            </svg>

            {/* Brother (Right, Cowering/Laughing) */}
            <svg
                viewBox="0 0 100 200"
                className="absolute"
                style={{
                    width: '100px',
                    height: '200px',
                    right: '15%',
                    bottom: '5%',
                    transform: animate ? (slap ? 'translateX(10px) rotate(5deg)' : 'translateX(0) rotate(0)') : 'translateY(20px)',
                    opacity: animate ? 1 : 0,
                    transition: slap ? 'all 0.1s ease-out' : 'all 0.5s ease-out',
                }}
            >
                <g fill="#d5d5d5">
                    {/* Head - Tilted back laughing/dodging */}
                    <ellipse cx="50" cy="38" rx="12" ry="14" transform={slap ? "rotate(10, 50, 38)" : "rotate(0)"} />
                    <path d="M38 34 Q35 20 50 16 Q65 20 62 34" transform={slap ? "rotate(10, 50, 38)" : "rotate(0)"} />
                    {/* Body - Shrinking away */}
                    <path d="M40 54 Q38 95 42 145 L58 145 Q62 95 60 54 Q55 50 50 50 Q45 50 40 54" />
                    {/* Defensive Arms */}
                    <path d="M35 65 Q45 50 50 45" stroke="#d5d5d5" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M65 65 Q55 50 50 45" stroke="#d5d5d5" strokeWidth="4" fill="none" strokeLinecap="round" />
                    {/* Legs */}
                    <path d="M42 145 Q40 170 44 195 L50 195 Q52 170 51 145" />
                    <path d="M51 145 Q51 170 54 195 L60 195 Q64 170 58 145" />
                </g>
            </svg>

            {/* Impact/Motion Lines */}
            <svg
                viewBox="0 0 100 100"
                className="absolute"
                style={{
                    width: '80px',
                    height: '80px',
                    right: '30%',
                    top: '30%',
                    opacity: slap ? 1 : 0,
                    transform: slap ? 'scale(1.2)' : 'scale(0.8)',
                    transition: 'all 0.1s ease-out'
                }}
            >
                <path d="M50 50 L80 20" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M50 50 L80 50" stroke="white" strokeWidth="2" />
                <path d="M50 50 L80 80" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
        </div>
    );
};

export default {
    SiblingsIntro,
    PokeGesture,
    EyeRoll,
    MouthMovement,
    BrotherInLawScene,
    WalkingAway,
    GhostOutline,
    SlappingScene
};
