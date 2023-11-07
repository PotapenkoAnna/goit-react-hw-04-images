import { Component } from "react";
import css from "./Searchbar.module.css";

class Searchbar extends Component {
   
  state = {
    searchImages: "",
  };

  handleChangeInput = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmitQuery = (e) => {
    e.preventDefault();
    if (this.state.searchImages.trim(" ") === "") {
      return;
    }

    this.props.onSubmit(this.state.searchImages.toLowerCase());
    this.setState({ searchImages: "" });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmitQuery}>
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
            value={this.state.searchImages}
            onChange={this.handleChangeInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;