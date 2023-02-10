import { detailPage } from "./detail.js";
import { show } from "./util.js";

const homeSection = document.querySelector('#home-page');
const catalog = document.getElementById('movies-list');
catalog.addEventListener('click', (event) =>{
    if (event.target.tagName == 'BUTTON') {
        event.preventDefault();
        const id = event.target.dataset.id;
        detailPage(id)
    }
})
export function homePage() {
    show(homeSection);
    displayMovies();

};

async function displayMovies () {
    const movies = await getMovies();

    catalog.replaceChildren(...movies.map(createMoviePreview));

}
function createMoviePreview(movie) {
    const element =  document.createElement('div');
    element.classList.add('card');
    element.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400"
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="footer">
        <a  href="/details/${movie._id}">
         <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
        </a>
    </div>`
    return element
}
async function getMovies() {
   const res =  fetch(' http://localhost:3030/data/movies ');
   const data = (await res).json();
   return data;
};
