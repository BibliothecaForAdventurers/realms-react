import clsx from 'clsx';
import { InlineKinds } from './types';

export const Leaf = ({ attributes, children, leaf }) => {
  console.log(leaf);

  return (
    <span
      {...attributes}
      className={clsx({
        bold: leaf.bold,
        italic: leaf.italic,
        'text-2xl font-bold text-orange-600': leaf.title,
      })}
    >
      {children}
    </span>
  );
};

// export const Element = (props) => {
//   const { attributes, children, element } = props;
//   // console.log(element);

//   if

//   switch (element.kind) {
//     case InlineKinds.POI:
//       return <POI {...props} />;

//     default:
//       return <span {...attributes}>{children}</span>;
//   }
// };

// function POI() {
//   return <span contentEditable={false}>asdasd</span>;
// }
