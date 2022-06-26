import Prism from 'prismjs';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import type { Descendant } from 'slate';
import { Text, createEditor, Editor, Transforms, Range } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import ContextMenu from './contextMenu';
import { Leaf } from './renderers';
import { BlockKinds, InlineKinds } from './types';

type TLoreEditor = {
  className?: string;
  placeholder?: string;
  onChange?: ((value: Descendant[]) => void) | undefined;
};

type TContextMenuChildren = {
  id: number;
  name: string;
  description: string;
  tags: string[];
  poiId?: number;
  doAction: any;
};

type TContextMenuSections = {
  name: string;
  children: TContextMenuChildren[];
};

const contextMenuItems: TContextMenuSections[] = [
  // {
  //   name: 'POIs: Entities',
  //   children: [
  //     {
  //       id: 0,
  //       name: 'Scroll',
  //       description: `Insert other Lore Scroll's Point-of-Interest`,
  //       tags: ['poi', 'scroll'],
  //       poiId: 1,
  //       doAction: () => {},
  //     },
  //   ],
  // },
  {
    name: 'POIs: Realms',
    children: [
      {
        id: 0,
        name: 'Realms',
        description: `Insert a Realm's Point-of-Interest`,
        tags: ['poi', 'realm', 'realms'],
        poiId: 1000,
        doAction: null,
      },
      {
        id: 0,
        name: 'Realms Order',
        description: `Insert a Realm Order's Point-of-Interest`,
        tags: ['poi', 'realm', 'realms', 'order'],
        poiId: 1001,
        doAction: null,
      },
      {
        id: 0,
        name: 'Realms Resources',
        description: `Insert a Realm Resource's Point-of-Interest`,
        tags: ['poi', 'realm', 'realms', 'resources'],
        poiId: 1002,
        doAction: null,
      },
      {
        id: 0,
        name: 'Realms Wonders',
        description: `Insert a Realm Wonder's Point-of-Interest`,
        tags: ['poi', 'realm', 'realms', 'wonders'],
        poiId: 1003,
        doAction: null,
      },
    ],
  },
  {
    name: 'POIs: Crypts & Caverns',
    children: [
      {
        id: 0,
        name: 'Crypts & Caverns',
        description: `Insert a Crypts & Caverns's Point-of-Interest`,
        tags: ['poi', 'crypts', 'caverns'],
        poiId: 2000,
        doAction: null,
      },
    ],
  },
];

export const initialValue: any = [
  {
    kind: BlockKinds.Paragraph,
    children: [{ text: '' }],
  },
];

export const LoreEditor = ({
  placeholder = 'Write some markdown...',
  onChange,
}: TLoreEditor) => {
  const cmRef = useRef<any>();
  const [cmTarget, setCMTarget] = useState<Range | undefined>();
  const [cmSelectedIndex, setCMSelectedIndex] = useState<number>(0);
  const [cmSearchString, setCMSearchString] = useState<string>('');

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  // const renderElement = useCallback((props) => <Element {...props} />, []);

  const editor = useMemo(
    () => withHistory(withReact(createEditor() as any)),
    []
  );

  useEffect(() => {
    if (cmTarget) {
      // console.log('element');
      const el = cmRef.current;
      const domRange = ReactEditor.toDOMRange(editor, cmTarget);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [editor, cmSelectedIndex, cmSearchString, cmTarget]);

  let contextMenuId = 0;

  // console.log('search string', cmSearchString);

  let filteredCMItems = contextMenuItems;

  if (cmSearchString) {
    filteredCMItems = filteredCMItems
      .map((x) => {
        const children = x.children.filter(
          (item) =>
            item.name.toLowerCase().indexOf(cmSearchString) > -1 ||
            item.description.toLowerCase().indexOf(cmSearchString) > -1
        );

        return { ...x, children };
      })
      .filter((x) => x.children.length !== 0);
  }

  filteredCMItems = filteredCMItems.map((x) => {
    x?.children.forEach((item) => (item.id = contextMenuId++));

    return x;
  });

  filteredCMItems.forEach((x) => {
    x.children.forEach(
      (item) => (item.doAction = () => insertPOI(item.poiId || 0))
    );
  });

  function insertPOI(poiId: number) {
    cmTarget && Transforms.select(editor, cmTarget);
    Transforms.insertText(editor, `\${${poiId}, }`);
    Transforms.move(editor, {
      distance: 1,
      unit: 'character',
      reverse: true,
    });
  }

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

  const onKeyDown = useCallback(
    (event) => {
      if (cmTarget) {
        switch (event.key) {
          case 'ArrowDown': {
            event.preventDefault();
            const nextIndex =
              cmSelectedIndex + 1 >= contextMenuId
                ? cmSelectedIndex
                : cmSelectedIndex + 1;
            setCMSelectedIndex(nextIndex);
            cmRef.current.scrollTop =
              cmRef.current.querySelector(`#cm_index_${nextIndex}`)?.offsetTop -
              10;
            // document.querySelector(`#cm_index_${nextIndex}`)?.scrollIntoView({ });
            break;
          }
          case 'ArrowUp': {
            event.preventDefault();
            const prevIndex = cmSelectedIndex - 1 < 0 ? 0 : cmSelectedIndex - 1;
            setCMSelectedIndex(prevIndex);
            // cmRef.current
            // console.log(
            //   cmRef.current.querySelector(`#cm_index_${prevIndex}`)?.offsetTop
            // );
            cmRef.current.scrollTop =
              cmRef.current.querySelector(`cm_index_${prevIndex}`)?.offsetTop -
              10;
            // document.querySelector(`#cm_index_${prevIndex}`)?.scrollIntoView();
            break;
          }
          case 'Tab':
          case 'Enter': {
            event.preventDefault();

            filteredCMItems.forEach((x) => {
              x.children.forEach((item) => {
                if (item.id === cmSelectedIndex) {
                  item.doAction();
                }
              });
            });

            break;
          }
          case 'Escape': {
            event.preventDefault();
            setCMTarget(undefined);
            break;
          }
        }
      }
    },
    [cmSelectedIndex, cmSearchString, cmTarget]
  );

  const onChangeInternal = (value) => {
    const isAstChange = editor.operations.some(
      (op) => 'set_selection' !== op.type
    );
    if (isAstChange && onChange) {
      onChange(value);
    }

    // Open ContextMenu logic is here
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = Editor.before(editor, start, { unit: 'word' });
      const before = wordBefore && Editor.before(editor, wordBefore);
      const beforeRange = before && Editor.range(editor, before, start);
      const beforeText = beforeRange && Editor.string(editor, beforeRange);
      const beforeMatch = beforeText && beforeText.match(/^\/(\w+)$/);
      const after = Editor.after(editor, start);
      const afterRange = Editor.range(editor, start, after);
      const afterText = Editor.string(editor, afterRange);
      const afterMatch = afterText.match(/^(\s|$)/);

      const charBefore = Editor.before(editor, start, { unit: 'character' });
      const charBeforeRange =
        charBefore && Editor.range(editor, charBefore, start);
      const charBeforeText =
        charBeforeRange && Editor.string(editor, charBeforeRange);

      if (charBeforeText === '/') {
        setCMTarget(charBeforeRange);
        setCMSelectedIndex(0);
        return;
      }

      if (beforeMatch && afterMatch) {
        setCMTarget(beforeRange);
        setCMSearchString(beforeMatch[1]);
        setCMSelectedIndex(0);
        return;
      }
    }

    setCMTarget(undefined);
  };

  return (
    <div
      className={`text-white outline-none bg-gray-900 p-4 rounded-md text-lg`}
    >
      <Slate editor={editor} value={initialValue} onChange={onChangeInternal}>
        <Editable
          decorate={decorate}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
          // renderElement={renderElement}
          placeholder={placeholder}
        />
        {cmTarget && (
          <Portal>
            <div
              ref={cmRef}
              className={`absolute z-100 rounded-lg bg-gray-900 shadow-xl border border-gray-500 max-w-xs max-h-80 overflow-y-auto`}
              style={{
                top: '-9999px',
                left: '-9999px',
                boxShadow: '0 1px 5px rgba(0,0,0,.2)',
              }}
            >
              <ContextMenu
                items={filteredCMItems}
                selectedIndex={cmSelectedIndex}
              />
            </div>
          </Portal>
        )}
      </Slate>
    </div>
  );
};

const Portal = ({ children }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

const withInlineElements = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    // console.log('inline', typeof element.inline !== 'undefined');
    return typeof element.inline !== 'undefined' ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.void ? true : isVoid(element);
  };

  return editor;
};
