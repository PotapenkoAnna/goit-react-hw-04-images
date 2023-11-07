import css from './Button.module.css'; 

function Button({ handlePageIncrement }) {
  return (
    <button className={css.button} type="button" onClick={handlePageIncrement}>
      Load more
    </button>
  );
}

export default Button;