import React, { FC } from 'react';

type FooterItemProps<T> = {
  title: string;
  items: T[];
};

const FooterItem: FC<FooterItemProps<T>> = ({ title, items }) => {
  return (
    <div>
      <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start text-sm">
        {title}
      </h6>
      {items.map((item, id) => (
        <p className="mb-4" key={id}>
          <a className="text-neutral-600 dark:text-neutral-200">{item}</a>
        </p>
      ))}
    </div>
  );
};

export default FooterItem;
