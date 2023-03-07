import { html, render } from "../node_modules/lit-html/lit-html.js";
import { navigationView } from "./pages/navigation.js";

const root = document.getElementById('root');
const renderer = (ctx,template) =>{
    const layout = html`
    <nav>
        ${navigationView(ctx)}
    </nav>
    <main>
        ${template}
    </main>
    `
    render(layout,root);
} 

export const renderMiddleware = (ctx,next) =>{

    ctx.render = renderer.bind(null,ctx);
    next();
}