//https://www.omdbapi.com/?apikey=364842e4&s=fast
const moviesWrapperEl = document.querySelector(".movies__wrapper");
let searchResultEl = document.querySelector(".movie__title")
const errorResultEl = document.querySelector(".error__search")
let filter = ''


async function renderMovies(movie) {
    const movies = await fetch(`https://www.omdbapi.com/?apikey=364842e4&s=${movie}`);
    
    const moviesData = await movies.json();
    let result = movie.toUpperCase()
    
    
    
    
     try {
    searchResultEl.innerHTML = result
    const firstSix =  moviesData.Search.filter((elem) => elem).slice(0, 6);
    let moviesHTML = firstSix
    .map((movie) => movieHTML(movie))
    .join("");

    

    if (filter === "OLDEST") {
        console.log(filter)
     let movieData = firstSix.sort((a, b) => (a.Year) - (b.Year));
     let byYear = movieData.map((movieYear) => movieHTML(movieYear)).join("");
     console.log(movieData)
     moviesWrapperEl.innerHTML = byYear 
    }
    else if (filter === "NEWEST") {
        console.log(filter)
     let movieData = firstSix.sort((a, b) => (b.Year) - (a.Year));
     let byYear = movieData.map((movieYear) => movieHTML(movieYear)).join("");
     console.log(movieData)
     moviesWrapperEl.innerHTML = byYear 
    }
    else if(filter === "A_Z"){
        console.log(filter)
        // let test = firstSix.sort((a, b) => (a.Title) - (b.title));
        let test = firstSix.sort((a, b) => a.Title.localeCompare(b.Title))
     let byAz = test.map((movieAz) => movieHTML(movieAz)).join("");
     console.log(test)
     moviesWrapperEl.innerHTML = byAz 
    }
    else{
        document.body.classList.remove("welcome", "search", "error");
        document.body.classList += " search"
        moviesWrapperEl.innerHTML = moviesHTML 
    }
} catch (error) {
      errorResultEl.innerHTML = `"${result}"`
    document.body.classList += " error"
  }
}


function movieHTML(movie) {
  return `<div class="movie">
  <figure class="movie__img--wrapper click no__cursor" onclick="notClickable()">
  <img class="movie__img" src="${movie.Poster}" alt="" />
  </figure>
  <div class="movie__description">

      <h3 class="movie__title">${movie.Title}</h3>
      <h4 class="year">${movie.Year}</h4>
      <a href="https://imdb.com/title/${movie.imdbID}" class="imdb" target="_blank">IMDB</a>
  </div>
</div>`;
}
function onSearchChange(event) {
  movie = event.target.value;
  console.log(event.target.value)
    renderMovies(movie);
}

function closeError(){
    location.reload()
}


function filterSort (event) {
    renderMovies(movie)
    filter = event.target.value
    // console.log(event.target.value)
}

function notClickable() {
  console.log('testing not available')
  alert ("this feature has not been implemented")
  // try {
    
  // } catch (error) {
    
  // }
  // finally{
    
  // }
}
