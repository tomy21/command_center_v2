import { createContext, useEffect, useState } from "react";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [popup, setPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [userLocation] = useState("A1"); // Lokasi user default

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:7001"); // Pastikan ini benar

        socket.onopen = () => {
            console.log("✅ Connected to WebSocket server");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("📩 WebSocket message received:", data);

            if (data.showPopup && data.userLocation === userLocation) {
                setMessage(`Popup untuk lokasi ${data.userLocation}`);
                setPopup(true);
            } else if (!data.showPopup) {
                setPopup(false);
            }
        };

        socket.onclose = () => {
            console.log("❌ WebSocket closed");
        };

        return () => {
            socket.close();
        };
    }, [userLocation]);

    const closePopup = async () => {
        try {
            await fetch("http://localhost:7001/close-popup", { method: "POST" });
            setPopup(false);
        } catch (error) {
            console.error("❌ Error closing popup:", error);
        }
    };

    return (
        <WebSocketContext.Provider value={{ popup, message, closePopup }}>
            {children}
        </WebSocketContext.Provider>
    );
};
