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
  let deleteUrl;
  let renameUrl;
  function submitNewName(itemToChange, newName) {
    console.log("newName: ", newName);
    if (inFolder) {
      renameUrl = `http://localhost:3007/${username}/${foldername}/${itemToChange}`;
    } else {
      renameUrl = `http://localhost:3007/${username}/${itemToChange}`;
    }

    fetch(renameUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update name");
        }
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.name === itemToChange ? { ...item, name: newName } : item
          )
        );
      })
      .catch((error) => {
        console.error("Error updating name:", error);
      });
  }

  function handleDelete(currItem) {
    if (inFolder) {
      deleteUrl = `http://localhost:3007/${username}/${foldername}/${currItem.itemName}?isFolder=${currItem.isFolder}`;
    } else {
      deleteUrl = `http://localhost:3007/${username}/${currItem.itemName}?isFolder=${currItem.isFolder}`;
    }
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(deleteUrl, requestOptions)
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
        <div id="flexContainer">
          {items.map((item) => {
            return item.isDir ? (
              <Folder
                key={item.name}
                item={item}
                setInFolder={setInFolder}
                handleDelete={handleDelete}
                submitNewName={submitNewName}
              />
            ) : (
              <File
                key={item.name}
                item={item}
                handleDelete={handleDelete}
                inFolder={inFolder}
                submitNewName={submitNewName}
              />
            );
          })}
        </div>
      )}
      {inFolder ? <button onClick={handleBack}>back</button> : null}
    </div>
  );
}
export default HomePage;
