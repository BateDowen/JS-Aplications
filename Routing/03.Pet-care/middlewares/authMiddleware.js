import { isAuthenticated } from "../serveses/authentication.js"

export const authMiddleware = (ctx,next) =>{
    ctx.isAuthenticated = isAuthenticated();
    next();

}