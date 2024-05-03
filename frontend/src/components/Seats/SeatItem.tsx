import { FC } from 'react';
import SeatList from './SeatList';

type SeatItemProps = {
  label?: boolean;
  section: string;
  secondSection: string;
};
const SeatItem: FC<SeatItemProps> = ({ label, section, secondSection }) => {
  return (
    <div>
      <div className="flex flex-row gap-2 items-center">
        <div className="flex flex-col gap-2 mt-5 ">
          <p className="text-sm text-center">{section}</p>
          {Array.from({ length: 10 }, (_, id) => {
            return (
              <div key={id} className="inline-flex gap-2 items-center">
                <SeatList />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <p className="text-sm ml-2">{secondSection}</p>
          {Array.from({ length: 10 }, (_, id) => (
            <div key={id} className="inline-flex gap-2 items-center">
              <SeatList />
              {label && <p className="text-sm ml-2">{id + 1}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatItem;
