import { show } from "./util.js";

const detailSection = document.querySelector('#movie-example');
export function detailPage(id) {
    show(detailSection);
    displayMovie(id)
};
async function displayMovie(id){
    const movie = await getMovie(id);
    detailSection.replaceChildren(createMovieCard(movie))
};
function createMovieCard(movie) {
    const element = document.createElement('div');
    element.className = 'container';
    element.innerHTML = `
    <div class="row bg-light text-dark">
    <h1>Movie title: ${movie.title}</h1>
 
    <div class="col-md-8">
      <img class="img-thumbnail" src="${movie.img}" alt="Movie"/>
    </div>
    <div class="col-md-4 text-center">
      <h3 class="my-3">Movie Description</h3>
      <p>${movie.description}</p>
      <a class="btn btn-danger" href="#">Delete</a>
      <a class="btn btn-warning" href="#">Edit</a>
      <a class="btn btn-primary" href="#">Like</a>
      <span class="enrolled-span">Liked 1</span>
    </div>
  </div>`
    return element
}
 async function getMovie(id) {
    const resp = await fetch(`http://localhost:3030/data/movies/${id}`);
    const movie = await resp.json();
    return movie;
 };
 