import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import App from "./../App";
import Mypost from "./user/Mypost";

function Profile() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/profile")
      .then((res) => {
        // The server returns an array of profiles. Assuming we want the first one.
        setProfile(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  //   text-center tracking-widest list-image-[url('https://img.icons8.com/?size=100&id=14095&format=png&color=000000')]
  return (
    <>
      {profile ? (
        <div className="flex flex-col justify-center">
          {<Navbar />}
          <main className="grid justify-center">
            <nav className="w-120 mb-5">
              <div className=" flex justify-between items-center">
                <img
                  className="w-8"
                  src="https://img.icons8.com/?size=100&id=3220&format=png&color=000000"
                  alt=""
                />
                <p className="text_bold">{profile.username}</p>
                <img
                  className="w-8"
                  src="https://img.icons8.com/?size=100&id=36389&format=png&color=000000"
                  alt=""
                />
              </div>
            </nav>
            <section className="grid justify-center gap-2   ">
              <div className="flex items-center gap-2 justify-center-safe">
                <div className="rounded-full bg-linear-to-tr from-[#FFC700] via-[#FF0A61] to-[#D300C5] p-0.5">
                  <img
                    className="rounded-full w-20 border-3 border-white"
                    src={profile.profilePic}
                    alt="profile_pic"
                  />
                </div>
                <div className="flex-col ">
                  <div>
                    <p className="text_bold  ">{profile.fullName}</p>
                  </div>
                  <div className="flex gap-8 text-center tracking-wide font-weight">
                    <h1>
                      <p className="text-md">{profile.followers}</p>{" "}
                      <p className="text-xs">Followers</p>
                    </h1>
                    <h1>
                      <p className="text-md">{profile.following}</p>
                      <p className="text-xs">following</p>
                    </h1>
                    <h1>
                      {""}
                      <p className="text-md">{profile.posts}</p>
                      <p className="text-xs">posts</p>
                    </h1>
                  </div>
                </div>
              </div>
              <div className=" bio_text  w-90 ">
                <p className="text-sm">{profile.bio}</p>
              </div>
            </section>
            <section>
              <Mypost />
            </section>
          </main>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Profile;
