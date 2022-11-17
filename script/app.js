let API_KEY = 'ac4c9e08848ab50e1bec4063cfd3a7b5';
let BASE_URL='https://api.themoviedb.org/3';
const endpoint = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
const form = document.querySelector('#form');
const search = document.querySelector('#search');

// const displayModal = () => {
//     const modal = document.querySelector('.c-modal');
//     const closeModal = document.querySelector('.c-modal__close');
//     const modalOverlay = document.querySelector('.c-modal__overlay');
//     document.getElementById('open-modal').addEventListener('click', () => {
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
       

// };

const displayMovies = (movies) => {
    const main = document.getElementById('main');
    main.innterHTML ='';
    movies.forEach(movie=>{
        
            const IMG_PATH = `https://image.tmdb.org/t/p/w1280/${movie.poster_path}`;
            if(IMG_PATH ==null){
                IMG_PATH =`poser-placeholder.png`;
            }
            const {title, poster_path, vote_average, overview} = movie;
            const movieEl = document.createElement('main');
            movieEl.classList.add('c-movie-container');
            movieEl.innerHTML = `
            <div class="c-movie" id="open-modal">
                <img  class="c-movie__poster"src="${IMG_PATH}" alt="${title}">
                <h3 class="c-movie__title">
                    ${title}
                </h3>
                <span class="c-movie__title">
                   ${vote_average}
                </span>
            </div>`;
            main.appendChild(movieEl);

    })
   

   
}

if(form){
    
    form.addEventListener('submit', (e) => {
        const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="${searchTerm}"`;
        console.log(e);
        e.preventDefault();
        const searchTerm = search.value;
        if(searchTerm && searchTerm !== ''){
            searchMovie(SEARCH_API+searchTerm);
            searchTerm='';
        }else{
            window.location.reload();
        }
    });

    
}

const searchMovie = async (searchTerm) => {
    const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="${searchTerm}"`;
    let API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
    const response = await fetch(SEARCH_API);
    const data = await response.json();
    console.log(data);
    displayMovies(data.results);  
}



const getAPI = async (endpoint) =>{
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
    displayMovies(data.results);
}


document.addEventListener("DOMContentLoaded", () => {
    // displayModal();
    getAPI(endpoint);
    console.log("loaded");

});
