import { animated, useSpring } from '@react-spring/web';
import { useBreakpoint } from '@/hooks/useBreakPoint';
type Props = {
  children: React.ReactNode;
  open: boolean;
};

export const BaseSideBar = (props: Props) => {
  const breakpoints = useBreakpoint();

  const responsiveAnimations = {
    sm: props.open ? `translateX(0%)` : `translateX(100%)`,
    md: props.open ? `translateX(0%)` : `translateX(100%)`,
    lg: props.open ? `translateX(58.3333333333%)` : `translateX(100%)`,
    xl: props.open ? `translateX(58.3333333333%)` : `translateX(100%)`,
    '2xl': props.open ? `translateX(58.3333333333%)` : `translateX(100%)`,
  };

  const getMediaQuery = (breakpoints: any) => {
    if (breakpoints['2xl']) {
      return responsiveAnimations['2xl'];
    } else if (breakpoints.xl) {
      return responsiveAnimations.xl;
    } else if (breakpoints.lg) {
      return responsiveAnimations.lg;
    } else if (breakpoints.md) {
      return responsiveAnimations.md;
    } else if (breakpoints.sm) {
      return responsiveAnimations.sm;
    } else {
      return responsiveAnimations.sm;
    }
  };

  const animation = useSpring({
    opacity: props.open ? 1 : 0.7,
    transform: getMediaQuery(breakpoints),
  });

  return (
    <animated.div
      className="absolute top-0 bottom-0 right-0 z-30 w-full max-w-full overflow-x-hidden bg-gray-800/90 "
      style={animation}
    >
      {props.children}
    </animated.div>
  );
};
