import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function FilePage() {
  const params = useParams();
  const [content, setContent] = useState("...");
  const searchParams = new URLSearchParams(document.location.search);

  useEffect(() => {
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
  // return <>{content}</>;
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export default FilePage;
