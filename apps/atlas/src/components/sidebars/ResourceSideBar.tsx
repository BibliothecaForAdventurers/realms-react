/* import Left from '@bibliotheca-dao/ui-lib/icons/chevron-left.svg';
import Right from '@bibliotheca-dao/ui-lib/icons/chevron-right.svg';
import Menu from '@bibliotheca-dao/ui-lib/icons/menu.svg';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { resources } from '@/util/resources';
import { BaseSideBar } from './BaseSideBar';
type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  resource: Array<string>;
};

export const ResourceSideBar = (props: Props) => {
  const { toggleMenuType, selectedMenuType } = useAtlasContext();
  const [focusResource, setResource] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const list = resources.map((res: any, index) => (
    <button
      key={index}
      className={` text-xs sm:text-lg p-1 mb-4 pl-4 px-4 rounded-xl tracking-widest  mr-4 hover:bg-white/90 hover:text-black transition-all duration-150 py-2 uppercase font-body hover:background-animate bg-white/30 ${
        props.resource.includes(res.trait)
          ? `background-animate ${res.colourClass} `
          : 'text-gray-200'
      } `}
      onClick={() => props.onClick(res.trait)}
    >
      {res.trait}
    </button>
  ));

  const changeResource = (value: any) => {
    setLoaded(false);
    console.log(focusResource);
    if (focusResource === 21 && value > 0) {
      setResource(() => 1);
    } else if (focusResource === 1 && value === -1) {
      setResource(() => 21);
    } else {
      setResource(() => focusResource + value);
    }
  };

  return (
    <BaseSideBar open={selectedMenuType === 'resources'}>
      <div className="z-20 w-full h-screen p-6 pt-10 overflow-auto lg:w-5/12 rounded-r-2xl">
        <button
          className="z-10 p-4 mb-8 transition-all rounded bg-white/20 hover:bg-white/70"
          onClick={() => toggleMenuType('resources')}
        >
          <Menu />
        </button>
        <h1 className="mb-4">Resources</h1>
        <h4 className="mb-4 uppercase">Filter</h4>
        <div className="flex flex-wrap mb-8">{list}</div>
        <div className="flex justify-between">
          <h4 className="self-center mb-4 uppercase">Details</h4>
          <div className="mb-4 space-x-2">
            <button
              className="p-2 rounded-full bg-white/30 hover:bg-white/70"
              onClick={() => changeResource(-1)}
            >
              <Left />
            </button>
            <button
              className="p-2 rounded-full bg-white/30 hover:bg-white/70"
              onClick={() => changeResource(1)}
            >
              <Right />
            </button>
          </div>
        </div>
        {loaded ? (
          <div></div>
        ) : (
          <div className="w-full bg-gray-200 h-96 animate-pulse rounded-xl"></div>
        )}

        <img
          src={resources[focusResource]?.img}
          alt=""
          className={`w-full rounded-xl ${loaded ? '' : 'hidden'}`}
          onLoad={() => setLoaded(true)}
        />
        <div className="py-4">
          <h4>Found on: {resources[focusResource]?.value} Realms</h4>
          <h1 className="sm:mt-2 sm:mb-4">{resources[focusResource]?.trait}</h1>
          <p className="sm:text-2xl">{resources[focusResource]?.description}</p>
        </div>
      </div>
    </BaseSideBar>
  );
};
*/
export {};
