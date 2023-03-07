export const isAuthenticated = ()=>{
    let user = localStorage.getItem('user');
    return Boolean(user)
}