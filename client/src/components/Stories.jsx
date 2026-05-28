import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Stories() {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/stories")
      .then((data) => data.json())
      .then((data) => setStories(data))
      .catch((err) => console.log(err));
  }, []);

  const nxt = stories.length;

  return (
    <>
      <div
        className="flex   h-30 gap-5 items-center overflow-x-scroll
        [&::-webkit-scrollbar]:h-[3px]
      [&::-webkit-scrollbar-thumb]:bg-gray-400
      [&::-webkit-scrollbar-track]:bg-gray-200 story_adj"
      > 
        {stories.length > 0 ? (
          stories.map((story) => (
            <div
              key={story.id}
              onClick={() => {
                navigate(`/story/${story.id}/${nxt}`);
              }}
            >
              <div className="w-20 cursor-pointer">
                <div>
                  <img
                    className=" w-20 rounded-full p-1  bg-linear-to-tr from-[#FFC700] via-[#FF0A61] to-[#D300C5] "
                    src={story.userProfilePic}
                    alt={story.username}
                  />
                  <p className="text-xs text-center w-30px truncate">
                    {story.username}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Stories;
