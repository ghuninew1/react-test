
export default function Navlinks() {
    const links = [
        { to: "/", name: "Home", hidden: false, login: false },
        { to: "/api", name: "Api", hidden: false, login: false },
        { to: "/ping", name: "Ping", hidden: false, login: false },
    ];
    const login = [
        { to: "/signin", name: "Signin", hidden: false, login: false },
        { to: "/signup", name: "Signup", hidden: false, login: false },
    ]
    const dropdown = [
        { to: "/profile", name: "Profile", hidden: false, login: true },
        // { to: "/logout", name: "Logout", hidden: false, login: true },
    ];
    const api = [
        { to: "/api", name: "Api", hidden: false, login: false },
        { to: "/api/:id", name: "Api", hidden: false, login: false },
        { to: "/upload", name: "Upload", hidden: false, login: false },
    
    ]  

    return { links, dropdown, api , login};
}

