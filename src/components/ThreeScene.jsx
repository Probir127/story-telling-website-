import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// Photo Plane Component
const PhotoPlane = ({
    imagePath,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    opacity = 1
}) => {
    const meshRef = useRef();
    const texture = useLoader(TextureLoader, imagePath);

    const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
    const width = 3 * scale;
    const height = (3 / aspectRatio) * scale;

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
        }
    });

    return (
        <mesh ref={meshRef} position={position} rotation={rotation}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial
                map={texture}
                transparent
                opacity={opacity}
                toneMapped={false}
            />
        </mesh>
    );
};

// Camera Controller - 9 Scenes
const CameraController = ({ currentScene = 0 }) => {
    const { camera } = useThree();
    const targetZ = useRef(8);
    const targetY = useRef(0);

    useEffect(() => {
        switch (currentScene) {
            case 0: targetZ.current = 8; targetY.current = 0; break;  // Intro
            case 1: targetZ.current = 2.5; targetY.current = 0; break; // Growing up - close
            case 2: targetZ.current = 3.5; targetY.current = 0.1; break; // Anger
            case 3: targetZ.current = 3; targetY.current = 0; break; // Milk tea - move forward
            case 4: targetZ.current = 4; targetY.current = 0.15; break; // Brother-in-law
            case 5: targetZ.current = 4.2; targetY.current = 0.2; break; // Flirting
            case 6: targetZ.current = 4.5; targetY.current = 0.15; break; // Talker
            case 7: targetZ.current = 5; targetY.current = 0.2; break; // Distance
            case 8: targetZ.current = 8; targetY.current = 0; break; // Ending
            default: targetZ.current = 5; targetY.current = 0;
        }
    }, [currentScene]);

    useFrame(() => {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ.current, 0.02);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY.current, 0.02);
    });

    return null;
};

// Scene Content - Photos
const SceneContent = ({ currentScene, distanceProgress }) => {
    return (
        <>
            {/* Scene 2: Growing Up */}
            {currentScene === 1 && (
                <Suspense fallback={null}>
                    <PhotoPlane
                        imagePath="/media/IMG_0018.jpg"
                        position={[0, 0, -1.5]}
                        scale={1.5}
                        opacity={1.0}
                    />
                </Suspense>
            )}

            {/* Scene 3: Anger */}
            {currentScene === 2 && (
                <Suspense fallback={null}>
                    <PhotoPlane
                        imagePath="/media/IMG_0019.jpg"
                        position={[0, 0, -2]}
                        scale={1.4}
                        opacity={0.95}
                    />
                </Suspense>
            )}

            {/* Scene 4: Milk Tea */}
            {currentScene === 3 && (
                <Suspense fallback={null}>
                    <PhotoPlane
                        imagePath="/media/IMG_0352.jpg"
                        position={[0, 0, -1.8]}
                        scale={1.45}
                        opacity={0.95}
                    />
                </Suspense>
            )}

            {/* Scene 5: Brother-in-law */}
            {currentScene === 4 && (
                <Suspense fallback={null}>
                    <PhotoPlane
                        imagePath="/media/IMG_0936.jpg"
                        position={[0, 0, -2.5]}
                        scale={1.35}
                        opacity={0.9}
                    />
                </Suspense>
            )}

            {/* Scene 7: Talker */}
            {currentScene === 6 && (
                <Suspense fallback={null}>
                    <PhotoPlane
                        imagePath="/media/IMG_0937.jpg"
                        position={[0, 0, -3]}
                        scale={1.35}
                        opacity={0.9}
                    />
                </Suspense>
            )}

            {/* Scene 8: Distance - drifting away */}
            {currentScene === 7 && (
                <Suspense fallback={null}>
                    <group position={[0, 0, -3 - (distanceProgress * 7)]}>
                        <PhotoPlane
                            imagePath="/media/IMG_1449.jpg"
                            position={[0, 0, 0]}
                            scale={1.4 - (distanceProgress * 0.4)}
                            opacity={0.95 - (distanceProgress * 0.6)}
                        />
                    </group>
                </Suspense>
            )}
        </>
    );
};

// Main Scene
const ThreeScene = ({ scrollProgress = 0, currentScene = 0, distanceProgress = 0 }) => {
    return (
        <div className="three-canvas">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={1.5} />
                <pointLight position={[0, 2, 4]} intensity={1.2} color="#fffbf0" distance={20} decay={1.5} />

                <CameraController currentScene={currentScene} />
                <SceneContent currentScene={currentScene} distanceProgress={distanceProgress} />

                <fog attach="fog" args={['#000000', 10, 25]} />
            </Canvas>
        </div>
    );
};

export default ThreeScene;
