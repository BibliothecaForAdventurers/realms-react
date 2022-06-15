import { animated, useSpring } from '@react-spring/web';

type Props = {
  children: React.ReactNode;
  open: boolean;
  style?: string;
};

export const BasePanel = (props: Props) => {
  const animation = useSpring({
    opacity: props.open ? 1 : 0,
    transform: props.open ? `translateY(0)` : `translateY(-200%)`,
    delay: 150,
  });

  return (
    <animated.div
      className="absolute top-0 z-30 w-full h-full bg-center bg-cover"
      style={animation}
    >
      <div
        className={`h-full overflow-y-scroll w-full relative top-0 p-3 sm:p-6 rounded-r-2xl ${props.style}`}
      >
        {props.children}
      </div>
    </animated.div>
  );
};
