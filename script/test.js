let API_KEY = 'ac4c9e08848ab50e1bec4063cfd3a7b5';
let BASE_URL='https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API ='https://api.themoviedb.org/3/search/movie?api_key=6bfaa39b0a3a25275c765dcaddc7dae7&query="';
const detailAPI ='https://api.themoviedb.org/3/movie/460465?api_key=6bfaa39b0a3a25275c765dcaddc7dae7&language=en-US';
const movieEl= document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const submitsearch = document.getElementById("searchicon");
const modalEl = document.querySelector('.js-modal');


const displayModal = (movies) => {
    const modal = document.querySelector('.c-modal');
    const closeModal = document.querySelector('.c-modal__close');
    const modalOverlay = document.querySelector('.c-modal__overlay');
    document.getElementById('open-modal').addEventListener('click', (e) => {
        modal.style.display = 'block';
       
    });
    document.querySelector('.c-modal__close').addEventListener('click', (e) => {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        }
        if(e.target.closest(".c-modal")) return;{
            modal.classList.add('u-hide');
        }
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
          }
    }
    console.log(movies);
    if(modalEl==null){
      modalEl.remove();
    }
    modalEl.innerHTML = "";
    movies.forEach((movie) => {
      const modalItem = document.createElement("js-modal");
      modalItem.classList.add("c-modal-wrapper");
      const { title, poster_path, vote_average, overview, release_date } = movie;
      modalItem.innerHTML = `
        <div class="c-modal-wrapper">
        <span class="c-modal__close">&times;</span>
        <img src="https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}" alt="">
        <div class="modal-info">
          <h2 class="c-modal__title">
              ${title}<span class="c-modal__year u-muted">(2022)</span>
              </h2>
              <h2 class="c-modal__tagline">
                  the world needed a hero. it got black adam
              </h2>
              <div class="c-modal__category--movie">
                  2h 50m  <span class="u-muted">Action, Adventure, Family • </span><span class="u-muted">${release_date}</span>
              </div>
            <h3 class="u-text-uppercase u-fs-medium"style="margin-top:15px">story</h3>
            <p class="c-modal__plot">
              ${overview}  
            </p>
      </div>
    </div>`
    modalEl.appendChild(modalItem);
    
    });

    showMovies(data.results);

};

// SHOW MOVIES LIST
const showMovies = (movies) =>{
  console.log(movies);
  movieEl.innerHTML = "";
  movies.forEach((movie) => {
    const IMG_PATH = `https://image.tmdb.org/t/p/w1280/${movie.poster_path}`;
    if(IMG_PATH ==null){
        IMG_PATH =`poser-placeholder.png`;
    }
    const { id,title, poster_path, vote_average, overview } = movie;
    const movieItem = document.createElement("main");
    movieItem.classList.add("c-movie-container");
    movieItem.innerHTML = `
    <div class="c-movie" id="open-modal" data-id =${id}>
    <img  class="c-movie__poster"src="${IMG_PATH}" alt="${title}">
    <h3 class="c-movie__title">
        ${title}
    </h3>
    <span class="c-movie__rating ${getClassByRate(vote_average)}">${vote_average}</span>
    </span>
    </div>
    `;
    movieEl.append(movieItem);
    console.log(id);
  });
  displayModal(movies);
}

// FOR RATE
const getClassByRate = (vote) =>{
  if (vote >= 7.5) {
    return "high";
  } else if (vote >= 5) {
    return "medium";
  } else {
    return "low";
  }
}
// FOR SEARCH SUBMIT
const submitMovie = () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchTerm = search.value;
        if (searchTerm && searchTerm !== "") {
          getAPI(SEARCH_API + searchTerm);
          search.value = "";
        } else {
          window.location.reload();
        }
      });
      // submitsearch.addEventListener("click", (e) =>{
      //   e.preventDefault();
      //   const searchTerm = search.value;
      //   if (searchTerm && searchTerm !== "") {
      //     getAPI(SEARCH_API + searchTerm);
      //     search.value = "";
      //   }else {
      //     window.location.reload();
      //   }
      // });
}



const getAPI = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  showMovies(data.results);
  submitMovie();
  displayModal();
  
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    getAPI(API_URL);
});