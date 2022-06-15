import { OrderIcon } from '@bibliotheca-dao/ui-lib';
import { Combobox } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { SearchFilter } from '@/components/filters/SearchFilter';
interface HeaderProps {
  title: string;
  // icon: string;
  realmId: number;
  order: string;
  onSubmit: (value: string) => void;
}

// const realms = [
//   { id: 1, name: 'smutmum' },
//   { id: 2, name: 'rektum' },
//   { id: 3, name: 'sdfascasdf' },
//   { id: 4, name: 'shoshoshun' },
// ];

export const RealmBannerHeading = (props: HeaderProps) => {
  const realms = [{ id: props.realmId, name: props.title }];
  const [selectedRealm, setSelectedRealm] = useState(realms[0]);
  const [query, setQuery] = useState('');

  const filteredRealms =
    query === ''
      ? realms
      : realms.filter((realm) => {
          return realm.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div
      className={`bg-opacity-90 flex flex-wrap pl-8 pr-4 p-4  rounded shadow bg-order-${props.order
        .replace('the ', '')
        .replace('the_', '')} text-order-secondary-${props.order
        .replace('the ', '')
        .replace('the_', '')}`}
    >
      <div className="flex justify-between w-full text-2xl tracking-widest text-center uppercase ">
        <div
          className={`absolute z-10 flex justify-center w-12 h-32 -mt-4 bg-white border-4 border-order-${props.order
            .replace('the ', '')
            .replace('the_', '')} border-double rounded-b-full shadow-xl`}
        >
          <OrderIcon
            withTooltip
            className="self-center mt-auto text-white stroke-white fill-white"
            size={'md'}
            order={props.order.toLowerCase()}
          />
        </div>
        <div className="self-center mx-auto">
          <h1 className="font-lords">{props.title}</h1>
        </div>

        <SearchFilter
          placeholder="SEARCH BY ID"
          onSubmit={(value) => {
            props.onSubmit(parseInt(value) ? value : '');
          }}
          defaultValue={props.realmId.toString()}
        />
      </div>
    </div>
  );
};
