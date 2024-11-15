export function saveUserLoginData(token,user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUserLoginData(){
    //getting token
    const token = localStorage.getItem("token");
    //getting user is there is otherwise null
    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;

    // if user and token {token ,user}    
    if (user && token) {
        return {
            token,
            user,
        };
    } else return null;
    
}

// remove user informations from local storage

export function removeUserLoginData() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}