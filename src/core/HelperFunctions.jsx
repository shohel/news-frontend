export const currentUser = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if ( user?.name ) {
        return user;
    }

    return false;
}