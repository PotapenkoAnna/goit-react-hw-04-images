import { Component } from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';   

class App extends Component {
  state = {
    searchQuery: "",
    page: null,
  };

handleSearchQueryOnSubmit = (inputValue) => {
    this.setState({ searchQuery: inputValue, page: 1 });
  };

  handlePageIncrement = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    return ( 
      <div className={css.wrraper}> 
        <Searchbar onSubmit={this.handleSearchQueryOnSubmit} />
        <ImageGallery
          searchQuery={this.state.searchQuery}
          page={this.state.page}
          handlePageIncrement={this.handlePageIncrement}
        />
      </div>
    );
  }
}

export default App;