import { FC } from 'react';

type NotificationProps = {
  message: string | undefined;
  type: 'error' | 'success';
};

const Notification: FC<NotificationProps> = ({ message = '', type }) => {
  return (
    <div className="w-fit mx-auto">
      <div
        className={`text-sm border ${type === 'error' ? 'border-red-400 bg-red-50 text-red-700' : 'border-green-400 bg-green-50 text-green-700'}  text-center py-2 px-4 rounded-sm my-2`}
      >
        {message}
      </div>
    </div>
  );
};

export default Notification;
