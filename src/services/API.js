const API_KEY = '40277223-6e47b6051d1728ad5e673f158'; 

function fetchImages(query, page) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();  
    } 

    return Promise.reject(new Error("Oops, something went wrong!"));
  });
}

const api = {fetchImages}; 

export default api; 