import React, { useEffect, useState } from "react";
import "../intro.css";

function Intro() {
  const [secondAnimation, setSecondAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSecondAnimation(true);
    }, 3000);
  }, []);
  return (
    <div className="bg-[rgb(22,23,24)] w-full h-full flex flex-col justify-center items-center">
      {/* HELLO */}
      <h1
        className="text-white ml-5 relative w-[max-content] font-mono text-xl md:text-4xl animate-typewriter tracking-widest"
        data-content="WELCOME TO"
      ></h1>

      {/* I am Mayank Joshi */}
      {secondAnimation && (
        <h1
          className="text-white ml-5 relative w-[max-content] font-mono text-xl md:text-4xl animate-typewriter tracking-wider"
          data-content="Air Quality analysis and prediction"
        ></h1>
      )}
    </div>
  );
}

export default Intro;
