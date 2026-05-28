import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";


function Feeds() {
  return (
    <>
        <div className="flex flex-col ">
            <Stories />
            <Posts />
        </div>
    </>
  );
} 

export default Feeds;
