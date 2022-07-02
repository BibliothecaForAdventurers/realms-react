import { Button } from '@bibliotheca-dao/ui-lib';
import {
  useStarknet,
  useContract,
  useStarknetInvoke,
  useStarknetCall,
} from '@starknet-react/core';
import Arweave from 'arweave';
import axios from 'axios';
import BN from 'bn.js';
import clsx from 'clsx';
import Prism from 'prismjs';
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Text, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';
import { Contract, defaultProvider } from 'starknet';
import type { Abi } from 'starknet';
import { toBN } from 'starknet/dist/utils/number';
import { bnToUint256, uint256ToBN } from 'starknet/dist/utils/uint256';
import { useWalletContext } from '@/hooks/useWalletContext';
import type { UploadArweaveResponse } from '@/pages/api/lore/upload_arweave';
import erc20Abi from 'abi/l2/erc20.json';
import loreContractABI from '../../../abi/lore/Lore.json';
import { initialValue, LoreEditor } from './editor';
import {
  extractPOIs,
  shortStringToBigIntUtil,
  slateToMarkdown,
} from './helpers';
import { LoreScrollEntity } from './LoreScrollEntity';

enum CREATING_STEPS {
  INITIAL = 0,
  UPLOADING_TO_ARWEAVE = 1,
  ADDING_TO_STARKNET = 2,
  WAITING_FOR_STARKNET = 3,
  DONE = 4,
}

type TEntityJSON = {
  title: string;
  markdown: string;
  excerpt: string;
  owner: string;
  owner_display_name: string;
  pois: any[];
};

const LOCAL_STORAGE_LORE_DRAFT_KEY = 'lore.draft';
const LOCAL_STORAGE_LORE_DRAFT_ARWEAVE_KEY = 'lore.draft.arweaveId';

export const CreateLoreEntity = () => {
  // States
  const isMounted = useRef(false);
  const [entityTitle, setEntityTitle] = useState('');
  const [editorValue, setEditorValue] = useState(initialValue);
  const [entityAuthor, setEntityAuthor] = useState('');
  const [entityExcerpt, setEntityExcerpt] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [creatingStep, setCreatingStep] = useState<CREATING_STEPS>(
    CREATING_STEPS.INITIAL
  );
  const [arweaveId, setArweaveId] = useState<string | null>(null);
  const [starknetTxID, setStarknetTxID] = useState<string | undefined>(
    undefined
  );
  const [formWorking, setFormWorking] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  // const [l2EthBalance, setL2EthBalance] = useState<BN>(new BN(0));

  // Hooks
  const starknet = useStarknet();

  // const {
  //   data: ethBalanceData,
  //   loading: ethBalanceLoading,
  //   refresh,
  // } = useStarknetCall({
  //   contract: new Contract(
  //     erc20Abi as Abi,
  //     '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
  //     starknet.library
  //   ),
  //   method: 'balanceOf',
  //   args: [toBN(starknet.account as string).toString()],
  // });

  // useEffect(() => {
  //   console.log(ethBalanceLoading);

  //   if (ethBalanceData && ethBalanceData[0]) {
  //     setL2EthBalance(ethBalanceData[0]);
  //   }
  // }, [ethBalanceLoading]);

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

  useEffect(() => {
    // if (localStorage.getItem(LOCAL_STORAGE_LORE_DRAFT_KEY)) {
    //   console.log('truueee');
    //   setHasDraft(true);
    // }
    // return () => {
    //   saveDraft();
    // };
  }, []);

  // // Remove arweaveId connection if values are changed
  // useEffect(() => {
  //   if (arweaveId) {
  //     localStorage.removeItem(LOCAL_STORAGE_LORE_DRAFT_ARWEAVE_KEY);
  //     setArweaveId(null);
  //   }

  //   // if (isMounted.current) {
  //   saveDraft();
  //   // } else {
  //   //   isMounted.current = true;
  //   // }
  // }, [
  //   entityTitle,
  //   entityAuthor,
  //   entityExcerpt,
  //   editorValue,
  // ]);

  // // Rest
  // const wait = async (milliseconds: number) => {
  //   return new Promise((resolve, _) => {
  //     setTimeout(resolve, milliseconds);
  //   });
  // };

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

    const args = [
      {
        Part1: part1,
        Part2: part2,
      },
      '0', // kind
      starkinizedPOIs, // pois
      [], // props
    ];

    return invoke({
      args: args,
      metadata: {
        action: 'lore_create_entity',
        arweaveId,
        title: entityTitle,
      },
    });
  };

  const markdown = slateToMarkdown(editorValue);

  const entityData: TEntityJSON = {
    title: entityTitle,
    markdown: markdown,
    excerpt: entityExcerpt,
    owner: starknet.account || '',
    owner_display_name: entityAuthor,
    pois: extractPOIs(markdown),
  };

  const validateEntity = () => {
    const newErrors: string[] = [];

    if (entityTitle.length === 0) {
      newErrors.push('Title should not be empty');
    }

    if (entityTitle.length > 200) {
      newErrors.push('Title should not be more than 200 characters long');
    }

    if (markdown.length === 0) {
      newErrors.push('Markdown body should not be empty');
    }

    if (markdown.length > 30000) {
      newErrors.push('Markdown body should not be than 30k characters');
    }

    if (entityAuthor.length === 0) {
      newErrors.push('Author should not be empty');
    }

    if (newErrors.length === 0) {
      return true;
    }

    setValidationErrors(newErrors);
    return false;
  };

  const restoreDraft = () => {
    let draft: TEntityJSON | null;

    try {
      draft = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_LORE_DRAFT_KEY) || ''
      ) as TEntityJSON;

      // console.log(draft);

      // const draftArweaveId = localStorage.getItem(
      //   LOCAL_STORAGE_LORE_DRAFT_ARWEAVE_KEY
      // );
      // setArweaveId(draftArweaveId);
    } catch (error) {
      draft = null;
      console.log(error);
    }

    if (draft) {
      setEntityTitle(draft.title);
      // setEntityAuthor(draft.owner_display_name); // TODO: add conversion from Markdown to Slate editor format
      setEntityAuthor(draft.owner_display_name);
      setEntityExcerpt(draft.excerpt);
    }

    setHasDraft(false);
  };

  const saveDraft = () => {
    localStorage.setItem(
      LOCAL_STORAGE_LORE_DRAFT_KEY,
      JSON.stringify(entityData)
    );

    if (arweaveId) {
      localStorage.setItem(LOCAL_STORAGE_LORE_DRAFT_ARWEAVE_KEY, arweaveId);
    }
  };

  const deleteDraft = () => {
    localStorage.removeItem(LOCAL_STORAGE_LORE_DRAFT_KEY);
    localStorage.removeItem(LOCAL_STORAGE_LORE_DRAFT_ARWEAVE_KEY);
    setHasDraft(false);
  };

  const clearForm = () => {
    setEntityTitle('');
    setEditorValue(initialValue);
    setEntityAuthor('');
    setEntityExcerpt('');
    setArweaveId(null);
    setStarknetTxID(undefined);
  };

  const createEntity = async () => {
    if (!validateEntity()) {
      return;
    }

    // Clearing
    setValidationErrors([]);
    setFormWorking(false);
    setStarknetTxID(undefined);

    try {
      setCreatingStep(CREATING_STEPS.UPLOADING_TO_ARWEAVE);

      // React Hooks don't update variable instantly so this function scope will not have the latest variable
      let localArweaveId = arweaveId;

      // Conditionally uploading to Arweave
      // Otherwise, a lot of duplicates might appear
      if (!localArweaveId) {
        const arweaveRes = await axios.post<UploadArweaveResponse>(
          '/api/lore/upload_arweave',
          entityData
        );

        // const arweaveRes = {
        //   data: { arweaveId: 'tYVkPSC4ySM69NqDYDXhzbc6EBtq4BgUlOOwvxsPuhk' },
        // };

        localArweaveId = arweaveRes.data.arweaveId;

        setArweaveId(localArweaveId);

        console.log('Set ArweaveId', localArweaveId);
      }

      // Starknet
      setCreatingStep(CREATING_STEPS.ADDING_TO_STARKNET);

      const receipt = await submitEntityToStarknet(localArweaveId);

      // Rejected
      if (!receipt) {
        setCreatingStep(CREATING_STEPS.WAITING_FOR_STARKNET);
        setFormWorking(false);
        return;
      }

      setStarknetTxID(receipt?.transaction_hash);

      deleteDraft();
      clearForm();

      await defaultProvider.waitForTransaction(
        receipt?.transaction_hash as string
      );

      setCreatingStep(CREATING_STEPS.DONE);
    } catch (error) {
      console.log('StarkNet Error', error);
      setCreatingStep(CREATING_STEPS.INITIAL);
    }

    setFormWorking(false);
  };

  // async function lol() {
  //   console.log(
  //     loreContract?.invoke('whitelist_pois', [
  //       [
  //         { id: '1001', is_whitelisted: '1' },
  //         { id: '1002', is_whitelisted: '1' },
  //       ],
  //     ])
  //   );
  // }

  //   try {
  //     const a = await invoke({
  //       args: ['1', ['1000', '1']],
  //     });

  //     console.log(a);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div>
      {/* <div onClick={lol}>asdasd</div> */}
      <div className="flex flex-col gap-1 p-2 mb-2 rounded bg-black/40">
        {hasDraft ? (
          <div className={`bg-green-200 text-black p-2 rounded-md mb-2`}>
            You have saved draft. Do you want to restore it?{' '}
            <button
              className={`border border-black rounded-sm px-3 hover:bg-green-400/75 transition`}
              onClick={restoreDraft}
            >
              Yes
            </button>{' '}
            or{' '}
            <button
              className={`border border-black rounded-sm px-3 hover:bg-green-400/75 transition`}
              onClick={deleteDraft}
            >
              Dismiss
            </button>
          </div>
        ) : null}

        <div>
          <div className={`text-white text-sm uppercase pl-1`}>Title</div>
          <input
            className="w-full px-4 py-4 text-xl font-bold leading-tight tracking-widest text-white rounded appearance-none focus:outline-none bg-gray-800/80"
            type="text"
            value={entityTitle}
            onChange={(ev) => setEntityTitle(ev.target.value)}
            placeholder={`Enter title here...`}
          />
        </div>

        <div className={`mt-2`}>
          <div className={`text-white text-sm uppercase pl-1 mb-1`}>
            Content
          </div>

          <LoreEditor
            className={`text-white outline-none bg-gray-900 p-4 rounded-md`}
            onChange={(value) => {
              setEditorValue(value);
            }}
          />

          <div className={`text-gray-400 text-base rounded-md px-2 mt-1`}>
            Write backslash / to open a context menu or read FAQ
          </div>
        </div>

        <div className={`mt-1`}>
          <div className={`text-white text-sm uppercase pl-1 mr-2 mb-1`}>
            Excerpt
          </div>
          <TextareaAutosize
            className="w-full px-2 py-2 text-lg font-bold leading-tight tracking-widest text-white rounded appearance-none focus:outline-none bg-gray-800/80 overflow-hidden"
            onChange={(ev) => setEntityExcerpt(ev.target.value)}
            value={entityExcerpt}
          />
          <div className={`text-gray-400 text-base rounded-md px-2`}>
            Here you can write a short intro or description what is your story
            about.
          </div>
        </div>

        <div className={`mt-1`}>
          <div className={`text-white text-sm uppercase pl-1 mr-2 mb-1`}>
            Author
          </div>
          <input
            className="w-full px-2 py-2 text-lg font-bold leading-tight tracking-widest text-white rounded appearance-none focus:outline-none bg-gray-800/80"
            type="text"
            value={entityAuthor}
            onChange={(ev) => setEntityAuthor(ev.target.value)}
            placeholder={`Enter your nickname...`}
          />
        </div>

        <div className={`mt-2`}>
          <Button
            variant={`primary`}
            // variant={
            //   creatingStep > 0 || !starknet.account ? 'secondary' : 'primary'
            // }
            size="md"
            disabled={formWorking || !starknet.account}
            onClick={createEntity}
            loading={formWorking}
          >
            {starknet.account ? 'Create scroll' : 'Connect starknet wallet'}
          </Button>
        </div>

        {validationErrors.length === 0 ? null : (
          <div className={`text-red-500 font-bold leading-none mt-2 px-3`}>
            {validationErrors.map((x) => (
              <div key={x} className={`mb-1`}>
                - {x}
              </div>
            ))}
          </div>
        )}

        <div
          className={clsx(`mt-4 relative`, {
            hidden: creatingStep === CREATING_STEPS.INITIAL,
          })}
        >
          <div className={`border-b border-white absolute top-2 w-full`}></div>
          <div
            className={`grid grid-cols-4 gap-2 text-center leading-none mb-2`}
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
                <div className={`mt-2`}>
                  <Button
                    onClick={() => {
                      submitEntityToStarknet(arweaveId);
                    }}
                  >
                    Resubmit Transaction
                  </Button>
                </div>
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

          {arweaveId ? (
            <div>
              Arweave Transaction:{' '}
              <a
                href={`https://viewblock.io/arweave/tx/${arweaveId}`}
                target="_blank"
                rel="noreferrer"
                className={`underline`}
              >
                {arweaveId}
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
              revisions: [
                {
                  title: entityTitle,
                  markdown:
                    entityData.markdown ||
                    '_Start typing in the Editor and preview will appear here..._',
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};
