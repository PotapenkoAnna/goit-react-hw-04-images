import css from './Button.module.css'; 

const button = ({ getMoreImage }) => {
  
  return (
    <button className={css.button} type="button" onClick={getMoreImage}>
      Load more
    </button>
  );
}
 
export default button;    