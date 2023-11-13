import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onImgClick }) => {

  return (
    <li className={css.item}>
      <img
        className={css.img}
        src={image.webformatURL}
        alt={image.tags}
        data-largeimg={image.largeImageURL}
        onClick={event => {
          onImgClick(event.target.dataset.largeimg);
        }}
      />
    </li>
  );
};

export default ImageGalleryItem;

 