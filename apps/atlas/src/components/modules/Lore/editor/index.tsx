import Prism from 'prismjs';
import React, { useCallback, useMemo } from 'react';
import { Text, createEditor } from 'slate';
import type { Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';
import { Leaf } from './leaf';

type TLoreEditor = {
  className?: string;
  placeholder?: string;
  onChange?: ((value: Descendant[]) => void) | undefined;
};

export const initialValue: any = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export const LoreEditor = ({
  placeholder = 'Write some markdown...',
  onChange,
}: TLoreEditor) => {
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as any)),
    []
  );
  const decorate = useCallback(([node, path]) => {
    const ranges: any[] = [];

    if (!Text.isText(node)) {
      return ranges;
    }

    const getLength = (token) => {
      if (typeof token === 'string') {
        return token.length;
      } else if (typeof token.content === 'string') {
        return token.content.length;
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0);
      }
    };

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
    let start = 0;

    for (const token of tokens) {
      const length = getLength(token);
      const end = start + length;

      if (typeof token !== 'string') {
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        });
      }

      start = end;
    }

    return ranges;
  }, []);

  const onChangeInternal = onChange
    ? (value) => {
        const isAstChange = editor.operations.some(
          (op) => 'set_selection' !== op.type
        );
        if (isAstChange) {
          onChange(value);
        }
      }
    : undefined;

  return (
    <div
      className={`text-white outline-none bg-gray-900 p-4 rounded-md text-lg`}
    >
      <Slate editor={editor} value={initialValue} onChange={onChangeInternal}>
        <Editable
          decorate={decorate}
          renderLeaf={renderLeaf}
          placeholder={placeholder}
        />
      </Slate>
    </div>
  );
};
