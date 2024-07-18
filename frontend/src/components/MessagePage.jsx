import moment from 'moment';
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaImage, FaPlus, FaVideo } from "react-icons/fa6";
import { IoIosClose, IoMdSend } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import bgImage from "../../public/assets/images/wallpaper.jpeg";
import '../App.css';
import uploadFile from "../utils/uploadImage";
import Avatar from "./Avatar";
import LoadingComponent from "./LoadingComponent";

const MessagePage = () => {
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: ""
  });
  const [uploadImageVideoMenu, setUploadImageVideoMenu] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allMessages, setAllMessages] = useState([])
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  });

  const params = useParams();
  const socketConnection = useSelector((state) => state?.user?.socketConnection);
  const user = useSelector((state) => state?.user);

  const handleClearUploadedImage = () => {
    setMessage((prev) => {
      return { ...prev, imageUrl: "" };
    });
  };

  const handleClearUploadedVideo = () => {
    setMessage((prev) => {
      return { ...prev, videoUrl: "" };
    });
  };

  const handleUploadImageVideoMenu = () => {
    setUploadImageVideoMenu(prev => !prev);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setUploadImageVideoMenu(false);
    setMessage((prev) => {
      return { ...prev, imageUrl: uploadPhoto.url };
    });
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setUploadImageVideoMenu(false);
    setMessage((prev) => {
      return { ...prev, videoUrl: uploadPhoto.url };
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setMessage(prev => {
      return { ...prev, text: value };
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit("new message", {
          sender: user._id,
          reciever: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user._id,
        });
        setMessage({ text: "", imageUrl: "", videoUrl: "" });
      }
    }
  };

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);
      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      });
      socketConnection.emit("previous-conversation", { sender: user._id, reciever: params.userId })
      socketConnection.on("message", (data) => {
        setAllMessages(data);
      });
    }
    return () => {
      if (socketConnection) {
        socketConnection.off("message-user");
        socketConnection.off("message");
      }
    };
  }, [socketConnection, params.userId, user]);

  return (
    <div style={{ backgroundImage: `url(${bgImage})` }} className="bg-slate-800 w-full h-full bg-no-repeat bg-cover">
      <header className="sticky top-0 h-16 bg-white flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <Link to={"/"} className="lg-hidden">
            <MdKeyboardArrowLeft size={30} className="text-slate-600" />
          </Link>
          <Avatar imageUrl={dataUser.profile_pic} width={50} height={50} name={dataUser.name} userId={dataUser._id} />
          <div>
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">{dataUser.name}</h3>
            <p className="-my-2">
              {dataUser.online ? <span className="text-primary text-xs">Online</span> : "Offline"}
            </p>
          </div>
        </div>
        <button className="cursor-pointer hover:text-primary">
          <BsThreeDotsVertical className="text-slate-600" />
        </button>
      </header>

      <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50">

        <div className="flex flex-col gap-2 p-4">
          {allMessages.map((msg, ind) => (
            <div key={ind} className={`bg-white w-fit p-1 py-1 rounded ${user._id === msg.msgByUserId ? "ml-auto bg-teal-300 text-white" : ""}`}>
              <div className="max-w-56 ">
                {
                  msg?.imageUrl && (
                    <img className='w-full rounded-lg h-full object-scale-down' src={msg?.imageUrl} alt="img" />
                  )
                }
              </div>
              <p className="px-2">{msg.text}</p>
              <p className="text-xs text-end pt-1">{moment(msg.createdAt).format("hh:mm")}</p>
            </div>
          ))}
        </div>
        {message.imageUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div onClick={handleClearUploadedImage} className="w-fit p-2 absolute top-0 right-0 hover:text-primary cursor-pointer">
              <IoIosClose size={30} />
            </div>
            <div className="bg-white p-3">
              <img src={message.imageUrl} className="aspect-square w-full h-full max-w-sm m-2 object-scale-down" alt="upload Image" />
            </div>
          </div>
        )}
        {message.videoUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div onClick={handleClearUploadedVideo} className="w-10 h-10 rounded-full bg-white p-2 absolute top-2 flex justify-center items-center right-2 hover:text-primary cursor-pointer">
              <IoIosClose size={35} />
            </div>
            <div className="bg-white p-3">
              <video src={message.videoUrl} muted controls autoPlay className="aspect-square w-full h-full max-w-sm m-2 object-scale-down" />
            </div>
          </div>
        )}
        {loading && <div className='sticky bottom-0'>
          <LoadingComponent /></div>}
      </section >

      <section className="bg-white h-16 flex items-center px-4">
        <div className="relative">
          <button onClick={handleUploadImageVideoMenu} className="cursor-pointer flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white">
            <FaPlus size={20} />
          </button>
          {uploadImageVideoMenu && (
            <div className="shadow rounded bg-white absolute bottom-16 w-36 p-2">
              <form>
                <label htmlFor="uploadImage" className="flex items-center p-2 px-3 gap-2 hover:bg-slate-200 cursor-pointer">
                  <div className="text-primary">
                    <FaImage />
                  </div>
                  <p>Image</p>
                </label>
                <label htmlFor="uploadVideo" className="hover:bg-slate-200 cursor-pointer flex items-center px-3 p-2 gap-2">
                  <div className="text-purple-500">
                    <FaVideo />
                  </div>
                  <p>Video</p>
                </label>
                <input type="file" id="uploadImage" onChange={handleUploadImage} className="hidden" />
                <input type="file" id="uploadVideo" onChange={handleUploadVideo} className="hidden" />
              </form>
            </div>
          )}
        </div>
        <form className="w-full gap-2 h-full flex justify-between items-center" onSubmit={handleSendMessage}>
          <div className="flex justify-between w-full">
            <input type="text" placeholder="type message here..." className="outline-none w-full h-full py-1 px-4" value={message.text} onChange={handleOnChange} />
            <button className="text-primary hover:text-secondary">
              <IoMdSend size={25} />
            </button>
          </div>
        </form>
      </section>
    </div >
  );
};

export default MessagePage;
