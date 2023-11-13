import {useState } from 'react';
import css from "./Searchbar.module.css";

const Searchbar = props => {
  const [searchValue, setSearchValue] = useState('');
  
   const handleChangeInput = event => {
    setSearchValue(event.target.value);
    };

   const handleSubmitQuery = event => {
    event.preventDefault();
    props.onSubmit(searchValue);
    }; 

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSubmitQuery}>
          <button type="submit" className={css.button}>
            <span className={css.label}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus 
            placeholder="Search images and photos"
            name="searchImages"
            value={searchValue}
            onChange={handleChangeInput}
          />
        </form>
      </header>
    );
  }

export default Searchbar;

