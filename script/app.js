let API_KEY = "ac4c9e08848ab50e1bec4063cfd3a7b5";
let BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=6bfaa39b0a3a25275c765dcaddc7dae7&query="';
const detailAPI =
  "https://api.themoviedb.org/3/movie/460465?api_key=6bfaa39b0a3a25275c765dcaddc7dae7&language=en-US";

const movieEl = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const submitsearch = document.getElementById("searchicon");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentBtn = document.getElementById("current");

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current = document.getElementById("current");

const modalEl = document.querySelector(".js-modal");
const modalCloseBtn = document.querySelector(".js-close");
const modalTitle = document.querySelector(".c-modal__title");
const modalImg = document.querySelector(".c-movie__poster");
const modelWrapper = document.querySelector(".c-modal-wrapper");
const modalOverview = document.querySelector(".c-modal__plot");
const ModalBackdrop = document.querySelector(".c-modal__poster");
const modelRating = document.querySelector(".c-modal__rating");
const modelContent = document.querySelector(".c-modal-content");

//const ModelRating = document.querySelector(".c-rating-circle__front").style.transform = `rotate(${(vote_average / 10) * 360}deg)`;

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = "";
let totalPages = 100;

const ConvertToAnObjectOfObjects = (arrayOfObjects) => {
  const objectOfObjects = {};

  // Array met objecten omgezet naar object van objecten

  arrayOfObjects.forEach((obj) => {
    objectOfObjects[obj.id] = obj;
  });
  console.log(objectOfObjects);
  return objectOfObjects;
};

// SHOW MOVIES LIST
const showMovies = (movies) => {
  console.log(movies);
  movieEl.innerHTML = "";
  
  movies.forEach((movie) => {
    // const IMG_PATH = `https://image.tmdb.org/t/p/w1280/${movie.poster_path}`;
    // if (IMG_PATH == null) {
    //   IMG_PATH = `poser-placeholder.png`;
    // }
    const { title, poster_path, vote_average, overview, id, backdrop_path } = movie;
    const movieItem = document.createElement("main");
    movieItem.classList.add("c-movie-container");
    movieItem.innerHTML = `
    <div class="c-movie" id="showmodal" data-movie-id="${id}">
    <img  class="c-movie__poster" src="${IMG_PATH+poster_path}" alt="${title}">
    <img  class="c-movie__backdrop u-hide" src="${IMG_PATH+backdrop_path}" alt="${title}">
    <h3 class="c-movie__title">
        ${title}
    </h3>
    <p class="c-modal__overview u-hide">${overview}</p>
    <span class="c-movie__rating ${ChangeColorByRating(
      vote_average
    )}">${vote_average} </span>
    </span>
    <button class="c-movie__btn">
      Read More
    </button>
    </div>
    
    `;
    movieEl.append(movieItem);

    // document.getElementById(id).addEventListener("click", () => {
    //   displayModal(movie);
    //   const modalTitle = document.querySelector(".c-modal__title");
    //   modalTitle.innerHTML = title;
    // });
  });
  const convertedMovies = ConvertToAnObjectOfObjects(movies)
  const moviedivs = document.querySelectorAll(".c-movie");
  console.log("Movie divs:", moviedivs);
  moviedivs.forEach((movie) => {
    // let id = movie.getAttribute('data-movie-id');
    // console.log(id);
    // console.log(convertedMovies[id])
    movie.addEventListener("click", ShowModel);
  });
};

const ShowModel = (e) =>{
 

  const modalOverview = document.querySelector(".c-modal__plot");
  
  let id = e.target.getAttribute('data-movie-id');
  const detailAPI =`https://api.themoviedb.org/3/movie/${id}?api_key=6bfaa39b0a3a25275c765dcaddc7dae7&language=en-US`;
  console.log("movietrigger");
  let movie = e.target.parentElement;
  console.log("Test trigger",e.target.parentElement);
  if(e.target.parentElement.classList.contains("c-movie")){
    console.log("movietrigger");
    let movie = e.target.parentElement;
    let id = movie.getAttribute('data-movie-id');
    let title = movie.querySelector(".c-movie__title").innerText;
    let overview = movie.querySelector(".c-modal__overview").innerText;
    let rating = movie.querySelector(".c-movie__rating").innerText;
    let backdrop = movie.querySelector(".c-movie__backdrop").src;
    const ratings = document.querySelector(".c-movie__rating");
    const ModelRating = document.querySelector(".c-rating-circle__front").style=`stroke-dasharray: ${(464 / 10) * rating};`;
    console.log(ModelRating);
    if(rating >= 8){
      ratings.fillStyle = "green";
    }else if(rating >= 5){
      ratings.fillStyle = "orange";
    }else{
      ratings.fillStyle = "red";
    }
    

    console.log(id);
    console.log(title);
    console.log(overview);
    modalTitle.innerHTML =title;
    modalOverview.innerHTML = overview;
    modelRating.innerHTML = rating;
    ModalBackdrop.src = backdrop;
    ModelRating.innerHTML = rating;

    //modalOverview.innerHTML= e.target.parentElement.children[2].innerHTML;
    // let img = e.target.parentElement.children[2].innerHTML;
    // console.log(img);
    // console.log(e.target.parentElement.children[0].innerHTML);

    modalEl.classList.add("open-modal");
    document.body.style.overflow = 'hidden';
   
  }

 

  modalCloseBtn.addEventListener("click", () => {
    modalEl.classList.remove("open-modal");
    document.body.style.overflow = 'visible';
    
    
  });
  submitMovie(movie);
}



// FOR RATE
const ChangeColorByRating = (vote) => {
  if (vote >= 7.5) {
    return "c-movie__rating--high";
  } else if (vote >= 5) {
    return "c-movie__rating--medium";
  } else {
    return "c-movie__rating--low";
  }
};
// FOR SEARCH SUBMIT
const submitMovie = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== "") {
      getAPI(SEARCH_API + searchTerm);
      search.value = "";
    } else {
      getAPI(API_URL);
    }
  });
};

prev.addEventListener("click", () => {
  if (prevPage > 0) {
    showPagination(prevPage);
  }
});

next.addEventListener("click", () => {
  if (nextPage <= totalPages) {
    showPagination(nextPage);
  }
});

const showPagination = (page) => {
  let urlSplit = lastUrl.split("?");
  let queryParams = urlSplit[1].split("&");
  let key = queryParams[queryParams.length - 1].split("=");
  if (key[0] != "page") {
    let url = lastUrl + "&page=" + page;
    getAPI(url);
  } else {
    key[1] = page.toString();
    let a = key.join("=");
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join("&");
    let url = urlSplit[0] + "?" + b;
    getAPI(url);
  }
};

// const displayModal = (modalid) => {
//   console.log(detailAPI);
//   const modal = document.querySelector(".c-modal__overlay");
//   const closeModal = document.querySelector(".c-modal__close");
//   const modalOverlay = document.querySelector(".c-modal__overlay");
//   document.getElementById("showmodal").addEventListener("click", (e) => {
//     modal.classList.add("open-modal");
//   });
//   closeModal.addEventListener("click", (e) => {
//     modal.classList.remove("open-modal");

//     // if(e.target.closest(".c-modal")) return;{
//     //     modal.classList.add('u-hide');
//     // }
//   });

//   const modalTitle = document.querySelector(".c-modal__title");
//   const modalImg = document.querySelector(".c-modal__img");
//   const modalRating = document.querySelector(".c-modal__rating");
//   const modalOverview = document.querySelector(".c-modal__overview");

//   // window.onclick = function(event) {
//   //     if (event.target == modal) {
//   //         modal.style.display = "none";
//   //       }
//   // }
//   // id.forEach((filmid) => {
//   //   movieEl.innerHTML = "";
//   //   const {title, poster_path, vote_average, overview,id } = filmid;
//   //   const modalEl = document.createElement("c-modal__overlay");
//   //   modalEl.classList.add("c-modal-wrapper");
//   //   modalEl.innerHTML = "";
//   // })

//   // modalEl.innerHTML = "";
//   // movies.forEach((movie) => {
//   //   const modalItem = document.createElement("js-modal");
//   //   modalItem.classList.add("c-modal-wrapper");
//   //   const { title, poster_path, vote_average, overview, release_date } = movie;
//   //   modalItem.innerHTML = `
//   //     <div class="c-modal-wrapper">
//   //     <span class="c-modal__close">&times;</span>
//   //     <img src="https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}" alt="">
//   //     <div class="modal-info">
//   //       <h2 class="c-modal__title">
//   //           ${title}<span class="c-modal__year u-muted">(2022)</span>
//   //           </h2>
//   //           <h2 class="c-modal__tagline">
//   //               the world needed a hero. it got black adam
//   //           </h2>
//   //           <div class="c-modal__category--movie">
//   //               2h 50m  <span class="u-muted">Action, Adventure, Family • </span><span class="u-muted">${release_date}</span>
//   //           </div>
//   //         <h3 class="u-text-uppercase u-fs-medium"style="margin-top:15px">story</h3>
//   //         <p class="c-modal__plot">
//   //           ${overview}
//   //         </p>
//   //   </div>
//   // </div>`
//   // modalEl.appendChild(modalItem);

//   // });

//   // showMovies(data.results);
// };
const getAPI = async (url) => {
  lastUrl = url;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.results);
  ConvertToAnObjectOfObjects(data.results);
  if (data.results.length !== 0) {
    showMovies(data.results);
    submitMovie();
    currentPage = data.page;
    nextPage = currentPage + 1;
    prevPage = currentPage - 1;
    totalPages = data.total_pages;

    current.innerHTML = currentPage;
    if (currentPage <= 1) {
      prev.classList.add("c-pagination__disabled");
      next.classList.remove("c-pagination__disabled");
    } else if (currentPage >= totalPages) {
      prev.classList.remove("c-pagination__disabled");
      next.classList.add("c-pagination__disabled");
    } else {
      prev.classList.remove("c-pagination__disabled");
      next.classList.remove("c-pagination__disabled");
    }

    current.innerHTML = currentPage;
  } else {
    movieEl.innerHTML = ` 
    <div class="no-results">
      <h1>Sorry, no results found</h1>
      <img src="https://i.pinimg.com/originals/70/a4/1c/70a41c4219e4b9685204f4ab95e84561.gif" alt="hangover-gif">
      <h3><a class="no-results__link"href="index.html">back to homepage</a></h3>
    </div>`;

    document.querySelector(".c-pagination").classList.add("u-hide");
  }
};

const init = () => {
  console.log("DOM loaded");
  getAPI(API_URL);
  submitMovie();
  // displayModal();
  ConvertToAnObjectOfObjects();
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");
  init();
});
