import css from './Modal.module.css';
import { useEffect } from 'react';

const Modal = props => {
    useEffect(() => {
        const handleKeyPress = event => {
            if (event.keyCode === 27) {
                props.onClose();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.addEventListener('keydown', handleKeyPress);
        };
    }, [props]);
  
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      props.onClickClose() 
    }
  }
   
  return (
    <div id="modal" onClick={handleClose} className={css.overlay}>
      <div className={css.modal}>
        <img
          src={props.largeImageUrl}
          alt={props.id}
          className={css.modalImg} />
      </div>   
    </div>  
  );
}

export default Modal;


