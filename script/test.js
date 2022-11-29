let API_KEY = 'ac4c9e08848ab50e1bec4063cfd3a7b5';
let BASE_URL='https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API ='https://api.themoviedb.org/3/search/movie?api_key=6bfaa39b0a3a25275c765dcaddc7dae7&query="';


const movieEl= document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const submitsearch = document.getElementById("searchicon");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentBtn = document.getElementById("current");

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')
const movieContainer = document.querySelector('.c-movie-container');


var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;
// const modalEl = document.querySelector('.js-modal');


// const displayModal = (movies) => {
//     const modal = document.querySelector('.c-modal');
//     const closeModal = document.querySelector('.c-modal__close');
//     const modalOverlay = document.querySelector('.c-modal__overlay');
//     document.getElementById('open-modal').addEventListener('click', (e) => {
//         modal.style.display = 'block';
       
//     });
//     document.querySelector('.c-modal__close').addEventListener('click', (e) => {
//         if (modal.style.display === 'block') {
//             modal.style.display = 'none';
//         }
//         if(e.target.closest(".c-modal")) return;{
//             modal.classList.add('u-hide');
//         }
//     });

//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//           }
//     }
//     console.log(movies);
//     if(modalEl==null){
//       modalEl.remove();
//     }
//     modalEl.innerHTML = "";
//     movies.forEach((movie) => {
//       const modalItem = document.createElement("js-modal");
//       modalItem.classList.add("c-modal-wrapper");
//       const { title, poster_path, vote_average, overview, release_date } = movie;
//       modalItem.innerHTML = `
//         <div class="c-modal-wrapper">
//         <span class="c-modal__close">&times;</span>
//         <img src="https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}" alt="">
//         <div class="modal-info">
//           <h2 class="c-modal__title">
//               ${title}<span class="c-modal__year u-muted">(2022)</span>
//               </h2>
//               <h2 class="c-modal__tagline">
//                   the world needed a hero. it got black adam
//               </h2>
//               <div class="c-modal__category--movie">
//                   2h 50m  <span class="u-muted">Action, Adventure, Family • </span><span class="u-muted">${release_date}</span>
//               </div>
//             <h3 class="u-text-uppercase u-fs-medium"style="margin-top:15px">story</h3>
//             <p class="c-modal__plot">
//               ${overview}  
//             </p>
//       </div>
//     </div>`
//     modalEl.appendChild(modalItem);
    
//     });

//     showMovies(data.results);

// };

// SHOW MOVIES LIST
movieContainer.addEventListener('click', (e) => {
    const movieId = e.target.dataset.id;
    const modalEl = document.querySelector(".js-modal");
    const modalCloseBtn = document.querySelector(".c-modal__close");
    const modelTItle = document.querySelector(".c-modal__title");
    const detailAPI =`https://api.themoviedb.org/3/movie/${movieId}?api_key=6bfaa39b0a3a25275c765dcaddc7dae7&language=en-US`;

    if(e.target.closest(".c-movie")){
      modelTItle.innerHTML = e.target.closest(".c-movie").querySelector(".c-movie__title").innerHTML;
        modalEl.classList.remove('u-hide');
        getAPI(detailAPI);
    }
    console.log(movieId);
    if (movieId) {
        
        console.log(detailAPI);
        modalEl.classList.add("open-modal");
        modelTItle.innerHTML=e.target.title;
        console.log(e.target.dataset.title);
        fetch(detailAPI)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
          
        });

        
        

    }
    
    // e.forEach((data) => {
    //   const { title, poster_path, vote_average, overview, release_date } = data;
    //   const modalItem = document.createElement("js-modal");
    //   modalItem.classList.add("c-modal-wrapper");
    //   modalItem.innerHTML = `
    //   <div class="c-modal-wrapper">
    //   <span class="c-modal__close">&times;</span>
    //   <img src="https://image.tmdb.org/t/p/w1280/${data.backdrop_path}" alt="">
    //   <div class="modal-info">`

    //   const modelTItle = document.querySelector(".c-modal__title");
    //   modelTItle.innerHTML=data.title;
    // })
    
    modalCloseBtn.addEventListener('click', (e) => {
        modalEl.classList.remove("open-modal");
    });
    getAPI(detailAPI);

    e.addEventListener("click",testModels);
})

const testModels = (details) => {
  for(let detail of details){
    const { title, poster_path, vote_average, overview, release_date } = detail;
    const modalItem = document.createElement("js-modal")
    modalItem.classList.add("c-modal-wrapper");

  }
}
const showMovies = (movies) =>{
  console.log(movies);
  movieEl.innerHTML = "";
  movies.forEach((movie) => {
    const IMG_PATH = `https://image.tmdb.org/t/p/w1280/${movie.poster_path}`;
    if(IMG_PATH ==null){
        IMG_PATH =`poser-placeholder.png`;
    }
    const { id,title, poster_path, vote_average, overview } = movie;
    const movieItem = document.createElement("div");
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
  // displayModal(movies);
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
         getAPI(API_URL);
        }
    });
}


prev.addEventListener('click', () => {
  if(prevPage > 0){
    showPagination(prevPage);
  }
})

next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    showPagination(nextPage);
  }
})

const showPagination=(page) =>{
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
    let url = lastUrl + '&page='+page
    getAPI(url);
  }else{
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b
    getAPI(url);
  }
}

const getAPI = async (url) => {
  lastUrl = url;
  const response = await fetch(url);
  const data = await response.json();
  if(data.results.length !== 0){
    showMovies(data.results);
    submitMovie();
    // displayModal();
    currentPage = data.page;
    nextPage = currentPage + 1;
    prevPage = currentPage - 1;
    totalPages = data.total_pages;

    current.innerText = currentPage;
    
  }else{
    movieEl.innerHTML = `<h1 class="no-result">No Result Found</h1>`;
  }
  
  
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    getAPI(API_URL);
    submitMovie();
    
});

// let settings = initialiseLS();
// if (settings.theme !== null) {
//   addTheme(settings.theme);
// }
// let id;
// const APIKEY = "4fe173794f9f3a073bdb725b36ec05e0";
// let pageNumber = 1;
// const genres = [
//   {
//     id: "14, 878",
//     name: "Fantasy / Science-Fiction",
//   },
//   {
//     id: "28, 12",
//     name: "Action / Adventure",
//   },
//   {
//     id: "35",
//     name: "Comedy",
//   },
//   {
//     id: "10752",
//     name: "War",
//   },
//   {
//     id: "10749, 18",
//     name: "Romance/Drama",
//   },
// ];
// const main = document.getElementById("main");
// const homeButton = document.getElementById("homeButton");
// const form = document.getElementById("form");
// const search = document.getElementById("search");
// const trailerOverlayClose = document.getElementById("trailerOverlayClose");
// const trailerOverlay = document.getElementById("trailerOverlay");

// const IMGPATH = "https://image.tmdb.org/t/p/w342";
// const genreAPIURL = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_genres=`;
// const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${APIKEY}&query=`;

// main.innerHTML = "";
// begin();

// async function getMovies(url, genre) {
//   const resp = await fetch(url);
//   const respData = await resp.json();
//   showMovies(respData.results, genre);
// }

// function showMovies(movies, genre) {
//   const movieRow = document.createElement("div");
//   movieRow.classList.add("movie-row");
//   movieRow.innerHTML = `
//     <div class="movie-row-title">${genre}</div>
//     <div class="movie-wrap">
//     `;

//   main.appendChild(movieRow);

//   movies.forEach((movie) => {
//     const {
//       poster_path,
//       title,
//       vote_average,
//       vote_count,
//       release_date,
//       overview,
//       id,
//     } = movie;
//     const movieElement = document.createElement("div");
//     movieElement.classList.add("movie");
//     movieElement.innerHTML = `
//                 <img 
//                 src="${IMGPATH + poster_path}" 
//                 alt="${title}" 
//             />
//             <div class="movie-details">
//               <span class="movie-title">${title}</span>
//               <span
//                 class="rating"
//                 style="color: ${ratingColor(vote_average)}"
//                 >${reformatScore(vote_average)}</span
//               >
//             </div>
//             <div class="overview">
//             <div id="overviewClose">&times;</div>
//               <div class="overview-top-half">
//                 <img
//                   class="overview-poster"
//                   src="${IMGPATH + poster_path}"
//                   alt="${title}"
//                 />

//                 <div class="overview-rating-container">
//                   <div class="overview-rating">${reformatScore(
//                     vote_average
//                   )}</div>
//                   <div class="star-rating">
//                     <div
//                       class="overview-stars"
//                       style="${getStarRating(vote_average)}"
//                     ></div>
//                     <div class="overview-vote-count">${reformatVoteCount(
//                       vote_count
//                     )}</div>
//                   </div>
//                 </div>

//                 <div class="overview-title">${title}</div>
//                 <button class="trailer-btn" data-id=${id}>See More</button>
//                 <div class="overview-release-date">
//                   <span>Released: </span><span>${reformatDate(
//                     release_date
//                   )}</span>
//                 </div>
//               </div>
//               <div class="overview-synopsis">
//                 ${overview}
//               </div>
//               <div class="overview-cast"></div>              
//           </div>`;

//     // Adding Cast
//     const overviewElement = movieElement.lastElementChild.lastElementChild;
//     const movieWrap = movieRow.lastElementChild;

//     castBung(id, overviewElement);

//     movieWrap.appendChild(movieElement);
//   });
// }

// async function getMoviesSearch(url) {
//   const resp = await fetch(url);
//   const respData = await resp.json();

//   for (let i = 0; i < respData.results.length; i++) {
//     if (respData.results[i].poster_path == null) {
//       respData.results[i].poster_path = "img/no-poster.png";
//     }
//   }

//   showMoviesSearch(respData.results);
// }

// function showMoviesSearch(movies) {
//   main.innerHTML = "";

//   const searchedMovies = document.createElement("div");
//   searchedMovies.classList.add("searched-movies");
//   main.appendChild(searchedMovies);

//   movies.forEach((movie) => {
//     const {
//       poster_path,
//       title,
//       vote_average,
//       vote_count,
//       release_date,
//       overview,
//       id,
//     } = movie;

//     const movieElement = document.createElement("div");
//     movieElement.classList.add("movie");

//     if (movie.poster_path == "img/no-poster.png") {
//       movieElement.innerHTML = `
//       <img
//       src="${poster_path}"
//       alt="${title}"
//     />
//     <div class="movie-details">
//       <span class="movie-title">${title}</span>
//       <span
//         class="rating"
//         style="color: var(--excellent)"
//         >${vote_average}</span
//       >
//     </div>

//     <div class="overview">
//       <div id="overviewClose">&times;</div>
//       <div class="overview-top-half">
//         <img
//           class="overview-poster"
//           src="${poster_path}"
//           alt="title"
//         />

//         <div class="overview-rating-container">
//           <div class="overview-rating">${vote_average}</div>
//           <div class="star-rating">
//             <div
//               class="overview-stars"
//               style="${getStarRating(vote_average)}"
//             ></div>
//             <div class="overview-vote-count">${vote_count}</div>
//           </div>
//         </div>

//         <div class="overview-title">${title}</div>
//         <button class="trailer-btn" data-id=${id}>See More</button>
//         <div class="overview-release-date">
//           <span>Released: </span><span>${reformatDate(release_date)}</span>
//         </div>
//       </div>
//       <div class="overview-synopsis">
//       ${overview}
//       </div>
//     </div>
//         `;
//     } else {
//       movieElement.innerHTML = `
//       <img
//       src="${IMGPATH + poster_path}"
//       alt="${title}"
//     />
//     <div class="movie-details">
//       <span class="movie-title">${title}</span>
//       <span
//         class="rating"
//         style="color: var(--excellent)"
//         >${vote_average}</span
//       >
//     </div>

//     <div class="overview">
//       <div id="overviewClose">&times;</div>
//       <div class="overview-top-half">
//         <img
//           class="overview-poster"
//           src="${IMGPATH + poster_path}"
//           alt="${title}"
//         />

//         <div class="overview-rating-container">
//           <div class="overview-rating">${vote_average}</div>
//           <div class="star-rating">
//             <div
//               class="overview-stars"
//               style="${getStarRating(vote_average)}"
//             ></div>
//             <div class="overview-vote-count">${reformatVoteCount(
//               vote_count
//             )}</div>
//           </div>
//         </div>

//         <div class="overview-title">${title}</div>
//         <button class="trailer-btn" data-id=${id}>See More</button>
//         <div class="overview-release-date">
//           <span>Released: </span><span>${reformatDate(release_date)}</span>
//         </div>
//       </div>
//       <div class="overview-synopsis">
//       ${overview}
//       </div>
//       <div class="overview-cast"></div>
//     </div>
//   `;
//     }

//     // Adding Cast
//     const overviewElement = movieElement.lastElementChild.lastElementChild;
//     castBung(id, overviewElement);

//     searchedMovies.appendChild(movieElement);
//   });
// }

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   let searchValue = search.value;

//   if (searchValue) {
//     getMoviesSearch(SEARCHAPI + searchValue);
//   }
//   search.value = "";
// });

// window.addEventListener("click", (e) => {
//   // console.log(e);

//   //Display overview when clicking poster
//   const tagName = e.target.tagName;
//   let overview = e.target.parentElement.lastElementChild;
//   if (tagName == "IMG") {
//     addCover();
//     //Get movie ID
//     const id =
//       e.target.parentElement.children[2].children[1].children[3].attributes[1]
//         .value;
//     //Populate trailer overlay
//     fillTrailerOverlay(id);
//     //Place overview on top of everything except the shade-cover
//     overview.style.zIndex = "5";
//     overview.classList.add("displayed");
//   }

//   //Hide overview when clicking overview close button
//   overview = e.target.parentElement;
//   if (e.target.parentElement.classList.value == "overview displayed") {
//     removeCover();
//     e.target.parentElement.classList.remove("displayed");
//     //Delay z-index transformtion to prevent shite transition
//     setTimeout(() => {
//       setElementAttr(e.target.parentElement, "zIndex", -1);
//     }, 500);

//     //hide trailer overlay if it is visible
//     if (trailerOverlay.classList.contains("expanded")) {
//       trailerOverlay.classList.remove("expanded");
//     }
//   }

//   //Add home refresh function when clicking page title
//   if (e.target.classList.contains("page-title")) {
//     begin();
//   }

//   //Trailer overlay expansion
//   if (e.target.classList.contains("trailer-btn")) {
//     trailerOverlay.classList.toggle("expanded");
//   }
// });

// homeButton.addEventListener("click", () => {
//   begin();
//   homeButton.classList.add("jumpInRight");
//   setTimeout(() => {
//     homeButton.classList.remove("jumpInRight");
//   }, 1000);
// });

// async function castBung(id, element) {
//   let castCount = 7;
//   let cast = [];
//   let url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}&language=en-US`;
//   return fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       let fullCast = data.cast;
//       fullCast.forEach((part) => {
//         let role = {};
//         role.name = part.name;
//         role.character = part.character;
//         role.profile_path =
//           part.profile_path !== null ? part.profile_path : "img/no-cast.png";
//         cast.push(role);
//       });
//       let trimmedCast = [];
//       for (let i = 0; i < castCount; i++) {
//         cast[i]
//           ? trimmedCast.push(cast[i])
//           : console.log("Not enough cast members. Skipping");
//       }
//       return trimmedCast;
//     })
//     .then((cast) => {
//       for (let i = 0; i < castCount; i++) {
//         addCast(cast[i], element);
//       }
//     });
// }

// function addCast(cast, element) {
//   let codeBlock = `
//   <div class="picture-wrapper">
//   <img src="${
//     cast.profile_path !== "img/no-cast.png"
//       ? IMGPATH + cast.profile_path
//       : "img/no-cast.png"
//   }" alt="${cast.name}" /></div>
//   <div class="overview-character">
//     ${cast.character}
//   </div>
//   <div class="overview-actor">${cast.name}</div>`;
//   let castPic = document.createElement("div");
//   castPic.classList.add("cast-pic");
//   castPic.innerHTML = codeBlock;
//   element.appendChild(castPic);
// }

// //Theme Swapper Code begin
// const menuWheel = document.getElementById("menuWheel");
// const menuButton = document.getElementById("menuButton");
// const menuButton2 = document.getElementById("menuButton2");
// const stoneButton = document.getElementById("stoneButton");
// const arktisButton = document.getElementById("arktisButton");
// const desertButton = document.getElementById("desertButton");
// const aquaButton = document.getElementById("aquaButton");

// menuButton2.addEventListener("click", () => {
//   removeActive();
// });
// function addTheme(selection) {
//   document.body.className = "";
//   document.body.classList.add(selection);
//   settings["theme"] = selection;
//   localStorage.setItem("movie-browser-app", JSON.stringify(settings));
// }
// stoneButton.addEventListener("click", () => {
//   addTheme("stone");
//   removeActive();
// });
// arktisButton.addEventListener("click", () => {
//   addTheme("arktis");
//   removeActive();
// });
// desertButton.addEventListener("click", () => {
//   addTheme("desert");
//   removeActive();
// });
// aquaButton.addEventListener("click", (e) => {
//   addTheme("aqua");
//   removeActive();
// });

// trailerOverlayClose.addEventListener("click", () => {
//   trailerOverlay.classList.remove("expanded");
// });

// function begin() {
//   main.innerHTML = "";

//   getFavorites().then(() => {
//     for (let i = 0; i < genres.length; i++) {
//       getMovies(genreAPIURL + genres[i].id, genres[i].name);
//     }
//   });
// }

// function setElementAttr(element, attr, value) {
//   element.setAttribute("style", attr + ":" + value);
// }

// function reformatDate(date) {
//   let data = [];
//   data.push(date[8]);
//   data.push(date[9]);
//   data.push(date[4]);
//   data.push(date[5]);
//   data.push(date[6]);
//   data.push(date[7]);
//   data.push(date[0]);
//   data.push(date[1]);
//   data.push(date[2]);
//   data.push(date[3]);
//   return data.join("");
// }

// function getStarRating(score) {
//   return "--rating: " + score / 2;
// }

// function reformatScore(score) {
//   let string = score.toString();
//   if (string.length === 1) {
//     string += ".0";
//   }
//   return string;
// }

// function reformatMoney(sum) {
//   let num_parts = sum.toString().split(".");
//   num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   return num_parts.join(".");
// }

// function ratingColor(score) {
//   if (score >= 8) return "var(--excellent)";
//   else if (score >= 6) return "var(--average)";
//   else return "var(--poor)";
// }

// function removeActive() {
//   let elements = [
//     menuWheel,
//     menuButton,
//     menuButton2,
//     stoneButton,
//     arktisButton,
//     desertButton,
//     aquaButton,
//   ];

//   elements.forEach((element) => {
//     element.classList.toggle("active");
//   });
// }

// function initialiseLS() {
//   let initialSettings = {
//     theme: null,
//     favorites: ["115", "603", "11878", "137"],
//   };
//   let appSettings = localStorage.getItem("movie-browser-app");
//   if (appSettings == null) {
//     localStorage.setItem("movie-browser-app", JSON.stringify(initialSettings));
//   }
//   appSettings = localStorage.getItem("movie-browser-app");
//   appSettings = JSON.parse(appSettings);
//   return appSettings;
// }

// function reformatVoteCount(count) {
//   let val = count.toLocaleString("en-us");
//   return val + " votes";
// }

// let coverOn;

// function addCover() {
//   const cover = document.getElementById("cover");
//   cover.classList.add("cover-active");
//   coverOn = true;
//   document.body.classList.add("disable-scroll");
// }

// function removeCover() {
//   const cover = document.getElementById("cover");
//   cover.classList.remove("cover-active");
//   coverOn = null;
//   document.body.classList.remove("disable-scroll");
// }

// function homePage() {
//   search, (value = "");
//   main.innerHTML = "";
//   for (let i = 0; i < genres.length; i++) {
//     getMovies(genreAPIURL + genres[i].id, genres[i].name);
//   }

//   homeButton.classList.add("jumpInRight");
//   setTimeout(() => {
//     homeButton.classList.remove("jumpInRight");
//   }, 1000);
// }

// async function getFavorites() {
//   // main.innerHTML = "";

//   const favesID = "8228716";
//   let url = `https://api.themoviedb.org/3/list/${favesID}?api_key=${APIKEY}&language=en-US`;
//   const response = await fetch(url);
//   const data = await response.json();
//   const favorites = data.items;
//   showMovies(favorites, "Personal Favorites");
// }

// async function getMovieByID(id) {
//   const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US&append_to_response=credits,reviews,similar,videos`;

//   const response = await fetch(url);
//   const data = await response.json();

//   return data;
// }

// function fillTrailerOverlay(id) {
//   getMovieByID(id).then((data) => {
//     //get backdrop image
//     const backdrop = document.getElementById("trailerOverlayBackdrop");
//     backdrop.src = "";
//     const largerImagePath = "https://image.tmdb.org/t/p/w780";
//     backdrop.src = largerImagePath + data.backdrop_path;

//     //get genres
//     addGenres(data);

//     //get trailer
//     const videos = data.videos.results;
//     const trailer = returnBestTrailer(videos);
//     const key = trailer.key;
//     addTrailerCodeBlock(key);

//     // assign a value to writer, director & producer in data object
//     const crew = data.credits.crew;
//     let writer = {
//       Writer: getCredit(crew, "Writer"),
//       Screenplay: getCredit(crew, "Screenplay"),
//       Author: getCredit(crew, "Author"),
//       Story: getCredit(crew, "Story"),
//     };
//     data.writer = getWriter(writer);
//     data.director = getCredit(crew, "Director");
//     data.producer = getCredit(crew, "Producer");

//     addCredits(data);
//   });
// }

// function returnBestTrailer(arr) {
//   let youtubeTrailers = arr.filter((obj) => obj.site === "YouTube");
//   let trailers = youtubeTrailers.filter((obj) => obj.type === "Trailer");
//   let officialTrailers = youtubeTrailers.filter(
//     (obj) => obj.official && obj.type === "Trailer"
//   );
//   if (officialTrailers.length == 0) {
//     //action if there are no official trailers
//     console.log("No official trailers");
//     if (trailers.length === 0) {
//       console.log("No non-official trailers either...");
//       //TBD - now what?
//       console.log(trailers);
//     } else if (trailers.length == 1) {
//       return trailers[0];
//     } else if (trailers.length > 1) {
//       console.log("Got a couple alternatives - how to choose?");
//       console.log(trailers);
//       return trailers[0];
//     }
//   } else if (officialTrailers.length == 1) {
//     //if there's only one official, return it!
//     // console.log("Bingo!");
//     // console.log(officialTrailers[0]);
//     return officialTrailers[0];
//   } else if (officialTrailers.length > 1) {
//     // console.log("Got a couple choices. Here's the first one");
//     // console.log(officialTrailers[0]);
//     return officialTrailers[0];
//   }
// }

// function addTrailerCodeBlock(key) {
//   const codeBlock = `<iframe
//   id="trailerOne"
//   src="https://www.youtube.com/embed/${key}"
//   title="YouTube video player"
//   frameborder="0"
//   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//   allowfullscreen
// ></iframe>`;
//   const trailerVideoWrapper = document.getElementById("trailerVideoWrapper");
//   trailerVideoWrapper.innerHTML = "";
//   trailerVideoWrapper.innerHTML = codeBlock;
// }

// function getCredit(arr, job) {
//   let role = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i].job === job) role.push(arr[i].name);
//   }

//   // if (role.length > 0) return role;
//   return role;
// }

// function addCredits(obj) {
//   //Clear out existing values
//   document.getElementById("tagLine").innerHTML = "";
//   document.getElementById("budget").innerHTML = "";
//   document.getElementById("revenue").innerHTML = "";
//   document.getElementById("runTime").innerHTML = "";
//   document.getElementById("directedBy").innerHTML = "";
//   document.getElementById("producedBy").innerHTML = "";
//   document.getElementById("writtenBy").innerHTML = "";

//   //Add new values
//   document.getElementById("tagLine").innerHTML = obj.tagline;

//   if (obj.budget > 0) {
//     document.getElementById("budget").innerHTML =
//       "Budget: $" + reformatMoney(obj.budget);
//   }
//   if (obj.revenue > 0) {
//     document.getElementById("revenue").innerHTML =
//       "Revenue: $" + reformatMoney(obj.revenue);
//   }
//   if (obj.runtime) {
//     console.log(obj.runtime);
//     document.getElementById("runTime").innerHTML =
//       "Runtime: " + reformatRuntime(obj.runtime);
//   }

//   //Separate array vals if necessary
//   //Director
//   if (obj.director.length == 1) {
//     document.getElementById("directedBy").innerHTML = obj.director;
//   } else {
//     document.getElementById("directedBy").innerHTML = obj.director.join(", ");
//   }
//   //Writer
//   if (obj.writer.length == 1) {
//     document.getElementById("writtenBy").innerHTML = obj.writer;
//   } else {
//     document.getElementById("writtenBy").innerHTML = obj.writer.join(", ");
//   }
//   //Producer
//   if (obj.producer.length == 0) {
//     document.getElementById("producedBy").innerHTML = "No registered Producer";
//   }
//   if (obj.producer.length == 1) {
//     document.getElementById("producedBy").innerHTML = obj.producer;
//   } else if (obj.producer.length > 1) {
//     document.getElementById("producedBy").innerHTML = obj.producer.join(", ");
//   }
// }
// function addGenres(obj) {
//   //clear out genre section
//   const genresElement = document.getElementById("genresElement");
//   genresElement.innerHTML = "";

//   //create and append codeblock for each genre in genres array
//   const genres = obj.genres;

//   for (g of genres) {
//     const chunk = document.createElement("div");
//     chunk.classList.add("genre");
//     chunk.innerHTML = g.name;
//     genresElement.appendChild(chunk);
//   }
// }
// function getWriter(obj) {
//   let writers = [];
//   writers.push(obj.Author);
//   writers.push(obj.Screenplay);
//   writers.push(obj.Writer);
//   writers.push(obj.Story);
//   writers = writers.flat();
//   writers = writers.filter(Boolean);
//   let uniqueVals = [...new Set(writers)];
//   return uniqueVals;
// }
// function reformatRuntime(mins) {
//   let hours = Math.floor(mins / 60);
//   let minutes = mins - hours * 60;
//   let result;

//   if (hours === 0) {
//     return minutes + " minutes";
//   } else {
//     hours > 1
//       ? (result = hours + " hours " + minutes + " minutes")
//       : (result = hours + " hour " + minutes + " minutes");
//   }
//   return result;
// }

