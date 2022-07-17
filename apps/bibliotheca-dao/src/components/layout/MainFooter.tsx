import BibliothecaBook from '@bibliotheca-dao/ui-lib/icons/BibliothecaBook.svg';
import Image from 'next/image';
import { links } from '@/data/Projects';

const footerLinkStyles = 'hover:underline transition-all duration-300';

export const MainFooter = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-2 p-10 mx-auto mt-10 border-t border-white/20 sm:grid-cols-2 lg:grid-cols-4 sm:p-10">
      <div className="">
        <BibliothecaBook className="self-center fill-current h-36" />
      </div>
      <div className="mb-10 tracking-widest uppercase">
        <h4 className="mb-6">Links</h4>
        <ul>
          <li className={footerLinkStyles}>
            <a href={links[0].website}>The Atlas</a>
          </li>
          <li className={footerLinkStyles}>
            <a href={links[0].treasury}>The Treasury</a>
          </li>
          <li className={footerLinkStyles}>
            <a href={links[0].snapshot}>Snapshot Voting</a>
          </li>
          <li className={footerLinkStyles}>
            <a href={links[0].scroll}>Master Scroll</a>
          </li>
          <li className={footerLinkStyles}>
            <a href={links[0].staking}>Staking</a>
          </li>
          {/* {projects.map((a, index) => {
            return (
              <li className={footerLinkStyles} key={index}>
                {' '}
                <a href={a.website}>{a.name}</a>{' '}
              </li>
            );
          })} */}
        </ul>
      </div>
      <div className="mb-10 tracking-widest uppercase">
        <h4 className="mb-6">Socials</h4>
        <ul>
          <li className={footerLinkStyles}>
            <a href={links[0].twitterBiblio}>Bibliotheca Twitter</a>
          </li>
          <li className={footerLinkStyles}>
            <a href={links[0].twitterRealms}>Realms Twitter</a>
          </li>
          <li className={footerLinkStyles}>
            <a href={links[0].discord}>Discord</a>
          </li>
          {/* {projects.map((a, index) => {
            return (
              <li className={footerLinkStyles} key={index}>
                {' '}
                <a href={a.website}>{a.name}</a>{' '}
              </li>
            );
          })} */}
        </ul>
      </div>
      <iframe
        src="https://discord.com/widget?id=884211910222970891&theme=dark"
        width="350"
        className="max-w-full"
        title="discord-widget"
        height="300"
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>
    </div>
  );
};