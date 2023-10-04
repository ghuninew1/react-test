// import React, { useContext, useState, useEffect } from "react";
import { UseUser } from "../../store/DataContext";

const Profile = () => {
    const user = UseUser().user;

console.log("user", user);
const userData = () => {
    return (
        <div>
            <h2>{user.username && user.username}</h2>
            <h2>{user.email && user.email}</h2>
            <h2>{user.roles && user.roles[0].role}</h2>
            <h3>{user.roles && user.roles[0].id}</h3>

            {/* convert to lpocal time "th-TH" */}
            <h3>{(user.tokens[0].expires).toLocaleString("th-TH")}</h3>
            {/* <h2>{user.tokens && user.tokens[0].token}</h2> */}



            {/* <h3>{(user.tokens[0].expires).slice(0, 10)}</h3> */}
        </div>
    );
};
    return (
        <div className="container">
            <h1>Profile</h1>
            {userData()}
        </div>
    );
};

export default Profile;
