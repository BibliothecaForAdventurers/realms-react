import Prism from 'prismjs';
import * as SlateDefault from 'slate';

type POI = {
  id: string;
  assetId?: string;
};

export function extractPOIs(value: string): POI[] {
  // value.match(/\$\{([^}]+)\}/g);
  const matches = value.match(/\$\{[^}]+\}/g);

  if (!matches) {
    return [];
  }

  return matches
    .map((match) => {
      const spl = match.trim().replace('${', '').replace('}', '').split(',');

      if (spl.length === 2) {
        return {
          id: spl[0].trim(),
          assetId: spl[1].trim(),
        };
      }

      return {
        id: spl[0].trim(),
      };
    })
    .filter(
      (value: POI, index, self) =>
        self.findIndex(
          (poi: POI) => poi?.id === value?.id && poi?.assetId === value?.assetId
        ) === index
    );
}

export function shortStringToBigIntUtil(convertableString: string) {
  if (!convertableString) {
    throw new Error('A non-empty string must be provided');
  }

  if (convertableString.length > 31) {
    const msg = `Short strings must have a max of ${31} characters.`;
    throw new Error(msg);
  }

  const invalidChars: { [key: string]: boolean } = {};
  const charArray: string[] = [];
  for (const c of convertableString.split('')) {
    const charCode = c.charCodeAt(0);
    if (charCode > 127) {
      invalidChars[c] = true;
    }
    charArray.push(charCode.toString(16));
  }

  const invalidCharArray = Object.keys(invalidChars);
  if (invalidCharArray.length) {
    const msg = `Non-standard-ASCII character${
      invalidCharArray.length === 1 ? '' : 's'
    }: ${invalidCharArray.join(', ')}`;
    throw new Error(msg);
  }

  return BigInt('0x' + charArray.join(''));
}

export function bigIntToShortStringUtil(convertableBigInt: bigint) {
  return Buffer.from(convertableBigInt.toString(16), 'hex').toString();
}

export function slateToMarkdown(value) {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => SlateDefault.Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join('\n')
  );
}

Prism.languages.markdown = Prism.languages.extend('markup', {});

/* eslint-disable */
Prism.languages.insertBefore('markdown', 'prolog', {
  blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
  code: [
    { pattern: /^(?: {4}|\t).+/m, alias: 'keyword' },
    { pattern: /``.+?``|`[^`\n]+`/, alias: 'keyword' },
  ],
  title: [
    {
      pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
      alias: 'important',
      inside: { punctuation: /==+$|--+$/ },
    },
    {
      pattern: /(^\s*)#+.+/m,
      lookbehind: !0,
      alias: 'important',
      inside: { punctuation: /^#+|#+$/ },
    },
  ],
  hr: {
    pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
    lookbehind: !0,
    alias: 'punctuation',
  },
  list: {
    pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
    lookbehind: !0,
    alias: 'punctuation',
  },
  'url-reference': {
    pattern:
      /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
    inside: {
      variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
      string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
      punctuation: /^[\[\]!:]|[<>]/, // eslint-disable-line regexp/no-useless-escape no-useless-escape
    },
    alias: 'url',
  },
  bold: {
    pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
  },
  italic: {
    pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^[*_]|[*_]$/ },
  },
  url: {
    pattern:
      /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
    inside: {
      variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
      string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
    },
  },
});
(Prism.languages.markdown as any).bold.inside.url = Prism.util.clone(
  Prism.languages.markdown.url
);
(Prism.languages.markdown as any).italic.inside.url = Prism.util.clone(
  Prism.languages.markdown.url
);
(Prism.languages.markdown as any).bold.inside.italic = Prism.util.clone(
  (Prism.languages.markdown as any).italic
);
(Prism.languages.markdown as any).italic.inside.bold = Prism.util.clone(
  (Prism.languages.markdown as any).bold
);
