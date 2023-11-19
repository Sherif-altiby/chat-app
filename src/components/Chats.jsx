import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { ChatContext } from "../components/context/ChatContext";
import { db } from "../firebase";
const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch, setBlock } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setBlock(false)
  };
 


  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => a[1].data - b[1].data)
        .map((chat) => (
          <div
            className="user"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="user_info">
              <div className="name"> {chat[1].userInfo.displayName} </div>
              <div className="last_message"> {chat[1].lastMessage?.text}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
