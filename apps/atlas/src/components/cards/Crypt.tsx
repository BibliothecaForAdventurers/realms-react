import Image from 'next/image';
import type { ReactElement } from 'react';
import React from 'react';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { useEnsResolver } from '@/hooks/useEnsResolver';
import { MarketplaceByPanel } from '@/shared/MarketplaceByPanel';
import {
  isLegendary,
  legendaryColourClass,
  findEnvironment,
} from '@/util/cryptsEnvironments';
import type { CryptProps } from '../../types';
const variantMaps: any = {
  small: { heading: 'lg:text-2xl', regions: 'lg:text-xl' },
};

export function Crypt(props: CryptProps): ReactElement {
  const { gotoAssetId } = useAtlasContext();

  const ensData = useEnsResolver(props.crypt.currentOwner.address);

  const image = props.crypt.svg;

  const environment = findEnvironment(props.crypt.environment);

  return (
    <div className="z-10 w-full h-auto p-1 text-white rounded-xl">
      {props.loading ? (
        <div className="">
          <div className="w-full h-64 pt-20 mb-4 rounded bg-white/40 animate-pulse" />
          <div className="w-full h-32 pt-20 mb-4 rounded bg-white/40 animate-pulse" />
          <div className="w-full h-32 pt-20 rounded bg-white/40 animate-pulse" />
        </div>
      ) : (
        <div className="pt-4">
          <div className="w-full">
            <Image
              src={`data:image/svg+xml;base64,${btoa(image as string)}`}
              alt=""
              width="900"
              height="900"
              layout={'responsive'}
            />
          </div>

          <div className="mt-8">
            <h2
              className={
                `mt-2 mb-4 ` +
                  (props.size ? variantMaps[props.size].heading : '') +
                  isLegendary(props.crypt.name) ===
                "'"
                  ? legendaryColourClass
                  : ''
              }
            >
              {props.crypt.name}
            </h2>
            {props.crypt.currentOwner && (
              <h3 className="my-3">{ensData.displayName}</h3>
            )}
            <div className="flex flex-col flex-wrap justify-between my-4 rounded sm:flex-row">
              <h4>
                Id: <span className="">{props.crypt.id}</span>
              </h4>
              <h4>
                <span
                  className={`px-4 py-1 rounded ${environment?.colourClass.main}`}
                >
                  {environment?.name}
                </span>
              </h4>
              <h4>
                Size:{' '}
                <span>
                  {props.crypt.size}x{props.crypt.size}
                </span>
              </h4>
            </div>
            <div className="flex justify-between">
              {props.flyto && (
                <div className="self-center text-lg">
                  <button
                    className={
                      'bg-white/20 rounded px-4 uppercase hover:bg-white/40'
                    }
                    onClick={() => {
                      gotoAssetId(props.crypt.id, 'crypt');
                    }}
                  >
                    fly to
                  </button>
                </div>
              )}
            </div>

            <div
              className={
                `grid grid-cols-2 gap-4 w-full uppercase font-display` +
                (props.size ? variantMaps[props.size]?.regions : '')
              }
            >
              <div>
                <span>Doors: {props.crypt.numPoints} / 13</span>
                <div className="w-full my-2 bg-gray-200 rounded">
                  <div
                    className={`h-2 bg-yellow-700/60 rounded-xl ${environment?.colourClass.door}`}
                    style={{
                      width: `${((props.crypt.numPoints as any) / 13) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <span className="pt-1">POI: {props.crypt.numDoors} / 12</span>
                <div className="w-full my-2 bg-gray-200 rounded">
                  <div
                    className={`h-2 bg-green-500/60 rounded-xl ${environment?.colourClass.point}`}
                    style={{
                      width: `${((props.crypt.numDoors as any) / 12) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <MarketplaceByPanel
              id={props.crypt.id}
              address={'0x86f7692569914b5060ef39aab99e62ec96a6ed45'}
            />
          </div>
        </div>
      )}
    </div>
  );
}
