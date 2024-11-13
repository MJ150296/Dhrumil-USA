import React, { useContext, useEffect } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useLocation } from "react-router-dom";
import { AddressContext } from "./Home/Home";

function Dashboard({ data, city, state, isPrevious, pollutant }) {
  // const location = useLocation();

  console.log(data, city, state, isPrevious, pollutant);

  // const [address, setAddress] = useContext(AddressContext);

  // useEffect(() => {
  //   if (address) {
  //     // console.log(address);
  //     const { cityName, state } = address;
  //     console.log(cityName, address);
  //   }
  // }, [address]);

  // const { data, city, state, isPrevious } = location.state || {};
  // console.log(data, city, state, isPrevious);

  return (
    <>
      <div className=" max-w-full flex justify-center items-center">
        <div className="w-full flex flex-col items-center">
          <RightSide dataset={{ data, city, state, isPrevious, pollutant }} />
          <LeftSide dataset={{ data, city, state, isPrevious }} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
