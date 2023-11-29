// import {Link} from "react-router-dom";
// function Login() {
//   function handleLogin(){

//   }
//   return (
//     <>
//       <input type="text" placeholder="name..." />
//       <input type="password" placeholder="password..." />
//       <button onClick={handleLogin}>login</button>
//     </>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  let userId;
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!inputs.username || !inputs.password) {
      setErrorMessage("please fill username and password");
      return;
    }
    fetch(`http://localhost:3007/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs }),
    })
      // .then(() => console.log("inputs: ", inputs))
      .then((res) => {
        if (!res.ok) {
          throw new Error("incorrect username or password");
          // navigate(`/${res.user}`);
        } else {
          console.log("yay");
        }
        console.log("res: ", res);

        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log("Error fetching users:", error));
  }
  return (
    <>
      <h1>LogIn</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Login</button>
      </form>
      <p>{errorMessage}</p>
    </>
  );
}
export default Login;
