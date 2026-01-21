import React from 'react';
import TextOverlay from './TextOverlay';
import {
    SiblingsIntro,
    PokeGesture,
    EyeRoll,
    MouthMovement,
    BrotherInLawScene,
    WalkingAway,
    GhostOutline,
    SlappingScene
} from './Characters';

// Scene 0: Intro
export const SceneIntro = React.memo(({ isActive }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-6 md:mb-12">
            <SiblingsIntro isActive={isActive} sceneType="intro" />
        </div>
        <TextOverlay text="This is my sister. My first bully. My favorite victim." isVisible={isActive} position="bottom" delay={800} />
    </div>
));

// Scene 1: Growing Up
export const SceneGrowingUp = React.memo(({ isActive }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-6 md:mb-12">
            <SiblingsIntro isActive={isActive} sceneType="together" />
        </div>
        <TextOverlay text="We grew up together. I was basically her unpaid intern in chaos." isVisible={isActive} position="bottom" delay={500} />
    </div>
));

// Scene 2: Anger
export const SceneAnger = React.memo(({ isActive }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-6 md:mb-12">
            <EyeRoll isActive={isActive} />
        </div>
        <TextOverlay text="Angriest person in the house. Conveniently, I lived closest." isVisible={isActive} position="bottom" delay={500} />
    </div>
));

// Scene 3: Roasting
export const SceneRoasting = React.memo(({ isActive }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-6 md:mb-12">
            <SlappingScene isActive={isActive} />
        </div>
        <TextOverlay text="I roasted her. She responded... physically expressive when annoyed." isVisible={isActive} position="bottom" delay={500} />
    </div>
));

// Scene 4: Milk Tea
export const SceneMilkTea = React.memo(({ isActive }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-6 md:mb-12">
            <SiblingsIntro isActive={isActive} sceneType="together" />
        </div>
        <TextOverlay text="Milk tea was banned by Mamoni. I broke the law. Blamed her. She negotiated." isVisible={isActive} position="bottom" delay={500} />
    </div>
));

// Scene 5: Fast Food
export const SceneFastFood = React.memo(({ isActive }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-6 md:mb-12">
            <PokeGesture isActive={isActive} />
        </div>
        <TextOverlay text="Ordering food? I used her name. She took the shouting, so I didn't have to." isVisible={isActive} position="bottom" delay={500} />
    </div>
));

// Scene 6: Facebook
export const SceneFacebook = React.memo(({ isActive }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-6 md:mb-12">
            <SiblingsIntro isActive={isActive} sceneType="intro" />
        </div>
        <TextOverlay text="She made my first Facebook (Class 5). Only she knew I was 'cool' online." isVisible={isActive} position="bottom" delay={500} />
    </div>
));

// Scene 7: Flirting
export const SceneFlirting = React.memo(({ isActive }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-6 md:mb-12">
            <EyeRoll isActive={isActive} />
        </div>
        <TextOverlay text="I made her flirt with girls for me on chat. Peak wing-sister behavior. Still no girlfriend. Tragic." isVisible={isActive} position="bottom" delay={500} />
    </div>
));

// Scene 8: Talker
export const SceneTalker = React.memo(({ isActive }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-6 md:mb-12">
            <MouthMovement isActive={isActive} />
        </div>
        <TextOverlay text="She talked for both of us. My only role: look innocent and nod." isVisible={isActive} position="bottom" delay={500} />
    </div>
));

// Scene 9: Brother-in-Law
export const SceneBrotherInLaw = React.memo(({ isActive }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-6 md:mb-12">
            <BrotherInLawScene isActive={isActive} />
        </div>
        <TextOverlay text="Enter: the brother-in-law. A brave man. Handles her moods with honor. Salute. 🫡" isVisible={isActive} position="bottom" delay={500} />
    </div>
));

// Scene 10: Wedding
export const SceneWedding = React.memo(({ isActive }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-6 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-8">
            <SiblingsIntro isActive={isActive} sceneType="together" />
        </div>
        <p className="text-white/80 text-sm md:text-lg font-light tracking-wide mb-1 md:mb-2 animate-pulse">She got married. 🕊️</p>
        <p className="text-white/90 text-lg md:text-2xl font-bold tracking-wider text-yellow-100/90 mb-2 md:mb-4 uppercase">I'M FINALLY FREE!</p>
        <p className="text-white/60 text-xs md:text-sm font-light italic">No refunds. No exchanges. His turn now.</p>
    </div>
));

// Scene 11: New Year
export const SceneNewYear = React.memo(({ isActive }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-6 md:mb-12">
            <SiblingsIntro isActive={isActive} sceneType="together" />
        </div>
        <TextOverlay text="Tried to act normal on New Year's. Failed immediately. Permanent weirdos." isVisible={isActive} position="bottom" delay={500} />
    </div>
));

// Scene 12: Distance
export const SceneDistance = React.memo(({ isActive, progress = 0 }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-6 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-12" style={{ transform: `translateX(${progress * 50}px)`, opacity: 1 - progress }}>
            <WalkingAway isActive={isActive} progress={progress} />
        </div>
        <TextOverlay text="She moved out. The house got quiet. Too quiet." isVisible={isActive} position="bottom" delay={500} />
    </div>
));

// Scene 13: Ending
export const SceneEnding = React.memo(({ isActive }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-6 md:mb-12">
            <GhostOutline isActive={isActive} />
        </div>
        <TextOverlay text="Still annoying. Still impossible to replace. Still my sister. ❤️" isVisible={isActive} position="bottom" delay={800} />
    </div>
));

// Scene 14: Collage
export const SceneCollage = React.memo(({ isActive }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 character-exit'}`}>
        <div className="character-container mb-6 md:mb-12">
            <div className="text-6xl md:text-8xl animate-pulse">✨</div>
        </div>
        <TextOverlay text="And a million other memories." isVisible={isActive} position="bottom" delay={800} />
    </div>
));

export default {
    SceneIntro, SceneGrowingUp, SceneAnger, SceneRoasting, SceneMilkTea, SceneFastFood,
    SceneFacebook, SceneFlirting, SceneTalker, SceneBrotherInLaw,
    SceneWedding, SceneNewYear, SceneDistance, SceneEnding, SceneCollage
};
