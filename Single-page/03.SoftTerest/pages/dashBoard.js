import { getIdeas } from "../data.js";

const dashPage = document.querySelector('#dashboard-holder');

export async function showDash(context) {
    const idea = await getIdeas()
    if (idea) {
        dashPage.replaceChildren(...idea.map(createIdea))
    } else {
        dashPage.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>'
    }
    context.showSection(dashPage);
    
};
function createIdea(idea) {
    const element = document.createElement('div');
    element.classList = 'card overflow-hidden current-card details';
    element.style.width = '20rem';
    element.style.height = '18rem';
    element.innerHTML = ` 
    <div class="card-body">
    <p class="card-text">${idea.title}</p>
    </div>
    <img class="card-image" src="${idea.img}" alt="Card image cap">
    <a class="btn" href="">Details</a>`
   return element
}