const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    return user?.refreshToken;
};

const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    return user?.accessToken;
};

const updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("token"));
    user.accessToken = token;
    localStorage.setItem("token", JSON.stringify(user));
};

const getUser = () => {
    return JSON.parse(localStorage.getItem("token"));
};

const setUser = (user) => {
    console.log(JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(user));
};

const removeUser = () => {
    localStorage.removeItem("token");
};

const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
};

export default TokenService;
