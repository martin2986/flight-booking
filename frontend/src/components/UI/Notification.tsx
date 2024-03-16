import { FC } from 'react';

type NotificationProps = {
  message: string | undefined;
  type: 'error' | 'success';
};

const Notification: FC<NotificationProps> = ({ message = '', type }) => {
  let color;
  if (type === 'error') {
    color = 'red';
  } else if (type === 'success') {
    color = 'green';
  }

  return (
    <div
      className={`text-sm border border-${color}-400 text-center py-2 rounded-sm bg-${color}-50 text-${color}-700`}
    >
      {message}
    </div>
  );
};

export default Notification;
