import instaLetter from "../assets/insta-letter__1_-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { use, useState } from "react";
import { useEffect } from "react";

function Navbar() {
  const navigation = useNavigate();
  const [profiles, setProfiles] = useState("");
  useEffect(() => {
    fetch("https://instagramclone-w54j.onrender.com/api/profile")
      .then((data) => data.json())
      .then((data) => setProfiles(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <nav className="pc_view_nav">
        <nav className="icon_show p-5 flex flex-col justify-between h-screen fixed hover:bg-white transition duration-500 ease-in ">
          <div className="nav_logo">
            <img
              onClick={() => {
                {
                  navigation("/");
                }
              }}
              src="https://img.icons8.com/?size=100&id=xw1GeBYO1mm6&format=png&color=000000"
              alt="insta"
              className="w-8 p-0 hidden sm:block"
            />
            <img
              onClick={() => {
                {
                  navigation("/");
                }
              }}
              src={instaLetter}
              alt="full letter image"
              className="w-30 p-0 sm:hidden"
            />
          </div>
          <div className="gap-7  flex flex-col  main_menu">
            <div className="flex items-center gap-2 hover:bg-gray-200 rounded-md p-1 cursor-pointer">
              <img
                onClick={() => {
                  {
                    navigation("/");
                  }
                }}
                src="https://img.icons8.com/?size=100&id=86527&format=png&color=000000"
                alt="home"
                className="w-7 p-0 "
              />{" "}
              <b className="">Home</b>
            </div>
            <div className="flex items-center gap-2 hover:bg-gray-200 rounded-md p-1 cursor-pointer">
              <img
                src="https://img.icons8.com/?size=100&id=YoIaSvIehcuI&format=png&color=000000"
                alt="reels"
                className="w-7 p-0 "
              />{" "}
              <b>Reels</b>
            </div>
            <div className="flex items-center gap-2 hover:bg-gray-200 rounded-md p-1 cursor-pointer">
              <img
                src="https://img.icons8.com/?size=100&id=H38NfunM6xeh&format=png&color=000000"
                alt="Messages"
                className="w-7 p-0 "
              />{" "}
              <b>Messages</b>
            </div>
            <div className="flex items-center gap-2 hover:bg-gray-200 rounded-md p-1 cursor-pointer">
              <img
                src="https://img.icons8.com/?size=100&id=7695&format=png&color=000000"
                alt="Search"
                className="w-7 p-0 "
              />{" "}
              <b>Search</b>
            </div>
            <div className="flex items-center gap-2 hover:bg-gray-200 rounded-md p-1 cursor-pointer">
              <img
                src="https://img.icons8.com/?size=100&id=86&format=png&color=000000"
                alt="Notifications"
                className="w-7 p-0 "
              />{" "}
              <b>Notifications</b>
            </div>
            <div className="flex items-center gap-2 hover:bg-gray-200 rounded-md p-1 cursor-pointer">
              <img
                src="https://img.icons8.com/?size=100&id=37784&format=png&color=000000"
                alt="Create"
                className="w-7 p-0 "
              />{" "}
              <b>Create</b>
            </div>
            <div
              onClick={() => {
                {
                  navigation("/profile");
                }
              }}
              className="flex items-center gap-2 hover:bg-gray-200 rounded-md p-1 cursor-pointer"
            >
              <img
                src={profiles.profilePic}
                alt="Profile"
                className="w-7 p-0 rounded-full"
              />{" "}
              <b>Profile</b>
            </div>
          </div>
          <div className="gap-7 flex flex-col more_menu">
            <div className="flex items-center gap-2 hover:bg-gray-200 rounded-md p-1 cursor-pointer">
              <img
                src="https://img.icons8.com/?size=100&id=59832&format=png&color=000000"
                alt="More"
                className="w-7 p-0 "
              />{" "}
              <b>More</b>
            </div>
            <div className="flex items-center gap-2 hover:bg-gray-200 rounded-md p-1 cursor-pointer">
              <img
                src="https://img.icons8.com/?size=100&id=8Z6hZva0O5wS&format=png&color=000000"
                alt="Also from Meta"
                className="w-7 pb-1 "
              />{" "}
              <b>Also from Meta</b>
            </div>
          </div>
        </nav>
      </nav>

      {/* mobile view nav */}
   
      <nav className="mobile_view_nav">
        <div className="flex justify-between items-center p-1 hide_md">
          <img
            onClick={() => {
              {
                navigation("/");
              }
            }}
            src={instaLetter}
            alt="full letter image"
            className="w-30 p-0 sm:hidden"
          />
          <span className="sm:hidden border rounded-4xl flex items-center gap-1 px-2 py-1">
            <span className="material-symbols-outlined">search</span>
            <input type="text" className="outline-none" placeholder="Search" />
          </span>
          <img
            src="https://img.icons8.com/?size=100&id=86&format=png&color=000000"
            alt="Notifications"
            className="w-7 p-0 cursor-pointer sm:hidden"
          />
        </div>
        <div className="sm:hidden flex justify-around items-center p-2 fixed w-full right-0 left-0 bottom-0 bg-white ">
          <img
            onClick={() => {
              {
                navigation("/");
              }
            }}
            src="https://img.icons8.com/?size=100&id=86527&format=png&color=000000"
            alt="home"
            className="w-7 p-0 cursor-pointer"
          />
          <img
            src="https://img.icons8.com/?size=100&id=YoIaSvIehcuI&format=png&color=000000"
            alt="reels"
            className="w-7 p-0 cursor-pointer"
          />
          <img
            src="https://img.icons8.com/?size=100&id=H38NfunM6xeh&format=png&color=000000"
            alt="Messages"
            className="w-7 p-0 cursor-pointer"
          />
          <img
            src="https://img.icons8.com/?size=100&id=7695&format=png&color=000000"
            alt="Search"
            className="w-7 p-0 cursor-pointer"
          />
          <img
            onClick={() => {
              {
                navigation("/profile");
              }
            }}
            src={profiles.profilePic}
            alt="Profile"
            className="w-7 p-0 rounded-full cursor-pointer"
          />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
