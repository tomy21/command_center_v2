import { useEffect, useState } from "react";

const CCTVStream = ({ cctvId, stopStream }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [streamActive, setStreamActive] = useState(true);
  const streamUrl = `http://127.0.0.1:5000/stream/${cctvId}`;

  useEffect(() => {
    if (!cctvId || stopStream) return;

    setLoading(true);
    setError(false);
    setStreamActive(true);

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(streamUrl, { signal }) // Menggunakan AbortController untuk kontrol request
      .then((response) => {
        if (!response.ok) throw new Error("Gagal memuat stream");
        return response.blob();
      })
      .then(() => setLoading(false))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(true);
          console.error("Error streaming CCTV:", err);
        }
      });

    return () => {
      controller.abort(); // Hentikan request ketika komponen unmount
      setStreamActive(false);
    };
  }, [cctvId, stopStream]);

  if (!streamActive || stopStream) return null;

  return (
    <div className="flex justify-center items-center h-full bg-black relative">
      {loading && !error && (
        <div className="flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="absolute flex justify-center items-center w-full h-full text-white">
          ⚠️ Gagal memuat CCTV
        </div>
      )}

      <img
        key={cctvId}
        src={streamUrl}
        alt={`CCTV Stream ${cctvId}`}
        className={`w-full max-w-3xl rounded-lg shadow-lg ${
          loading ? "hidden" : "block"
        }`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </div>
  );
};

export default CCTVStream;
