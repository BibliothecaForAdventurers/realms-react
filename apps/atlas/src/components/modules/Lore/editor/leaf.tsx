import clsx from 'clsx';

export const Leaf = ({ attributes, children, leaf }) => {
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
