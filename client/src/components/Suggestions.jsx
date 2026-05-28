import React, { useEffect } from "react";
import { useState } from "react";

function Suggestions() {
  const [profile, setProfiles] = useState([]);
  const [suggest, setSuggest] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/profile")
      .then((data) => data.json())
      .then((data) => setProfiles(data[0])) // Select the first profile from the array
      .catch((err) => console.log(err));

    fetch("http://localhost:3000/api/suggestions")
      .then((data) => data.json())
      .then((data) => setSuggest(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <aside>
        {profile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="">
                {!profile.profilePic ? (
                  <img
                    className="rounded-full w-10"
                    src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                    alt={profile.fullName}
                  />
                ) : (
                  <img
                    className="rounded-full w-10"
                    src={profile.profilePic}
                    alt={profile.fullName}
                  />
                )}
              </div>
              <div>
                <p className="text_bold">{profile.username}</p>
                <p className="text-stone-600 text-sm ">{profile.fullName}</p>
              </div>
            </div>
            <p className="text-blue-700 text-sm  text_bold hover:underline cursor-pointer">
              Switch
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {/* suggestion */}
        <div>
          <div className="text-sm flex items-center justify-between py-5">
            <p>Suggested for you</p>
            <p className="hover:underline cursor-pointer">See All</p>
          </div>
          <div>
            {suggest.length > 0 ? (
              <div>
                {suggest.map((sugg) => (
                  <div
                    key={sugg.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 py-1 ">
                      <div>
                        {!sugg.profilePic ? (
                          <img
                            className="rounded-full w-10"
                            src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                            alt={sugg.fullName}
                          />
                        ) : (
                          <img
                            className="rounded-full w-10"
                            src={sugg.profilePic}
                            alt={sugg.fullName}
                          />
                        )}
                      </div>
                      <div>
                        <p className="text_bold">{sugg.fullName}</p>
                        <p className="text-stone-600 text-sm ">
                          Suggest for you
                        </p>
                      </div>
                    </div>
                    <p className="text-blue-700 text-sm  text_bold hover:underline cursor-pointer">
                      follow
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="flex flex-wrap text-xs gap-1 pt-6  text-gray-500 ">
            <span className="hover:underline cursor-pointer">About</span>.
            <span className="hover:underline cursor-pointer">Help</span>.
            <span className="hover:underline cursor-pointer">Press</span>.
            <span className="hover:underline cursor-pointer">API</span>.
            <span className="hover:underline cursor-pointer">Jobs</span>.
            <span className="hover:underline cursor-pointer">Privacy</span>.
            <span className="hover:underline cursor-pointer">Terms</span>.
            <span className="hover:underline cursor-pointer">Locations</span>.
            <span className="hover:underline cursor-pointer">Language</span>.
            <span className="hover:underline cursor-pointer">Meta Verified</span>.
          </div>
          <div className="text-sm pt-6 text-gray-500">
            <p>© 2026 Instagram from Meta</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Suggestions;
