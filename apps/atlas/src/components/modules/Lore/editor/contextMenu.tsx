import clsx from 'clsx';

export default function ContextMenu({ items, selectedIndex }) {
  const onClick = (item) => {
    item.doAction();
  };

  if (items.length === 0) {
    return <div className={`p-3`}>No items found</div>;
  }

  return (
    <div className={`py-3`}>
      {items.map((section, index) => {
        return (
          <div
            key={`section_${index}`}
            className={clsx(`px-2`, {
              'mt-2 pt-2 border-t border-gray-800': index !== 0,
            })}
          >
            <div className={`uppercase px-2 text-gray-600 text-md mt-1`}>
              {section.name}
            </div>
            <div className={``}>
              {section.children.map((item) => {
                return (
                  <button
                    key={`section_item_${item.id}`}
                    className={clsx(
                      `block text-left w-full px-2 rounded-lg hover:bg-gray-800 py-2 mt-2 cursor-pointer`,
                      { 'bg-gray-800': selectedIndex === item.id }
                    )}
                    id={`cm_index_${item.id}`}
                    onClick={() => onClick(item)}
                  >
                    <div className={`text-lg leading-none mb-1`}>
                      {item.name}
                    </div>
                    <div className={`text-gray-400 text-sm`}>
                      {item.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
