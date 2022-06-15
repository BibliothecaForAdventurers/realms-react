import type { AssetType } from '@/hooks/useAtlasContext';
import { AssetFilters, useAtlasContext } from '@/hooks/useAtlasContext';

export const FlyTo = () => {
  const {
    selectedAssetFilter,
    setSelectedAssetType,
    selectedId,
    setSelectedId,
    gotoAssetId,
  } = useAtlasContext();

  function onChangeId(event: any) {
    let tokenId = parseInt(event.target.value);
    if (tokenId < 1) {
      tokenId = 1;
    } else {
      tokenId = Math.min(selectedAssetFilter.maxId, tokenId);
    }
    setSelectedId(tokenId + '');
  }

  return (
    <div className="absolute flex w-full h-10 px-4 text-xl z-1 bottom-4 sm:top-10 sm:right-2 sm:w-96">
      <input
        placeholder="Type Id"
        type={'number'}
        className="w-3/12 px-4 py-4 text-black rounded-l bg-white/80"
        value={selectedId}
        onChange={onChangeId}
        min="1"
        max={selectedAssetFilter.maxId}
      />
      <button
        className="w-4/12 p-1 px-4 uppercase transition-all duration-300 text-off-100 bg-off-200/20 hover:bg-off-200/60"
        onClick={() => gotoAssetId(selectedId, selectedAssetFilter.value)}
      >
        Fly to
      </button>

      <select
        className="w-5/12 p-1 px-4 mr-2 uppercase transition-all duration-300 rounded-r cursor-pointer text-off-100 bg-off-200/50 font-display"
        value={selectedAssetFilter.value}
        onChange={(event) =>
          setSelectedAssetType(event.target.value as AssetType)
        }
      >
        {AssetFilters.map((assetFilter) => (
          <option key={assetFilter.value} value={assetFilter.value}>
            {assetFilter.name}
          </option>
        ))}
      </select>
    </div>
  );
};
