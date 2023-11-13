import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onModalOpen }) => {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          onImgClick={onModalOpen}
          image={image}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

