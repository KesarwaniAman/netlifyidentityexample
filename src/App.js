import axios from "axios";
import GoTrue from "gotrue-js";
import { useState } from "react";

// Instantiate the GoTrue auth client with an optional configuration

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = new GoTrue({
    APIUrl: "https://netlifyidentityexample.netlify.app/.netlify/identity",
    audience: "",
    setCookie: false,
  });
  // const handleClick = async () => {
  //   return await axios
  //     .post("http://localhost:3003/check")
  //     .then((res) => console.log(`res`, res));
  // };

  const callApi = async () => {
    try {
      const headers = {};
      const user = localStorage.getItem("gotrue.user");
      if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser.token.access_token;
        headers["Authorization"] = `Bearer ${token}`;
      }
      const resp = await axios.get("/.netlify/functions/test-user", {
        headers,
      });
      console.log(`resp`, resp);
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const signupSubmit = (e) => {
    e.preventDefault();
    auth
      .signup(email, password)
      .then((response) => console.log("Confirmation email sent", response))
      .catch((error) => console.log("It's an error", error));
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    auth
      .login(email, password, true)
      .then((response) => {
        console.log(`response`, response);
      })
      .catch((error) => console.log(`error`, error));
  };

  return (
    <div className="App">
      {/* <div data-netlify-identity-button /> */}

      <form onSubmit={signupSubmit}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>

      <form onSubmit={loginSubmit}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <div>{/* <button onClick={callApi}>Call API</button> */}</div>
    </div>
  );
}

export default App;
