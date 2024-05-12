import { FC, useState } from 'react';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
type AccordionProps = {
  title: string;
  description: string;
};

const Accordion: FC<AccordionProps> = ({ title, description }) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div>
      <h3
        className="border-b pb-2 inline-flex justify-between items-center w-full cursor-pointer mb-3 text-sm font-bold"
        onClick={() => setShow((prev) => !prev)}
      >
        {title} {show ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
      </h3>
      {show && <p className="text-sm py-3">{description}</p>}
    </div>
  );
};

export default Accordion;
