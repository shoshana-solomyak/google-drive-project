import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

function FilePage() {
  const params = useParams();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(document.location.search);
  const [content, setContent] = useState("...");
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    //check if correct user is logged in
    if (!user) {
      navigate("/");
    } else if (user.name !== params.username) {
      setError("users do not match");
    }

    const fileName = `${params.filename}.${searchParams.get("type")}`;
    const href = window.location.href;
    let url;
    if (href.includes("/folder/")) {
      const foldername = href.split("/")[5];
      url = `http://localhost:3007/${params.username}/${foldername}/content/${fileName}`;
    } else {
      url = `http://localhost:3007/${params.username}/content/${fileName}`;
    }
    try {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            setError("failed to open file");
            return;
          }
          return res.text();
        })
        .then((res) => {
          if (res) setContent(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      {error ? (
        <ErrorPage message={error} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </>
  );
}

export default FilePage;
