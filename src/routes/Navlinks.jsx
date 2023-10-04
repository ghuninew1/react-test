const links = [
    { to: "/", name: "Home", hidden: false, login: false },
    { to: "/api", name: "Api", hidden: false, login: false },
    { to: "/ping", name: "Ping", hidden: false, login: false },
    { to: "/upload", name: "Upload", hidden: false, login: false },
    { to: "/signin", name: "Signin", hidden: false, login: true },
    { to: "/signup", name: "Signup", hidden: false, login: true },
    {
        to: "/profile",
        name: "Profile",
        hidden: true,
        login: true,
    },
];

export default function Navlinks() {
    const token = localStorage.getItem("token");
    const linkTongle = () => {
        if (token) {
            links[4].hidden = true;
            links[5].hidden = true;
            links[4].login = false;
            links[5].login = false;
        } else {
            links[4].hidden = false;
            links[5].hidden = false;
            links[4].login = true;
            links[5].login = true;
        }
    };
    linkTongle();
    return links;
} 
