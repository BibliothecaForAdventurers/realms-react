import { ENQUEUED_STATUS } from '@/constants/index';
import { Entrypoints as BuildingMethods } from './useBuildings';
import { Entrypoints as ResourceMethods } from './useResources';

type TxWithMetadata = { status: string; metadata?: any };

interface TxMessage {
  title: string;
  description: string;
}

export function getTxMessage(tx: TxWithMetadata): TxMessage {
  const isQueued = tx.status == ENQUEUED_STATUS;

  const metadata = tx.metadata;

  if (metadata.title && metadata.description) {
    return metadata;
  }

  if (metadata?.action) {
    switch (metadata.action) {
      case 'mint':
        return {
          title: 'Minting',
          description: `Terraforming realm ${metadata.realmId}.`,
        };

      case 'settle':
        return {
          title: 'Settling',
          description: `Realm #${metadata.realmId} is being populated.`,
        };

      case 'unsettle':
        return {
          title: 'Unsettling',
          description: `Abandoning realm #${metadata.realmId}.`,
        };

      case ResourceMethods.claim:
        return {
          title: `${isQueued ? 'Harvest' : 'Harvesting'} Resources`,
          description: `Serfs gathering resources on Realm #${tx.metadata.realmId}.`,
        };

      case BuildingMethods.build:
        return {
          title: isQueued ? 'Construct Building' : 'Constructing Building',
          description: `Realm #${metadata.realmId} ${
            isQueued ? 'commanded to build' : 'has commenced'
          } building ${metadata.buildingId}`,
        };

      case 'upgrade_resource':
        return {
          title: 'Upgrading Resource',
          description: `Realm ${metadata.realmId} is increasing production of ${metadata.resourceId}.`,
        };

      case 'build_troops':
        return {
          title: `Building Troops`,
          description: `Realm #${metadata.realmId} is summoning an army.`,
        };
      case 'raid':
        return {
          title: `Raiding Realm #${metadata.defendingRealmId}`,
          description: `Realm #${metadata.realmId} has mobilised their army for an attack.`,
        };

      default:
        return { title: 'No Title', description: 'No Message' };
    }
  } else {
    return { title: 'No Title', description: 'No Message' };
  }
}
