import { Button, OrderIcon, ResourceIcon } from '@bibliotheca-dao/ui-lib';
import { useRealmContext } from '@/context/RealmContext';
import 'moment-timezone';
import type {
  LoreEntityFragmentFragment,
  RealmFragmentFragment,
} from '@/generated/graphql';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useWalletContext } from '@/hooks/useWalletContext';
import { LoreEntityCard } from '../cards/LoreEntityCard';

interface LoreEntitiesOverviewsProps {
  entities: LoreEntityFragmentFragment[];
}

export function LoreEntitiesOverview(props: LoreEntitiesOverviewsProps) {
  return (
    <div className={`grid grid-cols-2 gap-3`}>
      {props.entities &&
        props.entities.map((loreEntity: LoreEntityFragmentFragment, index) => (
          <LoreEntityCard key={index} entity={loreEntity} />
        ))}
    </div>
  );
}
