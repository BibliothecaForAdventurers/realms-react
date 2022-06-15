/* import Castle from '@bibliotheca-dao/ui-lib/icons/castle.svg';
import { useGetLoreEntityQuery } from '@/generated/graphql';
import { LoreScrollEntity } from '../modules/Lore/LoreScrollEntity';

export const LoreEntityModal = ({ entityId }) => {
  const { data, loading } = useGetLoreEntityQuery({
    variables: {
      id: entityId,
    },
  });

  const loreEntity = data?.getLoreEntity;

  return (
    <div className={``}>
      {loading && (
        <div className="flex flex-col items-center w-20 gap-2 mx-auto my-40 animate-pulse">
          <Castle className="block w-20 fill-current" />
          <h2>Loading</h2>
        </div>
      )}

      {loreEntity ? <LoreScrollEntity entity={loreEntity} /> : null}
    </div>
  );
};

// Temporary */
export {};
