import React, { useEffect, useState } from "react";
//components
//
import {
  handleJSAPIAccess,
  handleUserAuth,
} from "../../utils/auth_access_util";
import "./index.css";
import EventView from "../../components/event/view/event-view";
import TopicView from "../../components/topic/view/topic-view";

export default function Home() {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    //鉴权处理
    handleJSAPIAccess((isSucces) => {
      console.log("handleJSAPIAccess OK: ", isSucces);
      //免登处理
      handleUserAuth((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log("user", userInfo);

  return (
    <div className="home">
      <EventView />
      <TopicView userInfo={userInfo} />
    </div>
  );
}
