import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineRefresh } from "react-icons/md";
import axios from "axios";
import { users } from "../api/apiOcc";
import Loading from "../components/Loading";

function Login() {
  const [captcha, setCaptcha] = useState("");
  const [textCaptcha, setTextCaptcha] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const refreshString = () => {
    setCaptcha(Math.random().toString(36).slice(2, 8));
  };

  useEffect(() => {
    refreshString();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (textCaptcha === captcha) {
      setLoading(true);
      setValid(true);
      try {
        const dataLogin = {
          identifier: identifier,
          password: password,
        };

        const response = await users.login(
          dataLogin.identifier,
          dataLogin.password
        );
        console.log(response);
        navigate("/dashboard");
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.msg || "Login failed");
        } else {
          // Handle other errors (network issues, etc.)
          setErrorMessage("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setValid(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container m-auto max-h-screen">
        <div className="flex flex-col justify-center items-center mt-10">
          <div className="flex flex-col justify-start items-center space-y-2 mb-3">
            <img src={"/logo.png"} alt="Logo skyparking" className="w-20" />
            <h1 className="text-xl font-bold">Oprational command center</h1>
          </div>
          <div className="flex flex-col justify-start items-start border border-slate-300 p-3 w-1/4 rounded-md">
            <h1 className="text-base font-semibold">Selamat datang kembali,</h1>
            <h1 className="text-sm text-slate-400 mb-3">
              Silahkan login untuk memulai
            </h1>

            <div className="h-1 border-b border-slate-300 w-full mb-3"></div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 text-slate-500 bg-white w-full mb-2 text-sm"
                id="identifier"
                name="Identifier"
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Masukan email atau username"
              />
              <input
                type="password"
                className="border border-gray-300 rounded-md px-3 py-2 text-slate-500 bg-white w-full mb-2 text-sm"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
              />

              <div className="flex flex-row space-x-5 mb-2 relative">
                <div
                  className={`text-xl rounded-sm p-1 ${
                    valid ? "bg-green-500" : "bg-black text-white"
                  } font-semibold w-full h-10 text-center tracking-widest select-none`}
                >
                  {captcha.split("").join(" ")}
                </div>
                <button
                  type="button"
                  className="p-2 bg-white shadow-md h-full w-10 absolute right-0"
                  onClick={refreshString}
                >
                  <MdOutlineRefresh />
                </button>
              </div>

              <div className="flex flex-col mb-5 text-sm">
                <input
                  type="text"
                  className={`border px-3 py-2 rounded-md ${
                    valid ? "border-green-500" : "border-red-500"
                  }`}
                  placeholder="Enter Captcha"
                  value={textCaptcha}
                  onChange={(e) => setTextCaptcha(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-500 w-full py-2 rounded-md"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
