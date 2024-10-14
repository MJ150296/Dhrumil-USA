import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();

  const { data, city, state, isPrevious } = location.state || {};
  console.log(data, city, state, isPrevious);

  return (
    <>
      <div className="max-w-screen w-full flex justify-center items-center">
        <div className="w-full h-full flex">
          <LeftSide dataset={{data, city, state, isPrevious}} />
          <RightSide dataset={{data, city, state, isPrevious}}/>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
