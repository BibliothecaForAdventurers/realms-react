import { Button } from '@bibliotheca-dao/ui-lib';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import {
  useStarknet,
  useContract,
  useStarknetInvoke,
} from '@starknet-react/core';
import CodeMirror from '@uiw/react-codemirror';
import Arweave from 'arweave';
import axios from 'axios';
import clsx from 'clsx';
import { useState } from 'react';
import { Contract, defaultProvider } from 'starknet';
import type { Abi } from 'starknet';
import { bnToUint256 } from 'starknet/dist/utils/uint256';
import { useGetLorePoisQuery } from '@/generated/graphql';
import type { UploadArweaveResponse } from '@/pages/api/lore/upload_arweave';
import loreContractABI from '../../../abi/lore/Lore.json';
import { extractPOIs, shortStringToBigIntUtil } from './helpers';
import { LoreScrollEntity } from './LoreScrollEntity';

enum CREATING_STEPS {
  INITIAL = 0,
  UPLOADING_TO_ARWEAVE = 1,
  WAITING_FOR_ARWEAVE = 2,
  ADDING_TO_STARKNET = 3,
  WAITING_FOR_STARKNET = 4,
  DONE = 5,
}

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

export const CreateLoreEntity = () => {
  const starknet = useStarknet();

  const { contract: loreContract } = useContract({
    abi: loreContractABI as Abi,
    address: process.env.NEXT_PUBLIC_LORE_ADDRESS as string,
  });

  const {
    data: createEntityData,
    loading,
    error: starknetError,
    reset,
    invoke,
  } = useStarknetInvoke({
    contract: loreContract,
    method: 'create_entity',
  });

  const [entityTitle, setEntityTitle] = useState('Grug The Dark Lord');

  const [editorValue, setEditorValue] = useState(
    '## When The Realm Stood Still\nThe ${1000, 20} is under siege and the **Dark Forces** are marching as we speak...\n\n${3000, 10000204001012300} is the protector of the ${1000, 20} but Grug (${3000, 12317981274}) is relentless as always.\n\n${1000, 200} has a dangerous cave (${2000, 5677}) containing an artefact that can stop the **Dark Forces** but would our heroes dare to enter it and crawl the cave in time?\n\n## New Era\nSomething is happening to the magic of the known universe... ${1001, 15} noticed it as well when ${1003, 1} shifted the mana flow into the abyss. They observed that resources ${1002, 5} and ${1002, 10} are slowly becoming more rare on the magical ${1004}.\n\nThe ${1, 10} contains all knowledge about the events.\n\n\n'
  );

  // const [isCreating, setIsCreating] = useState(false);
  const [creatingStep, setCreatingStep] = useState<CREATING_STEPS>(
    CREATING_STEPS.INITIAL
  );

  const [arweaveTxID, setArweaveTxID] = useState<string | null>(null);
  const [starknetTxID, setStarknetTxID] = useState<string | undefined>(
    undefined
  );

  const wait = async (milliseconds: number) => {
    return new Promise((resolve, _) => {
      setTimeout(resolve, milliseconds);
    });
  };

  // Arweave can stuck and then throw timeout error after 20 second
  // Doesn't mean that it's not working - just need a different approach here
  const waitForArweave = async (arweaveId: string) => {
    try {
      let arweaveStatus = await arweave.transactions.getStatus(arweaveId);
      console.log(arweaveStatus);

      while (
        arweaveStatus.confirmed === null ||
        (arweaveStatus.confirmed &&
          arweaveStatus.confirmed.number_of_confirmations < 1)
      ) {
        await wait(5000);
        arweaveStatus = await arweave.transactions.getStatus(arweaveId);
        console.log(arweaveStatus);
      }
    } catch (error) {
      await waitForArweave(arweaveId);
    }
  };

  const submitEntityToStarknet = async (arweaveId?) => {
    const submittedArweaveId = arweaveId;

    const part1 = shortStringToBigIntUtil(
      submittedArweaveId.substring(0, submittedArweaveId.length / 2)
    ).toString();
    const part2 = shortStringToBigIntUtil(
      submittedArweaveId.substring(
        submittedArweaveId.length / 2,
        submittedArweaveId.length
      )
    ).toString();

    const starkinizedPOIs = entityData.pois.map((poi) => {
      if (poi.assetId) {
        return { id: poi.id, asset_id: bnToUint256(poi.assetId) };
      }

      return { id: poi.id, asset_id: bnToUint256(0) };
    });

    // console.log(starkinizedPOIs);

    const args = [
      {
        Part1: part1,
        Part2: part2,
      },
      '0', // kind
      starkinizedPOIs, // pois
      [], // props
    ];

    return invoke({ args: args });
  };

  const entityData = {
    title: entityTitle,
    markdown: editorValue,
    pois: extractPOIs(editorValue),
  };

  const createEntity = async () => {
    // Clearing
    setArweaveTxID(null);
    setStarknetTxID(undefined);

    // console.log(entityData);
    try {
      setCreatingStep(CREATING_STEPS.UPLOADING_TO_ARWEAVE);

      const arweaveRes = await axios.post<UploadArweaveResponse>(
        '/api/lore/upload_arweave',
        entityData
      );

      const arweaveId = arweaveRes.data.arweaveId;

      // Waiting for Arweave to mine
      setCreatingStep(CREATING_STEPS.WAITING_FOR_ARWEAVE);
      setArweaveTxID(arweaveId);

      // Wait for Arweave tx to be mined
      await waitForArweave(arweaveId);

      // Starknet
      setCreatingStep(CREATING_STEPS.ADDING_TO_STARKNET);

      const receipt = await submitEntityToStarknet(arweaveId);

      // console.log(receipt)

      setStarknetTxID(receipt?.transaction_hash);

      setCreatingStep(CREATING_STEPS.WAITING_FOR_STARKNET);

      await defaultProvider.waitForTransaction(
        receipt?.transaction_hash as string
      );

      setCreatingStep(CREATING_STEPS.DONE);
    } catch (error) {
      setCreatingStep(CREATING_STEPS.INITIAL);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-1 p-2 mb-2 rounded bg-black/40">
        <div className={`text-white text-sm uppercase pl-1 mt-1`}>Title</div>
        <input
          className="w-full px-4 py-4 mt-2 text-xl font-bold leading-tight tracking-widest text-white rounded appearance-none focus:outline-none bg-gray-800/80"
          type="text"
          value={entityTitle}
          onChange={(ev) => setEntityTitle(ev.target.value)}
          placeholder={`Enter title here...`}
        />
        <div className={`text-white text-sm uppercase pl-1 mt-2`}>Content</div>

        <p className={`bg-gray-800/80 text-white text-xs pl-1 mt-2`}>
          supported 🔗: 1/(scroll), 1000/realm, 1001/order, 1002/resource,
          1003/wonder, 1004/(AMM), 2000/crypt, 3000/(lord/lady)
        </p>
        <CodeMirror
          value={editorValue}
          height="auto"
          theme={oneDark}
          extensions={[markdown(), EditorView.lineWrapping]}
          onChange={(value) => {
            setEditorValue(value);
          }}
        />

        <div>
          <Button
            variant={
              creatingStep > 0 || !starknet.account ? 'secondary' : 'primary'
            }
            size="sm"
            disabled={creatingStep > 0 || !starknet.account}
            onClick={createEntity}
            loading={creatingStep > 0}
          >
            {starknet.account ? 'Create scroll' : 'Connect starknet wallet'}
          </Button>
        </div>

        <div
          className={clsx(`mt-4 relative`, {
            hidden: creatingStep === CREATING_STEPS.INITIAL,
          })}
        >
          <div className={`border-b border-white absolute top-2 w-full`}></div>
          <div
            className={`grid grid-cols-5 gap-2 text-center leading-none mb-2`}
          >
            <div
              className={clsx({
                'text-gray-500':
                  creatingStep !== CREATING_STEPS.UPLOADING_TO_ARWEAVE,
              })}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full mx-auto mb-2`}
              ></div>
              Uploading to Arweave
            </div>
            <div
              className={clsx({
                'text-gray-500':
                  creatingStep !== CREATING_STEPS.WAITING_FOR_ARWEAVE,
              })}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full mx-auto mb-2`}
              ></div>
              Waiting for Arweave
            </div>
            <div
              className={clsx({
                'text-gray-500':
                  creatingStep !== CREATING_STEPS.ADDING_TO_STARKNET,
              })}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full mx-auto mb-2`}
              ></div>
              Adding to StarkNet
            </div>
            <div
              className={clsx({
                'text-gray-500':
                  creatingStep !== CREATING_STEPS.WAITING_FOR_STARKNET,
              })}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full mx-auto mb-2`}
              ></div>
              Waiting for StarkNet
              {starknetError && (
                <Button
                  onClick={() => {
                    submitEntityToStarknet();
                  }}
                >
                  Resubmit Starknet Transaction
                </Button>
              )}
            </div>
            <div
              className={clsx({
                'text-gray-500': creatingStep !== CREATING_STEPS.DONE,
              })}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full mx-auto mb-2`}
              ></div>
              Done
            </div>
          </div>

          {arweaveTxID ? (
            <div>
              Arweave Transaction:{' '}
              <a
                href={`https://viewblock.io/arweave/tx/${arweaveTxID}`}
                target="_blank"
                rel="noreferrer"
                className={`underline`}
              >
                {arweaveTxID}
              </a>
            </div>
          ) : null}
          {starknetTxID ? (
            <div>
              StarkNet Transaction:{' '}
              <a
                href={`https://goerli.voyager.online/tx/${starknetTxID}`}
                target="_blank"
                rel="noreferrer"
                className={`underline`}
              >
                {starknetTxID}
              </a>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1 p-2 mb-4 rounded bg-black/40">
        <div className={`text-white text-sm uppercase pl-1 mt-1`}>Preview</div>
        <div>
          <LoreScrollEntity
            entity={{
              revisions: [{ title: entityTitle, markdown: editorValue }],
            }}
          />
        </div>
      </div>
    </div>
  );
};
