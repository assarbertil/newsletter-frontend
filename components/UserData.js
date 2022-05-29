import axios from "axios";
import { useEffect, useState } from "react";

export const UserData = ({ userId }) => {
  const [userData, setUserData] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userId}`, {
        withCredentials: true,
      })
      .then(response => {
        console.log(response);
        setUserData(response.data);
        console.log("UserData: ", response.data);
        console.log("set to ", response.data.isSubscribed);
        setIsSubscribed(response.data.isSubscribed);
      });
  }, [userId]);

  return (
    <div>
      <p>
        Logged in as: <strong>{userData.email}</strong>
        <br />
        Subscription status:{" "}
        <strong>{isSubscribed ? "Subscribed" : "Unsubscribed"}</strong>{" "}
      </p>
      <div>
        <button
          onClick={() => {
            axios.patch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userId}`,
              {
                isSubscribed: !isSubscribed,
              },
              { withCredentials: true }
            );

            setIsSubscribed(!isSubscribed);
          }}
        >
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>
      <br />
      <div>
        <button
          onClick={() => {
            localStorage.removeItem("userId");
            location.reload();
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};
