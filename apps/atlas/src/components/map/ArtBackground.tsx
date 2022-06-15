import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import { useAtlasContext } from '@/hooks/useAtlasContext';

export type BackgroundOptions =
  | 'hero'
  | 'realm'
  | 'bank'
  | 'crypt'
  | 'lore'
  | undefined;

type ArtBackgroundProps = {
  background?: BackgroundOptions;
};

const defaultProps: ArtBackgroundProps = {
  background: 'hero',
};
export const ArtBackground = (props: ArtBackgroundProps) => {
  const { artBackground } = useAtlasContext();
  const opacityAnimation = useSpring({
    zIndex: artBackground ? 10 : 0,
    opacity: artBackground ? 1 : 0,
    config: { duration: 600 },
    immediate: (key) => key === 'zIndex',
  });

  return (
    <animated.div
      className={`absolute top-0 z-20 w-full h-full bg-center bg-cover bg-${artBackground}`}
      style={opacityAnimation}
    ></animated.div>
  );
};
