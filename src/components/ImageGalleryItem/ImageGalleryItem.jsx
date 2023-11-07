import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ images, handleOpenModal }) {
  return images.map(({ id, tags, webformatURL, largeImageURL }) => (
    <li
      className={css.item}
       key={id}
      onClick={() => handleOpenModal(id, tags, largeImageURL)}
    >
      <img src={webformatURL} alt={tags} className={css.img} />
    </li>
  ));
}

export default ImageGalleryItem;
 