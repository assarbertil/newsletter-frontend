import { styled } from "@stitches/react";
import axios from "axios";

const onSubmit = e => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
      email,
      password,
    })
    .then(data => console.log(data));
};

export default function Home() {
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <h1>Log in</h1>
        <input type="email" name="email" id="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <input type="submit" value="Log in" />
      </form>
    </Container>
  );
}

const Container = styled("main", {
  display: "grid",
  placeItems: "center",
});
