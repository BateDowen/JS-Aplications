import { html } from "../node_modules/lit-html/lit-html.js";
import { getAll, getCount } from "../serveses/util.js";

const dashTemplate = (loadDogs,page,count) =>html`
 <section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">
               ${loadDogs.length > 0 ? 
                loadDogs.map(x => html`
                <div class="animals-board">
                    <article class="service-img">
                        <img class="animal-image-cover" src="${x.image}">
                    </article>
                    <h2 class="name">${x.name}</h2>
                    <h3 class="breed">${x.breed}</h3>
                    <div class="action">
                        <a class="btn" href="/details/${x._id}">Details</a>
                    </div>
                </div>
                ` )
                :
                // <!--If there is no pets in dashboard-->
                html `<div>
                    <p class="no-pets">No pets in dashboard</p>
                </div>
                </div>`}

        </section>
        <nav class="pagination" aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    ${pageBuilder(page,count).map(x => html`
                    <li class="page-item"><a class="page-link" href="/dashboard?page=${x}">${x}</a></li>
                    
                    `)}
                    <li class="page-item"><a class="page-link" href="/dashboard?page=${Math.min(page + 1,count)}">Next</a></li>
                </ul>
                </nav>
`;
function pageBuilder(page,count) {
    let firstPage = Math.max(page - 1, 1)
    return [firstPage, firstPage + 1, Math.min(firstPage + 2,count)]
}
export async function dashPage (ctx){
    const searchParams = new URLSearchParams(ctx.querystring);
    const page = searchParams.get('page');
   
     const resp =  await getAll(Number(page) || 1)
    const count = await getCount()
     console.log(count);
    
    ctx.render(dashTemplate(resp,Number(page),count));
}
