import { Button, OrderIcon, ResourceIcon } from '@bibliotheca-dao/ui-lib';
import Moment from 'react-moment';
import { useRealmContext } from '@/context/RealmContext';
import 'moment-timezone';
import type {
  LoreEntityFragmentFragment,
  RealmFragmentFragment,
} from '@/generated/graphql';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useWalletContext } from '@/hooks/useWalletContext';

interface LoreEntitiesOverviewsProps {
  entities: LoreEntityFragmentFragment[];
}

const kinds = {
  0: 'Scrolls',
  1: 'Canvases',
};

export function LoreEntitiesOverview(props: LoreEntitiesOverviewsProps) {
  const { setModal } = useAtlasContext();

  return (
    <div className={`grid grid-cols-2 gap-3`}>
      {props.entities &&
        props.entities.map((loreEntity: LoreEntityFragmentFragment, index) => (
          <div
            key={index}
            className={`px-3 py-2 pb-4 rounded-md text-black cursor-pointer`}
            style={{
              background: 'rgba(255, 255, 255, 0.35)',
              boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
            }}
            onKeyUp={() => ({})}
            role="button"
            tabIndex={0}
            onClick={() => {
              setModal({
                type: 'lore-entity',
                props: { id: loreEntity.id },
              });
            }}
          >
            <div className={`flex justify-between mb-3`}>
              <div>
                <div className={`flex`}>
                  <div className={`mr-2 border border-gray-700 px-2`}>
                    #{loreEntity.id}
                  </div>
                  <Moment format="DD/MM/YYYY">
                    {loreEntity.revisions[0]?.createdAt}
                  </Moment>
                </div>
              </div>
            </div>
            <h1 className={`text-3xl`}>{loreEntity.revisions[0]?.title}</h1>
            {loreEntity.revisions[0]?.excerpt}
          </div>
        ))}
    </div>
  );
}

{
  /* <div
            key={index}
            className="flex flex-wrap items-center justify-between w-full h-auto max-w-full p-4 overflow-x-auto text-xl rounded bg-black/80"
          >
            <div className={`flex`}>
              <div className={`mr-2 border border-gray-700 px-2`}>
                #{loreEntity.id}
              </div>
              <div>{loreEntity.revisions[0].title}</div>
            </div>
            <div className={`flex items-center`}>
              <div className={`text-sm`}>{kinds[loreEntity.kind]}</div>
              <div className={`ml-4`}>
                <Button
                  onClick={() => {
                    setModal({
                      type: 'lore-entity',
                      props: { id: loreEntity.id },
                    });
                  }}
                  variant="default"
                  size="sm"
                  className="w-full uppercase"
                >
                  Read
                </Button>
              </div>
            </div>
          </div> */
}
