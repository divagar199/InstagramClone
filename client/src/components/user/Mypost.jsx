import React from "react";
import Userhighlights from "../user/Userhighlights";


function Mypost() {
  return (
    <>
    <section className="flex justify-evenly items-center w-120">
        <div className="w-40  rounded-lg text-center bg-gray-100 m-1 shadow">Edit profile</div>
        <div className="w-40 rounded-lg text-center bg-gray-100 m-1 shadow">View archive</div>
    </section>
    <section>
        <Userhighlights />
    </section>
     <section className="w-120 mb-3 shadow-lg pb-1 mt-5">
      <nav className="flex justify-around items-center">
        <div>
          <img
            className="w-8 hover:border-b-2 cursor-pointer"
            src="https://img.icons8.com/?size=100&id=gggXDzBncBYw&format=png&color=000000"
            alt="Posts"
          />
        </div>
        <div>
          <img
            className="w-8 hover:border-b-2 cursor-pointer"
            src="https://img.icons8.com/?size=100&id=3XhbZb5Pq0rs&format=png&color=000000"
            alt="save"
          />
        </div>
        <div>
          <img
            className="w-8 hover:border-b-2 cursor-pointer"
            src="https://img.icons8.com/?size=100&id=dX2RKl8ifzBH&format=png&color=000000"
            alt="repost"
          />
        </div>
        <div>
          <img
            className="w-8 hover:border-b-2 cursor-pointer "
            src="https://img.icons8.com/?size=100&id=ClUElsti2pWe&format=png&color=000000"
            alt="usertag"
          />
        </div>
      </nav>
    </section>
    </>
   
  );
}

export default Mypost;
