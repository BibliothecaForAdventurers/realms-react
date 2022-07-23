/* eslint-disable */

import { useEffect, useState } from 'react';
import useKeyPress from '../useKeyPress';

export const HotKeys = {
  Raid: 'r',
  Food: 'f',
  AttackingArmy: 'a',
  DefendingArmy: 'd',
  Buildings: 'b',
  Goblins: 'g',
  Statistics: 's',
  Harvests: 'h',
  Lore: 'l',
  Vault: 'v',
};

export type Subview = keyof typeof HotKeys | null;

const useRealmDetailHotkeys = () => {
  const [subview, setSubview] = useState<Subview>(null);

  const raidPress = useKeyPress(HotKeys.Raid);
  const foodPress = useKeyPress(HotKeys.Food);
  const attackersPress = useKeyPress(HotKeys.AttackingArmy);
  const defendersPress = useKeyPress(HotKeys.DefendingArmy);
  const buildingsPress = useKeyPress(HotKeys.Buildings);
  const goblinPress = useKeyPress(HotKeys.Goblins);
  const statsPress = useKeyPress(HotKeys.Statistics);
  const harvestPress = useKeyPress(HotKeys.Harvests);
  const lorePress = useKeyPress(HotKeys.Lore);
  const vaultPress = useKeyPress(HotKeys.Vault);

  useEffect(() => {
    if (raidPress) {
      subview == 'Raid' ? setSubview(null) : setSubview('Raid');
    }
    if (foodPress) {
      subview == 'Food' ? setSubview(null) : setSubview('Food');
    }
    if (attackersPress) {
      subview == 'AttackingArmy'
        ? setSubview(null)
        : setSubview('AttackingArmy');
    }
    if (defendersPress) {
      subview == 'DefendingArmy'
        ? setSubview(null)
        : setSubview('DefendingArmy');
    }
    if (buildingsPress) {
      subview == 'Buildings' ? setSubview(null) : setSubview('Buildings');
    }
    if (harvestPress) {
      subview == 'Harvests' ? setSubview(null) : setSubview('Harvests');
    }
    if (statsPress) {
      subview == 'Statistics' ? setSubview(null) : setSubview('Statistics');
    }
    if (goblinPress) {
      subview == 'Goblins' ? setSubview(null) : setSubview('Goblins');
    }
    if (lorePress) {
      subview == 'Lore' ? setSubview(null) : setSubview('Lore');
    }
    if(vaultPress) {
      subview == "Vault" ? setSubview(null) : setSubview("Vault")
    }
  }, [
    raidPress,
    foodPress,
    attackersPress,
    defendersPress,
    buildingsPress,
    goblinPress,
    statsPress,
    harvestPress,
    lorePress,
    vaultPress
  ]);

  return {
    subview,
    clear: () => setSubview(null),
    set: (val: Subview) => setSubview(val),
    raidPress,
    foodPress,
    attackersPress,
    defendersPress,
    buildingsPress,
    goblinPress,
    statsPress,
    harvestPress,
    lorePress,
    vaultPress
  };
};

export default useRealmDetailHotkeys;
