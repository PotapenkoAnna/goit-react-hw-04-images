import {useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button'
import Modal from './Modal/Modal'
import Loader from './Loader/Loader';
import css from './App.module.css';   
 
import api from '../services/API';     

const App = () => { 
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageUrl, setlargeImageUrl] = useState('');

   useEffect(() => {
    const makeApiCall = async () => { 
      if (!query) {
        return;
      }

      const PER_PAGE = 12;

      try {
        setIsLoading(true);

        const response = await api.fetchImages(query, page);
        const totalPages = Math.round(response.totalHits / PER_PAGE);
        const loadedImages = response.hits;

      setTotalPages(totalPages);
      setImages(prevImages => [...prevImages, ...loadedImages]);
      setIsLoading(false);
    } catch (error) {
        console.error('Error fetching images:', error.message);
        setIsLoading(false);
      }
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

   const handleModalClickClose = () => { 
     setIsModalOpen(false);
     setlargeImageUrl("")
   }; 

  // const handleModalClose = () => {
  //  setIsModalOpen(false);
  // };
    
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
//            onClose={handleModalClose}
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