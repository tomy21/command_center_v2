import { useContext } from "react";
import { WebSocketContext } from "../contexts/WebSocketContext";

const WebSocketPopup = () => {
    const { popup, message, closePopup } = useContext(WebSocketContext);

    if (!popup) return null; // Jangan tampilkan kalau popup tidak aktif

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">{message}</h2>
                <button onClick={closePopup} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Tutup
                </button>
            </div>
        </div>
    );
};

export default WebSocketPopup;
