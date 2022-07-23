import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { animated, useSpring } from 'react-spring';

type Prop = {
  isOpen: boolean;
  children: React.ReactElement[] | React.ReactElement;
  width?: 'w-1/4' | 'w-1/3' | 'w-1/2' | 'w-full';
  container?: HTMLElement;
};

const AtlasSidebar: React.FC<Prop> = (props: Prop) => {
  const { isOpen } = props;

  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
  });

  // Must wait until DOM is ready or might receive
  // Error: Target container is not a DOM element.
  const [domReady, setDomReady] = useState(false);
  useEffect(() => {
    setDomReady(true);
  }, []);

  if (!domReady) {
    return null;
  }

  return ReactDOM.createPortal(
    <animated.div
      className={clsx(
        'absolute top-0 bottom-0 right-0 p-4 bg-gray-800/80 z-20',
        props.width || 'w-1/3'
      )}
      style={animation}
    >
      {props.children}
    </animated.div>,
    props.container || document.getElementById('sidebar-root')!
  );
};

export default AtlasSidebar;
