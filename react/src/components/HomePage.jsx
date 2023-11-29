import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Folder from "./Folder";
import File from "./File";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const params = useParams();
  const navigate = useNavigate();
  const username = params.username;
  const foldername = params.foldername;
  const [items, setItems] = useState([]);
  const [inFolder, setInFolder] = useState(foldername);

  function handleDelete(currItem) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:3007/${user}/${currItem.itemName}?isFolder=${currItem.isFolder}`,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to delete item");
        }
      })
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => item.name !== currItem.itemName)
        );
        console.log("deleted");
      })

      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  }

  useEffect(() => {
    let fetchUrl;
    if (inFolder) {
      fetchUrl = `http://localhost:3007/${username}/${foldername}`;
    } else {
      fetchUrl = `http://localhost:3007/${username}`;
    }
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((res) => {
        console.log("res:", res);
        setItems(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username, inFolder, foldername]);

  function handleBack() {
    setInFolder(false);
    navigate(`/${username}`);
  }

  return (
    <div>
      {inFolder ? (
        <h3>
          {username} &#8594; {foldername}
        </h3>
      ) : (
        <h3>{username}</h3>
      )}
      {items.length === 0 ? (
        <h3>This folder is empty</h3>
      ) : (
        items.map((item) => {
          return item.isDir ? (
            <Folder key={item.name} item={item} setInFolder={setInFolder} />
          ) : (
            <File key={item.name} item={item} />
          );
        })
      )}
      {inFolder ? <button onClick={handleBack}>back</button> : null}
    </div>
  );
}
export default HomePage;
