import ReactMarkdown from 'react-markdown';
import type { LorePoiFragmentFragment } from '@/generated/graphql';
import { poiRemarkPlugin } from './helpers/POIRemarkPlugin';
import { LorePOI } from './LorePOI';

type LoreMarkdownRendererProps = {
  children: any;
  pois?: { [index: string]: LorePoiFragmentFragment };
  poisLoading?: boolean | undefined;
};

export const LoreMarkdownRenderer = ({
  children,
  pois,
  poisLoading,
}: LoreMarkdownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[poiRemarkPlugin]}
      components={{
        div: ({ node, ...props }) => {
          // TODO: it breaks build but it custom plugin for Remark - how to make it TypeScript?
          if (!(props as any).poiId) {
            return <div {...props}>{(node as any).children}</div>;
          }

          const newProps = {
            poiId: (props as any).poiId,
            assetId: (props as any).assetId,
          };

          return <LorePOI {...newProps} />;
        },
      }}
      className={`prose prose-stone prose-sm text-2xl brightness-200`}
    >
      {children}
    </ReactMarkdown>
  );
};
