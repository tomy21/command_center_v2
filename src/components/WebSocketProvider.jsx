import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client"; // Import socket.io-client

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Buat koneksi ke server Socket.IO
    // const socket = io("http://localhost:3008"); // Ganti URL sesuai dengan backend
    const socket = io("https://ws-occ.skyparking.online");

    socket.emit("adminOnline");

    // Ketika koneksi berhasil
    socket.on("connect", () => {
      console.log("Socket.IO connection opened");
    });

    // Menerima pesan dari server
    socket.on("gateViewed", (data) => {
      console.log("Message received from server:", data);
      if (data.data === "gate_Open") {
        setMessage("");
        setIsOpen(false);
      } else {
        setMessage(data);
        setIsOpen(true);
      }
    });

    // Saat socket terputus
    socket.on("disconnect", () => {
      console.log("Socket.IO connection closed");
    });

    // Bersihkan koneksi saat component unmount
    return () => {
      socket.emit("adminOffline");
      socket.disconnect();
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <WebSocketContext.Provider value={{ message, isOpen, closePopup }}>
      {children}
    </WebSocketContext.Provider>
  );
};
