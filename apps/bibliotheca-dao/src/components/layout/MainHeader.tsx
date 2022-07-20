import BibliothecaBook from '@bibliotheca-dao/ui-lib/icons/BibliothecaBook.svg';
import Discord from '@bibliotheca-dao/ui-lib/icons/social/discord.svg';
import Github from '@bibliotheca-dao/ui-lib/icons/social/github.svg';
import Link from 'next/link';
import { links } from '@/data/Projects';

export const MainHeader = () => {
  const headerElements = [
    // {
    //   title: 'DAO',
    //   icon: <Discord className="self-center w-6 mr-3 fill-current" />,
    // },
    {
      title: 'Staking',
      icon: '',
      link: 'https://staking.bibliothecadao.xyz',
      class: ' hidden sm:block',
    },
    {
      title: 'Discord',
      icon: <Discord className="self-center w-6 fill-current sm:mr-4" />,
      link: links[0].discord,
    },
    {
      title: 'Github',
      icon: <Github className="self-center w-6 fill-current sm:mr-4" />,
      link: links[0].github,
    },
  ];
  return (
    <div className="fixed z-50 flex w-full h-16 px-4 space-x-8 tracking-widest uppercase border-b sm:px-10 bg-gray-900/40 border-off-300">
      {' '}
      <div className="container flex mx-auto">
        <Link href="/">
          <BibliothecaBook className="self-center mr-10 transition-all duration-150 cursor-pointer fill-current h-9 hover:fill-white" />
        </Link>
        <Link href="/treasury">
          <a className='className="flex self-center px-4 mr-auto transition-all duration-150 border rounded border-off-300/20 hover:bg-off-300 hover:text-gray-900'>
            <span className="hidden sm:block"></span> DAO Ξ
          </a>
        </Link>
        <div className="flex space-x-4">
          {headerElements.map((a, index) => {
            return (
              <a
                key={index}
                href={a.link}
                className={`flex self-center px-4 py-1 transition-all duration-150 border rounded border-off-300/20 hover:bg-off-300 hover:text-gray-900 ${a.class}`}
              >
                {a.icon} <span className="hidden sm:block">{a.title}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
