import React, { useEffect, useState } from "react";

function Userhighlights() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("https://instagramclone-w54j.onrender.com/api/profile")
      .then((data) => data.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <main className="pt-3 flex gap-2  items-center overflow-x-scroll w-120
      [&::-webkit-scrollbar]:h-[3px]
  [&::-webkit-scrollbar-thumb]:bg-gray-400
  [&::-webkit-scrollbar-track]:bg-gray-200
  sm:scroll-smooth
      ">
        {profile?.highlights?.length > 0 ? (
          profile.highlights.map((highlight) => (
           <div key={highlight.id} className="w-20 shrink-0 cursor-pointer flex items-center justify-center">
                <div >
                  <img
                    className=" w-17 rounded-full p-0.5 border-3 border-gray-400"
                    src={highlight.coverImage}
                    alt=""
                  />
                  <p className="text-xs text-center w-30px truncate">
                    {highlight.title}
                  </p>
                </div>
              </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </>
  );
}

export default Userhighlights;
