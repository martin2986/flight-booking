import { FC } from 'react';
import { IoIosClose } from 'react-icons/io';

type DetailModalProps = {
  originDate: string;
  destinationDate: string;
  duration: number;
  origin: string;
  destination: string;
  originTime: string;
  destinationTime: string;
};

const DetailModal: FC<DetailModalProps> = ({
  originDate = '',
  duration = '',
  destinationDate = '',
  destination = '',
  origin = '',
  originTime = '',
  destinationTime = '',
}) => {
  return (
    <div>
      <div>
        <h2>Your journey</h2>
        <IoIosClose />
      </div>
      <div></div>
    </div>
  );
};

export default DetailModal;
