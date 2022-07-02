import { Button } from '@bibliotheca-dao/ui-lib';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import { animated, useSpring } from '@react-spring/web';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { LoreEntityModal } from './LoreEntityModal';
import { RaidResultModal } from './RaidResultModal';

export const BaseModal = () => {
  const { selectedModal, setModal } = useAtlasContext();

  const animation = useSpring({
    opacity: selectedModal ? 1 : 0,
    transform: selectedModal ? `translateY(0)` : `translateY(-200%)`,
    backdropFilter: selectedModal ? `blur(4px)` : `blur(0px)`,
    delay: 150,
  });

  if (!selectedModal) {
    return null;
  }

  let component;

  const props: any = selectedModal.props;

  if (selectedModal.type === 'lore-entity' && props) {
    component = <LoreEntityModal entityId={parseInt(props.id)} />;
  }
  if (selectedModal.type === 'raid-result' && props) {
    component = (
      <RaidResultModal defendId={parseInt(props.defendId)} tx={props.tx} />
    );
  }

  return (
    <animated.div
      className="absolute top-0 z-40 w-full h-full bg-center bg-cover"
      style={animation}
    >
      <div
        className={`h-full overflow-y-auto left-0 w-full lg:w-7/12 relative top-0`}
      >
        <div className={`pt-4 px-4`}>
          <div className="flex justify-end">
            <div className="flex justify-end mb-2 mr-1">
              <Button size="sm" onClick={() => setModal(null)}>
                <Close />
              </Button>
            </div>
          </div>
          {component}
        </div>
      </div>
    </animated.div>
  );
};
