//https://www.omdbapi.com/?apikey=364842e4&s=fast

async function renderMovies(movie) {
  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=364842e4&s=${movie}`
  );
  const moviesData = await movies.json();
  const moviesWrapperEl = document.querySelector(".movies__wrapper");
  const searchResultEl = document.querySelector(".movie__title")

  console.log(movie);

  if (movie.value === "") {
    console.log("error");
  }
  try {
    searchResultEl.innerHTML = movie
    const firstSix = moviesData.Search.filter((elem) => elem).slice(0, 6);
    moviesWrapperEl.innerHTML = firstSix
      .map((movie) => movieHTML(movie))
      .join("");
    document.body.classList.remove("welcome", "search");
    document.body.classList += " search"
  } catch (error) {
    alert("movie not found");
  }
}

function movieHTML(movie) {
  return `<div class="movie">
  <figure class="movie__img--wrapper">
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
  let movie = event.target.value;
//   setTimeout(() => {
    renderMovies(movie);
//   }, "3000");
}




