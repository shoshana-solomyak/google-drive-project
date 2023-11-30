import { useNavigate } from "react-router-dom";

function ErrorPage({ message }) {
  const navigate = useNavigate();
  return (
    <>
      <h1>Error</h1>
      <h2>{message}</h2>
      <button
        onClick={() => {
          localStorage.removeItem("currentUser");
          navigate("/");
        }}
      >
        Login
      </button>
    </>
  );
}

export default ErrorPage;
