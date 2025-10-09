export const redirectToLogin = () => {
    localStorage.clear();
    if (window.location.pathname !== "/login") {
        window.location.assign("/login");
    }
};