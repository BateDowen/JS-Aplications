import { html, render } from "../node_modules/lit-html/lit-html.js";
import { navigationView } from "../pages/navigation.js";
const root = document.getElementById('content');

const ctxRender = (ctx,tempalte) => {
    console.log(ctx)
    const layout = html`
    <nav>
        ${navigationView(ctx)} 
    </nav>
    <main>
        ${tempalte}
    </main>
    `;
    render(layout,root)
}
export const renderMidlleware = (ctx,next) => {
    ctx.render = ctxRender.bind(null,ctx)
    next();

}