import { FC, ReactNode } from 'react';
import { appAction } from '../redux/app/appSlice';
import { useDisPatch } from '../redux/hooks';
import Modal from '../UI/Modal';
import { Buttons } from '../UI/Button';
import { motion } from 'framer-motion';
type DetailModalProps = {
  children: ReactNode;
};

const DetailModal: FC<DetailModalProps> = ({ children }) => {
  const dispatch = useDisPatch();
  const handleHideModal = () => {
    dispatch(appAction.toggleFlightDetail(false));
  };

  return (
    <Modal onHideCart={handleHideModal}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="  fixed items-center text-base-900  z-20 top-24 left-0 right-0 justify-center md:w-2/3 mx-auto md:max-h-full"
      >
        <div className="relative p-4 md:max-h-full mx-auto">
          <div className="relative bg-white rounded-lg shadow b">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Your Journey</h3>
              <span
                onClick={() => dispatch(appAction.toggleFlightDetail(false))}
                className="text-3xl cursor-pointer hover:bg-base-900 hover:text-base-light rounded-full w-9 h-9 inline-flex items-center justify-center transition ease-in-out duration-300"
              >
                &times;
              </span>
            </div>
            {children}

            <div className="p-2 md:p-5 border-t  dark:border-gray-600">
              <Buttons
                className="bg-transparent px-7 rounded-3xl"
                variant="outline"
                onClick={() => dispatch(appAction.toggleFlightDetail(false))}
              >
                Close
              </Buttons>
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default DetailModal;
