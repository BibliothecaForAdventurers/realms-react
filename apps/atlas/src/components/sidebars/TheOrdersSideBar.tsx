/* import { OrderIcon } from '@bibliotheca-dao/ui-lib';
import Left from '@bibliotheca-dao/ui-lib/icons/chevron-left.svg';
import Right from '@bibliotheca-dao/ui-lib/icons/chevron-right.svg';
import Menu from '@bibliotheca-dao/ui-lib/icons/menu.svg';
import { useState } from 'react';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { orderDetails } from '@/util/theOrders';
import { BaseSideBar } from './BaseSideBar';

export const TheOrdersSideBar = () => {
  const { toggleMenuType, selectedMenuType, gotoAssetId } = useAtlasContext();
  const [focusOrder, setOrder] = useState<number>(0);

  const changeOrder = (value: any) => {
    if (focusOrder === 15 && value > 0) {
      setOrder(() => 1);
    } else if (focusOrder === 1 && value === -1) {
      setOrder(() => 15);
    } else {
      setOrder(() => focusOrder + value);
    }
  };

  return (
    <BaseSideBar open={selectedMenuType === 'orders'}>
      <div className="z-20 w-full h-screen p-6 pt-10 overflow-auto sm:w-1/3 rounded-r-2xl">
        <button
          className="z-10 p-4 mb-8 transition-all rounded bg-white/20 hover:bg-white/70"
          onClick={() => toggleMenuType('orders')}
        >
          <Menu />
        </button>
        <div className="flex justify-between">
          <h4 className="self-center mb-4 uppercase">Order Details</h4>
          <div className="mb-4 space-x-2">
            <button
              className="p-2 rounded-full bg-white/30 hover:bg-white/70"
              onClick={() => changeOrder(-1)}
            >
              <Left />
            </button>
            <button
              className="p-2 rounded-full bg-white/30 hover:bg-white/70"
              onClick={() => changeOrder(1)}
            >
              <Right />
            </button>
          </div>
        </div>
        <div className="py-4">
          <OrderIcon size="md" order={orderDetails[focusOrder]?.order} />

          <h1 className="mt-2 mb-4 capitalize">
            Order of {orderDetails[focusOrder]?.order}
          </h1>
          <h4 className="my-2 font-semibold uppercase font-body">
            Attunement: {orderDetails[focusOrder]?.attunement}
          </h4>
          <p className="sm:text-2xl">{orderDetails[focusOrder]?.description}</p>
          <hr className="my-4" />
          <h4 className="my-2 mt-4 font-semibold uppercase font-body">
            Order Wonders
          </h4>

          <div className="flex flex-wrap">
            {orderDetails[focusOrder]?.wonders.name.map((a: any, index) => {
              return (
                <div key={index} className="px-2 mb-2">
                  <button
                    className="p-4 rounded sm:text-xl hover:bg-white/60 bg-white/20 font-display "
                    onClick={() =>
                      gotoAssetId(
                        orderDetails[focusOrder]?.wonders.realm_id[index],
                        'realm'
                      )
                    }
                  >
                    <span className="text-xl sm:text-3xl">{a}</span>

                    <br />
                    <span>
                      {orderDetails[focusOrder]?.wonders.realm_name[index]} |{' '}
                      {orderDetails[focusOrder]?.wonders.realm_id[index]}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
          <hr className="my-4" />
          <h4 className="my-2 mt-4 font-semibold uppercase font-body">
            Order Genesis Adventurers
          </h4>
          <div className="flex flex-wrap">
            {orderDetails[focusOrder]?.notable_gas.name.map((a, index) => {
              return (
                <a
                  className="px-4 py-2 mb-2 mr-2 uppercase rounded sm:text-xl hover:bg-white/60 bg-white/20 font-display"
                  target={'_blank'}
                  href={orderDetails[focusOrder]?.notable_gas.link[index]}
                  rel="noreferrer"
                  key={index}
                >
                  {a}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </BaseSideBar>
  );
};
*/
export {};
