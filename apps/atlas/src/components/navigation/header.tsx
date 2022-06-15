/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, IconButton } from '@bibliotheca-dao/ui-lib';
import BibliothecaBook from '@bibliotheca-dao/ui-lib/icons/BibliothecaBook.svg';
import BibliothecaDAO from '@bibliotheca-dao/ui-lib/icons/BibliothecaDAO.svg';
import Lords from '@bibliotheca-dao/ui-lib/icons/lords-icon.svg';
import Sword from '@bibliotheca-dao/ui-lib/icons/sword.svg';
import VolumeOff from '@bibliotheca-dao/ui-lib/icons/volume-mute-solid.svg';
import VolumeOn from '@bibliotheca-dao/ui-lib/icons/volume-up-solid.svg';
import { formatEther } from '@ethersproject/units';
import {
  useStarknet,
  useStarknetTransactionManager,
} from '@starknet-react/core';
import Link from 'next/link';
import { useState } from 'react';
import useSound from 'use-sound';
import { useResourcesContext } from '@/context/ResourcesContext';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import NetworkConnectButton from '@/shared/NetworkConnectButton';
import { TxStyles } from '@/shared/Validators/styles';
import { useWalletContext } from '../../hooks/useWalletContext';
export function Header() {
  const { connectWallet } = useWalletContext();
  const { toggleMenuType } = useAtlasContext();
  const { lordsBalance } = useResourcesContext();
  const { transactions } = useStarknetTransactionManager();
  const [soundOn, setSoundOn] = useState(false);
  const [play, { stop }] = useSound(
    '/music/scott-buckley-i-walk-with-ghosts.mp3',
    {
      volume: 0.6,
      loop: true,
    }
  );

  const TxStyle = () => {
    return transactions.length
      ? TxStyles.status[transactions[0].status]
      : 'bg-gray-200';
  };

  return (
    <div className="top-0 left-0 z-40 justify-end hidden shadow-2xl bg-stone-500 sm:flex">
      <div className="flex justify-end w-full px-4 py-4 ml-auto mr-auto space-x-4">
        <div className="self-center mr-auto">
          <Link href={'/'}>
            <span className="flex">
              {' '}
              <BibliothecaBook className="h-5 ml-2 mr-4 stroke-white fill-white" />
              <BibliothecaDAO className="self-center h-5 ml-2 mr-auto stroke-white fill-white" />
            </span>
          </Link>
        </div>

        <div className="self-center mt-2">
          <IconButton
            aria-label="Bank"
            variant="unstyled"
            className="fill-current"
            texture={false}
            onClick={() => {
              if (soundOn) {
                stop();
              } else {
                play();
              }
              setSoundOn((prev) => !prev);
            }}
            icon={
              soundOn ? (
                <VolumeOn className="w-6" />
              ) : (
                <VolumeOff className="w-6" />
              )
            }
            size="lg"
          />
        </div>

        <NetworkConnectButton />

        <span>
          <Button href="/bank" variant="primary">
            <Lords className="w-6" />{' '}
            <span className="pl-4">
              {(+formatEther(lordsBalance)).toFixed(2)}
            </span>
          </Button>
        </span>
        <span>
          <Button variant="primary" onClick={() => toggleMenuType('military')}>
            <Sword className="w-5 stroke-white fill-white" />
          </Button>
        </span>
        <span>
          <Button
            variant="primary"
            className="relative inline-flex"
            onClick={() => toggleMenuType('transactionCart')}
          >
            tx
            <span className="flex w-3 h-3 ml-3">
              <span
                className={`absolute inline-flex w-3 h-3 duration-300 rounded-full opacity-75 ${TxStyle()}`}
              ></span>
              <span
                className={`relative inline-flex w-3 h-3 rounded-full ${TxStyle()}`}
              ></span>
            </span>
          </Button>
        </span>
      </div>
    </div>
  );
}
