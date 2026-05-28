import React, { useEffect } from "react";
import { useState } from "react";
import { timeAgo } from "./timeAgo";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://instagramclone-w54j.onrender.com/api/posts")
      .then((data) => data.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <section className="  ">
        {posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <figure key={post.id} className="flex justify-center">
                {/* postcard */}
                <section className="p-3 flex flex-col rounded-md w-120 gap-3">
                  {/* userProfile */}
                  <div className="flex items-center justify-between px-2">
                    <div>
                      <div className="flex items-center gap-2">
                        {/* profile pic */}
                        <div className="">
                          {!post.userProfilePic ? (
                            <img
                              className="rounded-full w-10"
                              src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                              alt={post.username}
                            />
                          ) : (
                            <img
                              className="rounded-full w-10"
                              src={post.userProfilePic}
                              alt={post.username}
                            />
                          )}
                        </div>
                        <div>{post.username} </div>
                        <div> • {timeAgo(post.timestamp)}</div>
                      </div>

                      {/* username */}
                    </div>
                    <div>
                      <img
                        className="w-4 cursor-pointer"
                        src="https://img.icons8.com/?size=100&id=m0ZXbPYx23Eg&format=png&color=000000"
                        alt="postmenu"
                      />
                    </div>
                  </div>

                  {/* post image */}
                  <div>
                    <img
                      className="rounded-md w-120"
                      src={post.imageUrl}
                      alt="post"
                    />
                  </div>
                  {/* likes and comments section*/}
                  <div>
                    <div className="flex justify-between px-2">
                      <div className="flex ">
                        <span className="flex items-center cursor-pointer">
                          <img
                            className="w-7"
                            src="https://img.icons8.com/?size=100&id=86&format=png&color=000000"
                            alt="Like"
                          />
                          <p className="mx-2">{post.likes}</p>
                        </span>
                        <span className="flex items-center cursor-pointer">
                          <img
                            className="w-7 "
                            src="https://img.icons8.com/?size=100&id=93386&format=png&color=000000"
                            alt="comment"
                          />
                          <p className="mx-2">{post.comments}</p>
                        </span>
                        <span className="flex items-center cursor-pointer">
                          <img
                            className="w-7"
                            src="https://img.icons8.com/?size=100&id=96080&format=png&color=000000"
                            alt="repost"
                          />
                          <p className="mx-2">{post.reposts}</p>
                        </span>
                        <span className="flex items-center cursor-pointer">
                          <img
                            className="w-7"
                            src="https://img.icons8.com/?size=100&id=I4LyDPh3a8ch&format=png&color=000000"
                            alt="share"
                          />
                          <p className="mx-2">{post.shares}</p>
                        </span>
                      </div>
                      <div>
                        <span className="flex items-center cursor-pointer ">
                          <img
                            className="w-7"
                            src="https://img.icons8.com/?size=100&id=82461&format=png&color=000000"
                            alt="save"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap px-2">
                      <p>{post.caption}</p>
                    </div>
                  </div>
                </section>
              </figure>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </section>
    </>
  );
}

export default Posts;
