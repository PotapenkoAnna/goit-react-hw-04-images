import css from './Modal.module.css';
import Loader from '../Loader/Loader';

function Modal({ url, tags, hideModal }) {
  window.addEventListener("keydown", hideModal);
  return (
    <div className={css.overlay} onClick={hideModal}>
      <div className={css.modalLoader}>
        <Loader />
      </div>
      <div className={css.modal}>
        <img src={url} alt={tags} className={css.modalImg} />
      </div>
    </div>  
  );
}

export default Modal;


