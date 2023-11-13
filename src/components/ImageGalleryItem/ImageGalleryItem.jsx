import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onImgClick }) => {

  return (
    <li className={css.item}>
      <img
        className={css.img}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onImgClick(image.largeImageURL)}    
      />
    </li>
  );
};

export default ImageGalleryItem;

 