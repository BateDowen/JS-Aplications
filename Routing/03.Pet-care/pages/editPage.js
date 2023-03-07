import { html } from "../node_modules/lit-html/lit-html.js";
import { edit, getById } from "../serveses/util.js";

const editTemplate = (dogInfo,onSubmit) =>html`
<section id="editPage">
            <form @submit="${onSubmit}" class="editForm">
                <img src="${dogInfo.image}">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" value="${dogInfo.name}">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" value="${dogInfo.breed}">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" value="${dogInfo.age}">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" value="${dogInfo.weight}">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" value="${dogInfo.image}">
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>
`;

export async function editView (ctx){
    const animalID = ctx.params.id;
    
    const resp = await getById(animalID);
    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        let { name,breed,age,weight,image} = Object.fromEntries(formData);
        await edit(animalID,{ name,breed,age,weight,image});
        ctx.page.redirect(`/details/${animalID}`)
    }
    ctx.render(editTemplate(resp,onSubmit))
}
