import { FC, Fragment, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
type ModalProps = { children: ReactNode; onHideCart: () => void };

const BackDrop = ({ onHideCart }: { onHideCart: () => void }) => {
  return <div className={classes.backdrop} onClick={onHideCart} />;
};
const ModalOverlay = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};
const Modal: FC<ModalProps> = ({ children, onHideCart }) => {
  const portalElement = document.getElementById('overlays');
  if (!portalElement) {
    console.error("Element with id 'overlays' not found in the DOM.");
    return null;
  }
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop onHideCart={onHideCart} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
