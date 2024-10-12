import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-transparent w-full">
      <ClipLoader size={150} color={"#F3C623"} loading={true} />
    </div>
  );
};

export default Loading;
