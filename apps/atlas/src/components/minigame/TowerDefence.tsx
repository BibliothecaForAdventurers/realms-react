import Book from '@bibliotheca-dao/ui-lib/icons/book.svg';
import Sword from '@bibliotheca-dao/ui-lib/icons/sword.svg';
import { OrbitControls, Cloud, Stars, Sky, Html } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import type BN from 'bn.js';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import React, { useRef, useState, useMemo, Suspense } from 'react';
import type * as THREE from 'three';
import { Vector3 } from 'three';
import type { GameStatus } from '@/types/index';
import { Shield } from './three/Shield';
import {
  ShieldVitalityDisplay,
  ShieldVitalityDisplayClassnames,
} from './TowerShieldVitality';
const Tower = dynamic(() => import('@/components/minigame/three/DivineCity'), {
  ssr: false,
});

export interface TowerProps {
  gameStatus?: GameStatus;
  gameIdx?: number;
  health?: BN;
  shield?: BN;
  currentBoostBips?: number;
}

const origin: { position?: Vector3 } = {
  position: new Vector3(0, 0, 0),
};

function TowerDefence(props: TowerProps) {
  const [rotate, setRotate] = useState(true);

  // const { isSoundActive, toggleSound } = useSound();
  const tower = useRef<THREE.Group>(null!);
  const shield = useRef<THREE.Mesh>(null!);
  const [showShieldAction, setShowShieldAction] = useState(false);
  const [showShieldDetail, setShowShieldDetail] = useState(false);

  const h = useMemo<number>(() => {
    return props.health?.toNumber() || 0;
  }, [props.health]);

  return (
    <div className="absolute top-0 w-full h-screen z-1">
      <Canvas linear shadows camera={{ position: [3, 4, 10] }}>
        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[100, 100, 100]} />
          <directionalLight args={[0xf4e99b, 10]} />
          <group
            ref={shield}
            position={[0, 0, 0]}
            onPointerOver={(event) => {
              setRotate(false);
            }}
            onPointerOut={(event) => {
              setRotate(true);
            }}
          >
            {h > 0 ? <Shield jsx={origin} health={h} /> : ''}

            {showShieldDetail && (
              <Html position={[0, 5, 0]}>
                <div className="flex w-auto">
                  <div className="flex w-56">
                    <button
                      className="w-12 h-12 mr-4 text-gray-700 border rounded-full bg-white/30 hover:bg-white fill-white hover:fill-blue-300"
                      onClick={() => {
                        setShowShieldAction(true);
                      }}
                    >
                      <Book className="w-8 h-8 mx-auto " />
                    </button>
                    <button
                      className="w-12 h-12 mr-4 text-gray-700 border rounded-full bg-white/30 hover:bg-white fill-white hover:fill-blue-300"
                      onClick={() => {
                        setShowShieldAction(true);
                      }}
                    >
                      <Sword className="w-8 h-8 mx-auto" />
                    </button>
                    <button
                      className="w-12 h-12 mr-4 text-gray-700 border rounded-full bg-white/30 hover:bg-white fill-white hover:fill-blue-300"
                      onClick={() => {
                        setShowShieldAction(true);
                      }}
                    ></button>
                  </div>
                </div>
              </Html>
            )}
          </group>
          <OrbitControls autoRotate={rotate} />
          <Cloud position={[-4, -2, -25]} speed={0.8} opacity={1} />
          <group ref={tower}>
            <Tower
              position={[0, 1, 0]}
              onPointerOver={() => {
                setRotate(false);
              }}
              receiveShadow
              onPointerOut={() => {
                setRotate(true);
              }}
            />
            {props.gameStatus == 'active' ? (
              <Html
                position={[-4.5, -0.3, 2]}
                className={classNames('w-56', ShieldVitalityDisplayClassnames)}
                occlude={[tower, shield]}
                zIndexRange={[4, 0]}
              >
                <ShieldVitalityDisplay
                  health={props.health}
                  shield={props.shield}
                />
              </Html>
            ) : null}
          </group>
        </Suspense>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />

        <Sky
          azimuth={0.3}
          turbidity={2}
          rayleigh={0.3}
          inclination={0.8}
          distance={1000}
        />
      </Canvas>
    </div>
  );
}

// Wrap in React.memo so the same valued props
// don't cause a re-render
export default React.memo(TowerDefence);
