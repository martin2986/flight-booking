import { FC } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type ToastNotificationProps = {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
};

const ToastNotification: FC<ToastNotificationProps> = ({ message, type }) => {
  const showToastMessage = () => {
    if (type === 'success') toast.success(message, {});
    if (type === 'error') toast.error(message, {});
    if (type === 'info') toast.info(message, {});
    if (type === 'warning') toast.warn(message, {});
  };

  return (
    <div>
      <button onClick={showToastMessage}>Notify</button>
      <ToastContainer position="top-center" hideProgressBar transition={Slide} />
    </div>
  );
};

export default ToastNotification;
