import axios from "axios";
import { styled } from "@stitches/react";
import { useState, useEffect } from "react";
import { UserData } from "../components/UserData";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const exists = localStorage.getItem("userId") != null;
    setIsLoggedIn(exists);
  }, []);

  const login = e => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response);
        if (response.data.user) {
          setIsLoggedIn(true);
          localStorage.setItem("userId", response.data.user._id);
        }
      })
      .catch(error => {
        setErrorMsg(error.response.data.message);
      });
  };

  const register = e => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response);

        alert("User created successfully");
      })
      .catch(error => {
        console.log(error.response);
        // setErrorMsg(error.response.data.message);
      });
  };

  return (
    <Container>
      {!isLoggedIn ? (
        <form>
          <h1>Log in</h1>
          <input type="email" name="email" id="email" placeholder="Email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <input onClick={login} type="submit" value="Log in" />
          <input onClick={register} type="submit" value="Register" />
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
        </form>
      ) : (
        <div>
          <h1>Logged in</h1>
          <UserData userId={localStorage.getItem("userId")} />
        </div>
      )}
    </Container>
  );
}

const Container = styled("main", {
  display: "grid",
  placeItems: "center",
});
