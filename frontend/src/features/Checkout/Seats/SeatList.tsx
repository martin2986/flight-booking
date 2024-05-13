import { useState } from 'react';

import { IoCloseOutline } from 'react-icons/io5';
const SeatList = () => {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <div
      className={` w-6 h-6 cursor-pointer rounded inline-flex items-center justify-center ${selected ? 'bg-gray-200' : 'bg-indigo-500'} `}
      onClick={() => setSelected((prev) => !prev)}
    >
      {selected && <IoCloseOutline className=" text-xl" />}
    </div>
  );
};

export default SeatList;
