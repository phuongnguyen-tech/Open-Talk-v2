import { useState, useEffect } from "react";
import { handleJSAPIAccess, handleUserAuth } from "../utils/auth_access_util";

// Giả sử các hàm sau đã được định nghĩa ở đâu đó

const useUserAuth = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userAccessToken, setUserAccessToken] = useState("");

  useEffect(() => {
    // Xử lý xác thực
    handleJSAPIAccess((isSuccess) => {
      console.log("handleJSAPIAccess OK:", isSuccess);

      // Xử lý người dùng
      handleUserAuth((userInfo) => {
        setUserInfo(userInfo);

        // Cập nhật userAccessToken từ userInfo
        if (userInfo.accessToken) {
          setUserAccessToken(userInfo.accessToken);
        }
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { userInfo, userAccessToken };
};

export default useUserAuth;
