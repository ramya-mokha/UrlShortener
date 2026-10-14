import React from "react";
import {
  IoLink,
  IoCopyOutline,
  IoAnalytics,
  IoSettingsOutline,
} from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import { PiSignOutFill } from "react-icons/pi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useState, useEffect } from "react";
import { createShortUrl, getMyUrls } from "../services/urlService";
import ShortenUrlForm from "../components/ShortenUrlForm";
import LinkCard from "../components/LinkCard";
import { logoutUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard2 = () => {
  const [newLink, setNewLink] = useState(false);
  const [currPage, setCurrPage] = useState("analytics");
  const [sort, setSort] = useState("new");
  const [filter, setFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [shortLink, setShortLink] = useState(null);
  const [link, setLink] = useState("");
  const [myUrls, setMyUrls] = useState([]);
  const navigate = useNavigate();
   const {user,setUser,loading,fetchCurrentUser} = useAuth();
  const handleSubmit = async () => {
    const response = await createShortUrl(link);
    setMyUrls((prev) => {
      const exists = prev.some((url) => url._id === response._id);
      if (exists) return prev;
      console.log(response);
      return [...prev, response];
    });
    setShortLink(response.shortCode);
  };
  const handleSignOut = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleSearchUrls = (e) => {
    setSearchInput(e.target.value);
  };
  let comparator;
  if (sort === "new") {
    comparator = (a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    };
  } else if (sort === "old") {
    comparator = (a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    };
  } else if (sort === "clicks") {
    comparator = (a, b) => {
      return b.clicks - a.clicks;
    };
  }
  const displayedUrls = myUrls
    .filter((url) => {
      const text = searchInput.toLowerCase().trim();

      return (
        url.shortCode.toLowerCase().includes(text) ||
        url.url.toLowerCase().includes(text)
      );
    })
    .sort(comparator);
  const openUrlForm = () => {
    setNewLink((prev) => {
      if (prev) setShortLink(null);
      return !prev;
    });
  };
  let totalClicks = myUrls.reduce((total, url) => {
    return total + url.clicks;
  }, 0);

  const data = [
    {
      title: myUrls.length,
      desc: "Total Links",
      icon: IoLink,
      color: "text-indigo-400",
    },
    {
      title: totalClicks,
      desc: "Total Clicks",
      icon: SiSimpleanalytics,
      color: "text-pink-400",
    },
    {
      title: 0,
      desc: "Today's Clicks",
      icon: IoAnalytics,
      color: "text-emerald-400",
    },
    {
      title: myUrls.length,
      desc: "Active Links",
      icon: IoCopyOutline,
      color: "text-amber-400",
    },
  ];
  const handleAnalytics = () => {
    setCurrPage("analytics");
  };
  const handleSettings = () => {
    setCurrPage("settings");
  };
  const handleLinks = () => {
    setCurrPage("links");
  };

  useEffect(() => {
    const fetchUrls = async () => {
      const data = await getMyUrls();
      setMyUrls(data);
    };

    fetchUrls();
  }, []);
  useEffect(()=>{
    const fetchUser=async()=>{
      fetchCurrentUser();
    }
    fetchUser();
  },[])
  return (
    <div className="flex bg-zinc-950 min-h-screen text-zinc-100  ">
      <div className="w-[17%] flex flex-col justify-between gap-2 border-r border-zinc-800 bg-zinc-900/40 p-5 shrink-0 h-screen fixed left-0 top-0">
        <div>
          <div className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent pb-4 border-b border-zinc-800 mb-2">
            slnk.io
          </div>
          <div className="flex flex-col gap-2">
            <button
              className={`p-2.5 rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer w-full ${
                currPage === "analytics"
                  ? "bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              }`}
              onClick={handleAnalytics}
            >
              <SiSimpleanalytics size={16} />
              Analytics
            </button>
            <button
              className={`p-2.5 rounded-xl flex items-center gap-3 text-sm w-full font-medium cursor-pointer ${
                currPage === "links"
                  ? "bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              }`}
              onClick={handleLinks}
            >
              <IoLink size={16} />
              My Links
            </button>
            <button
              className={`p-2.5 rounded-xl flex items-center gap-3 text-sm w-full font-medium cursor-pointer ${
                currPage === "settings"
                  ? "bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              }`}
              onClick={handleSettings}
            >
              <IoSettingsOutline size={16} />
              Settings
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="flex gap-2 items-center">
            <div>
              <MdOutlineAccountCircle size={30} color="blue"/>
            </div>
            <div className="overflow-hidden">
              <p className="font-light text-zinc-400">{user?.name}</p>
              <p className="text-sm font-light text-zinc-400">{user?.email}</p>
            </div>
          </div>
          <div className="p-2 w-full hover:text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer flex  gap-3 items-center transition-colors ">
            <PiSignOutFill size={20}/>
            <button className="font-light text-sm" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      </div>

      <div className=" ml-[19%] w-[85%] flex flex-col gap-6 pr-4 pt-5">
        <div className="flex justify-between items-center ">
          <p className="text-2xl font-bold text-zinc-100">
            Hello,{" "}
            <span className="text-indigo-400">{user?.name || "User"}</span>
          </p>
          <button
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer text-sm"
            onClick={openUrlForm}
          >
            + New Link
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          {data.map((d, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 hover:border-zinc-700/80 transition-all flex flex-col justify-between w-72"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">
                  {d.desc}
                </span>
                <d.icon className={d.color} size={18} />
              </div>
              <p className="text-2xl font-bold text-zinc-100 mt-3">{d.title}</p>
            </div>
          ))}
        </div>
        {newLink && (
          <ShortenUrlForm
            link={link}
            setLink={setLink}
            handleSubmit={handleSubmit}
            shortLink={shortLink}
          />
        )}
        <div className="flex gap-3 items-center flex-wrap">
          <input
            type="text"
            placeholder="Search links, tags, URLs..."
            className=" bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none p-3 rounded-xl text-sm transition-all w-80 md:w-190"
            onChange={(e) => handleSearchUrls(e)}
          />
          <select
            name="filter"
            id="filter"
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 focus:border-indigo-500 focus:outline-none p-3 rounded-xl text-sm cursor-pointer"
          >
            <option value="AllLinks">All Links</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
          <select
            name="sort"
            id="sort"
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 focus:border-indigo-500 focus:outline-none p-3 rounded-xl text-sm cursor-pointer"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
            <option value="clicks">Most Clicks</option>
          </select>
        </div>
        {displayedUrls.length == 0 ? (
          <p>No Links yet</p>
        ) : (
          displayedUrls.map((url) => (
            <LinkCard
              shortCode={url.shortCode}
              url={url.url}
              clicks={url.clicks}
              key={url.shortCode}
              createdAt={url.createdAt}
              setMyUrls={setMyUrls}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard2;
