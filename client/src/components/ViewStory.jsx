import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function ViewStory() {
  const { id, nxt } = useParams();
  const navigate = useNavigate();

  const [vstory, setVstory] = useState(null);

  useEffect(() => {
    if (!id) return;

    if (Number(id) <= 0 || Number(id) > 15) {
      navigate("/");
      return;
    }

    fetch(`https://instagramclone-w54j.onrender.com/api/stories/${id}`)
      .then((data) => data.json())
      .then((data) => setVstory(data))
      .catch((err) => console.log(err));
  }, [id, navigate]);

  const renderMedia = () => {
    if (!vstory) return null;

    if (vstory.mediaType === "image") {
      return (
        <div>
          <img
            className="h-screen"
            src={vstory.mediaUrl}
            alt={vstory.mediaType}
          />
        </div>
      );
    }

    if (vstory.mediaType === "video") {
      return (
        <video
          className="h-screen"
          src={vstory.mediaUrl}
          autoPlay
          controls
          loop
        />
      );
    }

    return null;
  };

  return (
    <div>
      {vstory ? (
        <div className="bg-black/70 backdrop-blur-md dark:bg-black">
          <div className=" flex justify-center items-center z-2">
            {/* story header */}
            <div className=" flex items-center text-amber-50 justify-between  absolute top-5 right-auto left-auto story_header_adj ">
              <div className="flex items-center gap-2">
                <img
                  className="w-12 rounded-full cursor-pointer"
                  src={vstory.userProfilePic}
                  alt="story_profile"
                />
                {vstory.username}
              </div>
              <div className="pl-50">
                <img
                  className="w-9 cursor-pointer"
                  src="https://img.icons8.com/?size=100&id=98963&format=png&color=ffffff"
                  alt="story_menu"
                />
              </div>
            </div>
            <Link to={`/`}>
              <img
                className="absolute right-0 top-0 w-10 cursor-pointer opacity-30 hover:opacity-100"
                src="https://img.icons8.com/?size=100&id=9433&format=png&color=ffffff"
                alt="cancel"
              />
            </Link>
            <Link to={`/story/${Number(id) - 1}/${nxt}`}>
              <img
                className="w-10 relative left-0 opacity-30 hover:opacity-100 "
                src="https://img.icons8.com/?size=100&id=99284&format=png&color=ffffff"
                alt="previous"
              />
            </Link>

            {renderMedia()}

            <Link to={`/story/${Number(id) + 1}/${nxt}`}>
              <img
                className="w-10 relative right-0 opacity-30 hover:opacity-100 "
                src="https://img.icons8.com/?size=100&id=100007&format=png&color=ffffff"
                alt="next"
              />
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ViewStory;
