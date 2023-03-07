
export const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    return Boolean(user);
    
}