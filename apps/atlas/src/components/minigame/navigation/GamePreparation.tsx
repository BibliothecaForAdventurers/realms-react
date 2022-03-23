import { ExternalLink } from '@/shared/Icons';
export const GamePreparation = () => {
  return (
    <div className="mt-10">
      <h4 className="text-center font-semibold tracking-widest text-white">
        Get Prepared for the next game
      </h4>
      <div className="bg-white/40 p-4 rounded-md shadow-inner text-gray-500">
        <ul className="text-xl list-none ">
          <li>
            Browse the{' '}
            <a
              target={'_blank'}
              href="https://docs.google.com/document/d/1LcT7QiprYOpK_3LfGN6MRBkqgULw7jQT3dIMSSi2vZg/edit?usp=sharing"
              rel="noreferrer"
              className="underline"
            >
              Game Guide
            </a>
            <ExternalLink className="inline-block h-4 ml-1" />
          </li>
          <li>
            Coordinate on{' '}
            <a
              target={'_blank'}
              href="https://discord.gg/YfeZQ3NFB8"
              className="underline"
              rel="noreferrer"
            >
              Discord
            </a>
            <ExternalLink className="inline-block h-4 ml-1" />
          </li>
          {/* <li>
    <a className="underline">Recruit</a> your friends{' '}
    <span className="p-1 bg-blue-200 rounded">coming soon</span>
  </li> */}
          <li>
            Check the{' '}
            <a
              target={'_blank'}
              href="https://github.com/BibliothecaForAdventurers/realms-react/tree/feat/desiege/apps/atlas/src/components/minigame"
              className="underline"
              rel="noreferrer"
            >
              front-end
            </a>
            <ExternalLink className="inline-block h-4 ml-1" /> and{' '}
            <a
              target={'_blank'}
              href="https://github.com/BibliothecaForAdventurers/realms-contracts/tree/feature/desiege/contracts/desiege"
              className="underline"
              rel="noreferrer"
            >
              StarkNet
            </a>
            <ExternalLink className="inline-block h-4 ml-1" /> contracts
          </li>
        </ul>
      </div>
    </div>
  );
};