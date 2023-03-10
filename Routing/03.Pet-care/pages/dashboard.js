import { html } from "../node_modules/lit-html/lit-html.js";
import { getAll } from "../serveses/util.js";

const dashTemplate = (loadDogs) =>html`
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
                </div>` )
                :
                // <!--If there is no pets in dashboard-->
                html `<div>
                    <p class="no-pets">No pets in dashboard</p>
                </div>
                </div>`}

        </section>

`;

export async function dashPage (ctx){
    const resp = await getAll();
    ctx.render(dashTemplate(resp))

}
