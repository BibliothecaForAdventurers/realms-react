import { Button } from '@bibliotheca-dao/ui-lib';
import Ethereum from '@bibliotheca-dao/ui-lib/icons/eth.svg';
import StarkNet from '@bibliotheca-dao/ui-lib/icons/starknet-logo.svg';
import { Popover } from '@headlessui/react';
import { useStarknet, InjectedConnector } from '@starknet-react/core';
import { useMemo } from 'react';
import { removeHexPrefix } from 'starknet/dist/utils/encode';
import { useWalletContext } from '@/hooks/useWalletContext';
import { shortenAddressWidth } from '@/util/formatters';
const NetworkConnectButton = () => {
  const { connectWallet, isConnected, disconnectWallet, displayName, balance } =
    useWalletContext();

  const { account, error, connect, connectors } = useStarknet();
  return (
    <Popover className="relative">
      <Popover.Button as="div">
        <Button variant="primary">
          {' '}
          <StarkNet className={'inline-block w-4 mr-2 -ml-2'} />{' '}
          {account
            ? removeHexPrefix(shortenAddressWidth(account, 4))
            : 'Connect'}
        </Button>{' '}
      </Popover.Button>
      <Popover.Panel className="absolute right-0 z-50 w-64 p-4 mt-2 bg-gray-700 rounded-md">
        <h3>Game Networks</h3>
        {account ? (
          <>
            <p>StarkNet</p>

            <StarkNet className="inline-block w-4 mr-2" />
            {shortenAddressWidth(account, 6)}
          </>
        ) : null}
        {!account ? (
          <>
            <p className="mb-2">StarkNet</p>
            {connectors.map((connector) =>
              connector.available() ? (
                <Button key={connector.id()} onClick={() => connect(connector)}>
                  Connect {connector.name()}
                </Button>
              ) : null
            )}
          </>
        ) : null}

        {error ? <p className="text-red-300">Error: {error.message}</p> : null}

        <hr className="my-4" />
        {isConnected && (
          <>
            {displayName ? (
              <>
                <p>Ethereum</p>

                <Ethereum className="inline-block w-4 mr-2" />
                {displayName}
              </>
            ) : null}
          </>
        )}
        {!isConnected && (
          <>
            <Button
              variant="secondary"
              className="w-full text-xs"
              onClick={connectWallet}
            >
              <Ethereum className="w-4 mr-4" /> Connect Ethereum
            </Button>
            <p className="mt-2 text-xs">
              Connect an Ethereum Wallet to bridge and check balances across
              rollups.
            </p>
          </>
        )}
      </Popover.Panel>
    </Popover>
  );
};

export default NetworkConnectButton;
