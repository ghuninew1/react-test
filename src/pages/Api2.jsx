import React from "react";
import { useState, useEffect } from "react";

const Api2 = () => {
    const [status, setStatus] = useState("offline");
    const [ping, setPing] = useState("Disconnected");
    const [time, setTime] = useState(new Date().toLocaleString("th"));
    const [location, setLocation] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    //websocket cloudflare worker api det time res and req
    const fetchData = async () => {
        const ws = new WebSocket("ws://api.ghuninew.workers.dev/ws");
        ws.onopen = () => {
            setStatus("online");
            setPing("Connected");
        };
        ws.onclose = () => {
            setStatus("offline");
            setPing("Disconnected");
        };

        //get location logitude and latitude from client
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation(
                `Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`
            );
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>API 2</h1>
                    <p>สถานะ: {status}</p>
                    <p>สถานะการเชื่อมต่อ: {ping}</p>
                    <p>เวลา: {time}</p>
                    <p>สถานที่: {location}</p>
                </div>
            </div>
        </div>
    );
};

export default Api2;
