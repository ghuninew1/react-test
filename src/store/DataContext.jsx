import { createContext, useState, useContext, useEffect, useMemo, useCallback } from "react";

const UserContext = createContext(null);
const ThemeContext = createContext("light");
export const UseUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UseTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};


// eslint-disable-next-line react/prop-types
export default function DataProvider({ children }) {
    const [users, setUsers] = useState(null);
    const [themes, setThemes] = useState(localStorage.getItem("theme") || "light");
    let theme = useMemo(() => themes, [themes]);
    let user = useMemo(() => users, [users]);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-bs-theme", theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setThemes((prev) => (prev === "light" ? "dark" : "light"));
    }, [setThemes]);

    const userCheck = useCallback((data) => {
        setUsers(data);
    }, [setUsers]);

    return (
        <UserContext.Provider value={{ user, userCheck }}>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
        </UserContext.Provider>
    );
}

