import { isAuthenticated } from "./authentication.js"

export const authMiddleware =(ctx,next)=>{
    ctx.isAuthenticated = isAuthenticated();

    next();
    
}