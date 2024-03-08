import React from "react";
import "./Loader.scss";

const Loader: React.FC = () => {
  // Declare and increment the variable before the loop
  let n = 0;

  // Array to hold list items
  const listItems: JSX.Element[] = [];

  // While loop to create list items
  while (n < 18) {
    listItems.push(<li key={n}></li>);
    n++;
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="loader">
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__ball"></div>
      </div>
    </div>
  );
};

export default Loader;
