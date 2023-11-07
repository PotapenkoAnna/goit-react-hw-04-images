import { Component } from "react";
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import API from '../../services/API';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
    state = {
    images: [],
    status: "idle",
    moreBtnShow: false,
    error: null,

    modal: {
      modalShow: false,
      url: null,
      tags: null,
    },
  };

  componentDidUpdate(prevProps) {
    const { searchQuery, page } = this.props;

    if (prevProps.searchQuery !== searchQuery || prevProps.page !== page) {
      this.setState({ status: "pending" }); 

      return API
        .fetchImages(searchQuery, page)
        .then((data) => {
          this.setState((prevState) => ({
            images:
              prevState.images && page > 1
                ? [...prevState.images, ...data.hits]
                : data.hits,
            status: "resolved",
            moreBtnShow:
              prevProps.searchQuery === searchQuery
                ? prevState.images.length + data.hits.length !== data.totalHits
                : data.totalHits > 12,
          }));

          this.scrollTo();
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  scrollTo = () => {
    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  showModal = (id, tags, url) => {
    if (this.state.images.find((image) => image.id === id)) {
      document.querySelector("body").style.overflowY = "hidden";
      this.setState({ modal: { modalShow: true, url, tags } });
    }
  };

  hideModal = (e) => {
    if (e.currentTarget === e.target || e.key === "Escape") {
      document.querySelector("body").style.overflowY = "visible";
      this.setState({ modal: { modalShow: false } });
      window.removeEventListener("keydown", this.hideModal);
    }
  };

  render() {
    const {
      images,
      status,
      moreBtnShow,
      error,
      modal: { modalShow, url, tags },
    } = this.state;

    if (status === "idle") {
      return <h1 className={css.title}>What are you interested now?</h1>;
    }

    if (status === "pending") {
      return (
        <>
          {this.props.page === 1 ? (
            <Loader />
          ) : (
            <>
              <ul className={css.gallery}>
                <ImageGalleryItem
                  images={images}
                  handleOpenModal={this.showModal}
                />
              </ul> 
              <Loader /> 
            </>
          )}
        </>
      );
    }

    if (status === "resolved") {
      if (images.length === 0) {
        return (
          <p className={css.message}>
            Nothing was found, please try another request!
          </p>
        );
      }

      return (
        <>
          <ul className={css.gallery}>
            <ImageGalleryItem
              images={images}
              handleOpenModal={this.showModal}
            />
          </ul>
          {moreBtnShow && (
            <Button handlePageIncrement={this.props.handlePageIncrement} />
          )}
          {modalShow && (
            <Modal url={url} tags={tags} hideModal={this.hideModal} />
          )}
        </>
      );
    }

    if (status === "rejected") {
      return <h1 className={css.error}>{error.message}</h1>;
    }
  }
}

export default ImageGallery;   