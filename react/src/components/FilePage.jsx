import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

function FilePage() {
  const params = useParams();
  const [content, setContent] = useState("...");
  const searchParams = new URLSearchParams(document.location.search);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [error, setError] = useState(null);

  useEffect(() => {
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
          return res.text();
        })
        .then((res) => {
          setContent(res);
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
      ;
    </>
  );
}

export default FilePage;
