import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  localStorage.removeItem("currentUser");

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
      .then((res) => {
        if (!res.ok) {
          setErrorMessage("incorrect username or password");
          throw new Error("incorrect username or password");
        } else {
          console.log("yay");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("currentUser", JSON.stringify(data));
        navigate(`/${data.name}`);
      })
      .catch((error) => {
        console.log("Error fetching users:", error);
      });
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
