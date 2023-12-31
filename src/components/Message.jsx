import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { ChatContext } from "../components/context/ChatContext";

const Message = ( { message } ) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="message_info">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <h5> Just Now </h5>
      </div>
      <div className="message_content">
        <p>
        {message.text}
        </p>
        {message.img && <img src={message.img} alt="" className="send_img" />}
      </div>
    </div>
  );
};

export default Message;
