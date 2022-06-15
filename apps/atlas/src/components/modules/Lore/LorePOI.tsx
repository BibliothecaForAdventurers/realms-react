import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import type { LorePoiFragmentFragment } from '@/generated/graphql';
import { getRealmQuery, getCryptQuery } from '@/hooks/graphql/queries';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { resources } from '../../../util/resources';
import { theOrders } from '../../../util/theOrders';

const pois = {
  1: { name: 'Scrolls', class: 'bg-red-500' },
  1000: { name: 'Realms', class: 'bg-indigo-500', openDetailsName: 'realm' },
  1001: { name: 'Realms Orders', class: 'bg-indigo-500' },
  1002: { name: 'Realms Resources', class: 'bg-indigo-500' },
  1003: { name: 'Realms Wonders', class: 'bg-indigo-500' },
  1004: { name: 'Realms Resources Exchange (AMM)', class: 'bg-indigo-500' },
  2000: {
    name: 'Crypts and Caverns',
    class: 'bg-orange-500',
    openDetailsName: 'crypt',
  },
  3000: { name: 'Lords', class: 'bg-sky-500' },
};

type LorePOIProps = {
  poiId: string;
  assetId?: string;
  pois?: { [index: string]: LorePoiFragmentFragment };
  poisLoading?: boolean;
};

export const LorePOI = ({
  poiId,
  assetId,
  // pois,
  poisLoading,
}: LorePOIProps) => {
  const { openDetails } = useAtlasContext();

  const openSideBar = () => {
    const openDetailsName = pois[poiId]?.openDetailsName;
    if (assetId && openDetailsName) {
      openDetails(openDetailsName, assetId);
    }
  };

  // if (!poisLoading) {
  //   return null;
  // }

  let poiName;
  let loadQuery = false;
  let query = getRealmQuery;
  let variablesParams = { id: assetId };

  // change the useLazyQuery params if needed
  if (poiId == ('2000' || 'crypt')) {
    query = getCryptQuery;
    variablesParams = { id: assetId };
  }

  const [load, { data }] = useLazyQuery(query, {
    variables: variablesParams,
  });

  // actually set the poiName
  switch (poiId) {
    case '1000':
    case 'realm':
      loadQuery = true;
      poiName = data?.realm?.name;
      break;
    case '1001':
    case 'order':
      // TODO: find better way than parseInt(assetId || "") ?
      poiName = 'the Order of ' + theOrders[parseInt(assetId || '')]?.name;
      break;
    case '1002':
    case 'resource':
      poiName = resources[parseInt(assetId || '')]?.trait;
      break;
    case '1003':
    case 'wonder':
      loadQuery = true;
      poiName = data?.realm?.wonder ? data?.realm?.wonder : 'unlinked wonder';
      break;
    case '2000':
    case 'crypt':
      loadQuery = true;
      poiName = data?.dungeon?.name;
      break;
  }

  // only call useLazyQuery if needed
  useEffect(() => {
    if (loadQuery) {
      load();
    }
  }, []);

  return (
    <button
      className={`rounded-md font-normal underline inline-flex mb-1`}
      onClick={openSideBar}
    >
      {pois && !poiName ? pois[poiId]?.name : null}
      {poiName}
      {assetId ? `[${assetId}]` : null}
    </button>
  );
};
