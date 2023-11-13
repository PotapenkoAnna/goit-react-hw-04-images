import {useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button'
import Modal from './Modal/Modal'
import Loader from './Loader/Loader';
import css from './App.module.css';   
import axios from 'axios'; 

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageUrl, setlargeImageUrl] = useState('');

   useEffect(() => {
    const makeApiCall = () => {
      if (!query) {
        return;
      }

      const PER_PAGE = 12;
      const API_KEY = '40277223-6e47b6051d1728ad5e673f158';
      const searchUrl = `https://pixabay.com/api/?q=${encodeURIComponent(
      query
    )}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

      setIsLoading(true);
    axios.get(searchUrl).then(response => {
      const totalPages = Math.round(response.data.totalHits / PER_PAGE);
      const loadedImages = response.data.hits;
      setTotalPages(totalPages);
      setImages(prevImages => [...prevImages, ...loadedImages]);
      setIsLoading(false);
    });
  };
    makeApiCall();
  }, [query, page]);

const handleSearch = searchValue => {
    if (searchValue !== '') {
      if (searchValue !== query) {
        setQuery(searchValue);
        setPage(1);
        setImages([]);
      } else {
       setQuery(searchValue);
      }
    }
   };

 const handleImageClick = largeImageUrl => {
     setlargeImageUrl(largeImageUrl);
     setIsModalOpen(true);
   };

   const handleModalClickClose = event => {
     if (event.target.id === 'modal' && isModalOpen) {
    setIsModalOpen(false);
     }
   };

   const handleModalClose = () => {
    setIsModalOpen(false);
   };
   
 const  fetchMoreImages = () => {
    setPage(prevPage => prevPage + 1);
   };
   
    return ( 
      <div className={css.wrraper}> 
        <Searchbar onSubmit={handleSearch} />
        <ImageGallery
          images={images}
          onModalOpen={handleImageClick}
        />
        {isModalOpen && (
          <Modal
            largeImageUrl={largeImageUrl}
            onClose={handleModalClose}
            onClickClose={handleModalClickClose}
            id={images.id}
          />
        )}
        {isLoading && (
          <Loader />
           )}
        {totalPages > 1 &&
          page < totalPages && (
            <Button getMoreImage={fetchMoreImages} />
          )}
      </div>
    );
  } 

export default App;