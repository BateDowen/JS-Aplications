import { html } from "../node_modules/lit-html/lit-html.js";
import { deleteItem, getById } from "../serveses/util.js";

const deteilsTemplate = (dogDetails,isAuthenticated,userID,del)=>html`
 <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="${dogDetails.image}">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${dogDetails.name}</h1>
                        <h3>Breed: ${dogDetails.breed}</h3>
                        <h4>Age: ${dogDetails.age}</h4>
                        <h4>Weight: ${dogDetails.weight}</h4>
                        <h4 class="donation">Donation: 0$</h4>
                    </div>
                    <!-- if there is no registered user, do not display div-->
                    ${isAuthenticated == true ? html`
                    <div class="actionBtn">
                        ${dogDetails._ownerId == userID ? html`
                            <!-- Only for registered user and creator of the pets-->
                            <a href="/edit/${dogDetails._id}" class="edit">Edit</a>
                            <a @click="${del}" href="javascript:void(0)" class="remove">Delete</a>` 
                            : html`
                            <!--(Bonus Part) Only for no creator and user-->
                            <a href="javascript:void(0)" class="donate">Donate</a>`}
                        
                    </div>` : ''}
                </div>
            </div>
        </section>
`;

export async function detailsPage(ctx){
    const resp = await getById(ctx.params.id);
    let userId = undefined;

    if (ctx.isAuthenticated) {
        userId = JSON.parse(localStorage.getItem('user'))._id
    }
   
    ctx.render(deteilsTemplate(resp,ctx.isAuthenticated,userId,del));

    async function del(ev) {
        ev.preventDefault();
        await deleteItem(ctx.params.id)
        ctx.page.redirect('/')
    }
}
