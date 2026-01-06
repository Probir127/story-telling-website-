import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
    SceneIntro,
    SceneGrowingUp,
    SceneAnger,
    SceneRoasting,
    SceneMilkTea,
    SceneFastFood,
    SceneFacebook,
    SceneFlirting,
    SceneTalker,
    SceneBrotherInLaw,
    SceneWedding,
    SceneNewYear,
    SceneDistance,
    SceneEnding,
    SceneCollage
} from './components/Scenes';
import ParticleEffect from './components/ParticleEffect';

const TOTAL_SCENES = 15;

const collageImages = [
    "/media/20b2c799-537a-428b-b6d2-0dbbe98bf292.jpg",
    "/media/8c7c44f7-168d-4ed1-99ff-46654299caab.jpg",
    "/media/IMG_0352.jpg",
    "/media/IMG_0933.jpg",
    "/media/IMG_0934.jpg",
    "/media/IMG_0937.jpg",
    "/media/IMG_0940.jpg",
    "/media/IMG_0941.jpg",
    "/media/IMG_1449.jpg",
    "/media/eff02042-9f62-4e94-82ad-f8b3c87441d1.jpg"
];

// Precise Mapping & Configuration
const photoScenes = [
    { id: 0, src: "/media/IMG_0939.jpg", type: "image" },      // Intro (Siblings)
    { id: 1, src: "/media/IMG_0018.jpg", type: "image" },      // Growing Up (Cafe)
    { id: 2, src: "/media/IMG_0019.jpg", type: "image" },      // Anger (Elevator)
    { id: 3, src: "/media/IMG_0932.jpg", type: "image" },      // Roasting (New unique image)
    { id: 4, src: "/media/milk_tea.jpg", type: "image" },      // Milk Tea (Specific)
    { id: 5, src: "/media/fastfood.jpg", type: "image" },      // Fast Food (Specific)
    { id: 6, src: "/media/IMG_0929.jpg", type: "image" },      // Facebook
    { id: 7, src: "/media/IMG_0930.jpg", type: "image" },      // Flirting
    { id: 8, src: "/media/IMG_0931.jpg", type: "image" },      // Talker
    { id: 9, src: "/media/2036cedb-4de6-4b3a-b00d-748f3be645f1.jpg", type: "image" }, // Brother-in-Law
    { id: 10, src: "/media/17a2104c-7ae7-433e-9895-2cbdbb9a2e96.jpg", type: "image" }, // Wedding
    { id: 11, src: "/media/IMG_5759.jpg", type: "image" },     // New Year
    { id: 12, src: "/media/IMG_0935.jpg", type: "image" },     // Distance (Lake)
    { id: 13, src: "/media/ending_lake.jpg", type: "image" },      // Ending (Lake)
    { id: 14, type: "collage", images: collageImages }         // Collage (Random Collab)
];

function App() {
    // ============================================
    // STATE MANAGEMENT
    // ============================================
    const [currentScene, setCurrentScene] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [distanceProgress, setDistanceProgress] = useState(0); // Walking away animation progress
    // Track if usage is manual to pause auto-timer temporarily
    const [isManualOverride, setIsManualOverride] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const timerRef = useRef(null);
    const photoContainerRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // ============================================
    // CONFIGURATION
    // ============================================
    // Background moods for each scene
    const sceneMoods = [
        "mood-cool", "mood-vintage", "mood-anger", "mood-anger", "mood-warm",
        "mood-warm", "mood-vintage", "mood-cool", "mood-vintage",
        "mood-cool", "mood-warm", "mood-vintage", "mood-cool", "mood-warm", "mood-vintage"
    ];

    const SCENE_DURATIONS = {
        0: 7500, 1: 8000, 2: 8000, 3: 8000, 4: 7500, 5: 7500, 6: 9500,
        7: 9000, 8: 7500, 9: 8000, 10: 9000, 11: 9500, 12: 9000, 13: 8500, 14: 12000
    };

    // ============================================
    // NAVIGATION HANDLERS
    // ============================================
    const nextScene = (manual = false) => {
        if (manual) {
            setIsManualOverride(true);
            setTimeout(() => setIsManualOverride(false), 10000); // Resume auto-play after 10s idle
        }

        if (currentScene < TOTAL_SCENES - 1) {
            setCurrentScene(prev => prev + 1);
        } else {
            setIsPlaying(false); // Stop at end
        }
    };

    const prevScene = () => {
        setIsManualOverride(true);
        setTimeout(() => setIsManualOverride(false), 10000);
        if (currentScene > 0) setCurrentScene(prev => prev - 1);
    };

    const togglePlay = () => {
        setIsPlaying(p => !p);
        setIsManualOverride(false); // Reset override on manual toggle
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') nextScene(true);
            if (e.key === 'ArrowLeft') prevScene();
            if (e.key === ' ') {
                e.preventDefault();
                togglePlay();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentScene]);

    // Mobile swipe gestures
    useEffect(() => {
        const handleTouchStart = (e) => {
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = (e) => {
            touchEndX.current = e.changedTouches[0].clientX;
            handleSwipe();
        };

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX.current - touchEndX.current;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next scene
                    nextScene(true);
                } else {
                    // Swipe right - previous scene
                    prevScene();
                }
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [currentScene]);

    // Auto-Play Logic
    useEffect(() => {
        if (isPlaying && !isManualOverride && currentScene < TOTAL_SCENES - 1) {
            const duration = SCENE_DURATIONS[currentScene] || 5000;
            timerRef.current = setTimeout(() => {
                setCurrentScene(prev => prev + 1);
            }, duration);
        } else if (currentScene >= TOTAL_SCENES - 1) {
            setIsPlaying(false);
        }
        return () => clearTimeout(timerRef.current);
    }, [isPlaying, currentScene, isManualOverride]);

    // GSAP Multi-Media Transitions
    useEffect(() => {
        if (!photoContainerRef.current) return;
        const ctx = gsap.context(() => {
            const slices = photoContainerRef.current.querySelectorAll('.photo-slice');

            // Animate Active Slice - Pure Fade
            const active = slices[currentScene];
            gsap.fromTo(active,
                { opacity: 0, scale: 1.05 },
                { opacity: 1, scale: 1, duration: 1.5, ease: "power2.inOut" }
            );

            // Conditional Ken Burns or Video Handling
            const activeMedia = photoScenes[currentScene];
            if (activeMedia.type === 'collage') {
                const gridContainer = active.querySelector('.grid');
                if (gridContainer) {
                    gsap.fromTo(gridContainer,
                        { opacity: 0, scale: 0.95 },
                        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
                    );
                }
            } else {
                const isVideo = activeMedia.src.endsWith('.mp4') || activeMedia.src.endsWith('.webm');

                if (!isVideo) {
                    const activeImg = active.querySelector('.photo-img');
                    if (activeImg) {
                        gsap.fromTo(activeImg,
                            { scale: 1.0 },
                            { scale: 1.15, duration: 12, ease: "sine.inOut", repeat: -1, yoyo: true }
                        );
                    }
                }
            }

            // Animate Other Slices OUT - Fade
            slices.forEach((slice, i) => {
                if (i !== currentScene) {
                    gsap.to(slice, { opacity: 0, duration: 1.2, ease: "power2.inOut" });
                    // Kill tweens only for images
                    const img = slice.querySelector('.photo-img');
                    if (img) gsap.killTweensOf(img);
                }
            });
        }, photoContainerRef);
        return () => ctx.revert();
    }, [currentScene]);

    // Distance scene progress tracking
    useEffect(() => {
        if (currentScene === 12) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 0.01;
                if (progress <= 1) setDistanceProgress(progress);
                else clearInterval(interval);
            }, 50);
            return () => clearInterval(interval);
        } else {
            setDistanceProgress(0);
        }
    }, [currentScene]);

    // Preload images for smooth transitions
    useEffect(() => {
        const imagesToPreload = photoScenes
            .filter(scene => scene.type !== 'collage')
            .map(scene => scene.src);

        const collageImgs = photoScenes.find(s => s.type === 'collage')?.images || [];
        const allImages = [...imagesToPreload, ...collageImgs];

        let loaded = 0;
        const total = allImages.length;

        const preloadImage = (src) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    loaded++;
                    setLoadingProgress(Math.round((loaded / total) * 100));
                    resolve();
                };
                img.onerror = () => {
                    loaded++;
                    setLoadingProgress(Math.round((loaded / total) * 100));
                    resolve(); // Continue even if image fails
                };
                img.src = src;
            });
        };

        Promise.all(allImages.map(preloadImage)).then(() => {
            setImagesLoaded(true);
        });
    }, []);

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex font-['Inter']" role="main" aria-label="Interactive story presentation">
            <div className="film-grain" />

            {/* START BUTTON */}
            {!isPlaying && currentScene === 0 && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/95 transition-opacity duration-1000">
                    {!imagesLoaded ? (
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white/40 transition-all duration-300 ease-out"
                                    style={{ width: `${loadingProgress}%` }}
                                />
                            </div>
                            <p className="text-white/40 text-sm tracking-widest uppercase">Loading memories... {loadingProgress}%</p>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="group px-8 py-3 md:px-12 md:py-5 bg-white text-black font-light text-lg md:text-2xl tracking-[0.3em] md:tracking-[0.5em] hover:bg-gray-200 transition-all rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] relative overflow-hidden"
                        >
                            <span className="relative z-10">START STORY</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                        </button>
                    )}
                </div>
            )}

            <div className="w-full h-full flex flex-col md:flex-row">
                {/* LEFT: MEDIA (PHOTO/VIDEO) */}
                <div ref={photoContainerRef} className="w-full h-[55%] md:w-1/2 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/5 relative bg-[#050505]">
                    {photoScenes.map((scene, i) => (
                        <div
                            key={i}
                            className="photo-slice absolute inset-0 will-change-transform"
                            style={{ opacity: 0, zIndex: i === currentScene ? 10 : 0 }}
                        >
                            {scene.type === 'collage' ? (
                                <div className="w-full h-full grid grid-cols-3 gap-0.5 p-0.5 bg-black overflow-y-auto custom-scrollbar">
                                    {scene.images.map((imgSrc, imgIdx) => (
                                        <div
                                            key={imgIdx}
                                            className="relative aspect-[3/4] overflow-hidden group cursor-zoom-in"
                                            onClick={() => {
                                                setSelectedImage(imgSrc);
                                                setIsPlaying(false); // Pause when viewing image
                                            }}
                                        >
                                            <div
                                                className="w-full h-full bg-cover bg-center transform transition-transform duration-[2s] group-hover:scale-110"
                                                style={{ backgroundImage: `url(${imgSrc})` }}
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                scene.src.endsWith('.mp4') || scene.src.endsWith('.webm') ? (
                                    <video
                                        src={scene.src}
                                        autoPlay loop muted playsInline
                                        className="w-full h-full object-cover opacity-90"
                                    />
                                ) : (
                                    <div className="photo-img w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${scene.src})` }} />
                                )
                            )}
                            <div className="photo-vignette" />
                        </div>
                    ))}
                    <div className="absolute inset-0 pointer-events-none border-[40px] border-black/30 mix-blend-overlay" />
                </div>

                {/* RIGHT: NARRATOR (PERSISTENT SCENES) */}
                <div className={`w-full h-[45%] md:w-1/2 md:h-full relative transition-colors duration-[2500ms] ${sceneMoods[currentScene] || 'bg-black'}`}>
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        {/* Render ALL scenes at once for smooth exit animations */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <SceneIntro isActive={currentScene === 0} />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <SceneGrowingUp isActive={currentScene === 1} />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <SceneAnger isActive={currentScene === 2} />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <SceneRoasting isActive={currentScene === 3} />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 4 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <SceneMilkTea isActive={currentScene === 4} />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 5 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <SceneFastFood isActive={currentScene === 5} />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 6 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <SceneFacebook isActive={currentScene === 6} />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 7 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <SceneFlirting isActive={currentScene === 7} />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 8 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <SceneTalker isActive={currentScene === 8} />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 9 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <SceneBrotherInLaw isActive={currentScene === 9} />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 10 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <ParticleEffect type="hearts" isActive={currentScene === 10} />
                            <SceneWedding isActive={currentScene === 10} />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 11 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <SceneNewYear isActive={currentScene === 11} />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 12 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <SceneDistance isActive={currentScene === 12} progress={distanceProgress} />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 13 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <ParticleEffect type="sparkles" isActive={currentScene === 13} />
                            <SceneEnding isActive={currentScene === 13} />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${currentScene === 14 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <ParticleEffect type="stars" isActive={currentScene === 14} />
                            <SceneCollage isActive={currentScene === 14} />
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTROL OVERLAY */}
            <div className={`fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[110] flex items-center gap-4 md:gap-8 transition-all duration-1000 ${currentScene === 0 && !isPlaying ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
                <div className="flex items-center gap-2 md:gap-4">
                    <button onClick={prevScene} className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:bg-white/5 transition-colors text-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50" title="Previous scene" aria-label="Go to previous scene (Arrow Left)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>

                    <button onClick={togglePlay} className="px-6 py-2 border border-white/10 rounded-full hover:bg-white/5 transition-all text-[10px] tracking-[0.3em] uppercase text-white/60 hover:text-white min-w-[120px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50" aria-label={isPlaying ? 'Pause story (Spacebar)' : 'Resume story (Spacebar)'}>
                        {isPlaying ? 'PAUSE STORY' : 'RESUME'}
                    </button>

                    <button onClick={() => nextScene(true)} className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:bg-white/5 transition-colors text-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50" title="Next scene" aria-label="Go to next scene (Arrow Right)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>

                <div className="h-0.5 w-32 bg-white/5 rounded-full overflow-hidden relative" role="progressbar" aria-valuenow={currentScene + 1} aria-valuemin="1" aria-valuemax={TOTAL_SCENES} aria-label="Story progress">
                    <div
                        className="absolute h-full bg-white/40 transition-all duration-500 ease-out"
                        style={{ width: `${((currentScene + 1) / TOTAL_SCENES) * 100}%` }}
                    />
                </div>

                <div className="text-[10px] tracking-[0.4em] text-white/20 font-light tabular-nums uppercase" aria-live="polite">
                    Beat {String(currentScene + 1).padStart(2, '0')} of {String(TOTAL_SCENES).padStart(2, '0')}
                </div>
            </div>

            {/* SHARE BUTTON - Shows at end */}
            {currentScene === TOTAL_SCENES - 1 && (
                <div className="fixed bottom-6 left-6 md:bottom-12 md:left-12 z-[110] transition-all duration-1000">
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: 'Didishuna - A Sister Story',
                                    text: 'Check out this beautiful interactive story!',
                                    url: window.location.href
                                }).catch(() => { });
                            } else {
                                // Fallback: copy to clipboard
                                navigator.clipboard.writeText(window.location.href);
                                alert('Link copied to clipboard!');
                            }
                        }}
                        className="px-6 py-2 border border-white/10 rounded-full hover:bg-white/5 transition-all text-[10px] tracking-[0.3em] uppercase text-white/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                        aria-label="Share this story"
                    >
                        <svg className="inline-block w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                        </svg>
                        Share Story
                    </button>
                </div>
            )}

            {/* LIGHTBOX OVERLAY */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt="Memory"
                        className="max-w-full max-h-full object-contain rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                    />
                    <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                    <div className="absolute bottom-6 left-0 right-0 text-center text-white/30 text-xs tracking-widest uppercase">
                        Click anywhere to close
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
