import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Folder from "./Folder";
import File from "./File";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

function HomePage() {
  const params = useParams();
  const navigate = useNavigate();
  const username = params.username;
  const foldername = params.foldername;
  const [items, setItems] = useState([]);
  const [inFolder, setInFolder] = useState(foldername);
  const [error, setError] = useState(null);
  const [copyInProgress, setCopyInProgress] = useState(null);
  const [moveInProgress, setMoveInProgress] = useState(null);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  let deleteUrl;

  useEffect(() => {
    //check if correct user is logged in
    if (!user) {
      navigate("/");
    } else if (user.name !== params.username) {
      setError("users do not match");
    }

    let fetchUrl;
    if (inFolder) {
      fetchUrl = `http://localhost:3007/${username}/${foldername}`;
    } else {
      fetchUrl = `http://localhost:3007/${username}`;
    }

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) {
          setError("failed to fetch files");
        }
        return res.json();
      })
      .then((res) => {
        setItems(res);
      })
      .catch(() => setError("failed to fetch files"));
  }, [username, inFolder, foldername]);

  function handleSetCopy(file) {
    setCopyInProgress(file);
    setMoveInProgress(null);
  }

  function handleSetMove(file) {
    setMoveInProgress(file);
    setCopyInProgress(null);
  }

  function handleCopy(folder) {
    try {
      fetch(
        `http://localhost:3007/${username}/copy/${copyInProgress.name}/${folder.name}?action=copy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            if (res.status === 400) {
              alert("file already exists");
            } else {
              alert("failed to copy file");
              throw new Error(
                `could not copy ${copyInProgress.name} into ${folder.name}`
              );
            }
            return;
          } else {
            return res.text();
          }
        })
        .then((res) => {
          if (res) alert("copied succesfully");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    } finally {
      setCopyInProgress(null);
    }
  }

  function handleMove(folder) {
    try {
      fetch(
        `http://localhost:3007/${username}/move/${moveInProgress.name}/${folder.name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            if (res.status === 400) {
              alert("file already exists");
            } else {
              alert("failed to move file");
              throw new Error(
                `could not move ${moveInProgress.name} into ${folder.name}`
              );
            }
            return;
          } else {
            return res.text();
          }
        })
        .then((res) => {
          if (res) {
            setItems((prev) =>
              prev.filter((item) => item.name !== moveInProgress.name)
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    } finally {
      setMoveInProgress(null);
    }
  }

  let renameUrl;
  function submitNewName(itemToChange, newName) {
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
          alert("failed to rename");
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

  // function handleDelete(currItem) {
  //   if (inFolder) {
  //     deleteUrl = `http://localhost:3007/${username}/${foldername}/${currItem.itemName}?isFolder=${currItem.isFolder}`;
  //   } else {
  //     deleteUrl = `http://localhost:3007/${username}/${currItem.itemName}?isFolder=${currItem.isFolder}`;
  //   }
  //   const requestOptions = {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   fetch(deleteUrl, requestOptions)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //     })
  //     .then(() => {
  //       setItems((prevItems) =>
  //         prevItems.filter((item) => item.name !== currItem.itemName)
  //       );
  //       console.log("deleted");
  //     })
  //     else {
  //       return response.json().then((data) => {
  //         alert(data.message);
  //       });
  //     }
  //     .catch((error) => {
  //       console.log("error: ", error);
  //       alert("Error deleting item:" + error.message);
  //     });
  // }

  function handleDelete(currItem) {
    let deleteUrl;

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
          return response.json().then((data) => {
            throw new Error(data.message);
          });
        }
      })
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => item.name !== currItem.itemName)
        );
      })
      .catch((error) => {
        console.error("Error deleting item:", error);

        alert("Error deleting item: " + error.message);
      });
  }

  function handleBack() {
    setInFolder(false);
    navigate(`/${username}`);
  }

  function handleLogout() {
    localStorage.removeItem("currentUser");
    navigate("/");
  }

  return (
    <>
      {error ? (
        <ErrorPage message={error} />
      ) : (
        <div>
          {inFolder ? (
            <h3>
              {username} &#8594; {foldername}
            </h3>
          ) : (
            <h3>{username}</h3>
          )}
          {inFolder ? <button onClick={handleBack}>up</button> : null}
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
                    copyInProgress={copyInProgress}
                    moveInProgress={moveInProgress}
                    handleCopy={() => handleCopy(item)}
                    handleMove={() => handleMove(item)}
                    submitNewName={submitNewName}
                  />
                ) : (
                  <File
                    key={item.name}
                    item={item}
                    handleDelete={handleDelete}
                    inFolder={inFolder}
                    handleCopy={() => handleSetCopy(item)}
                    handleMove={() => handleSetMove(item)}
                    submitNewName={submitNewName}
                  />
                );
              })}
            </div>
          )}
          <button onClick={handleLogout}> Logout</button>
        </div>
      )}
    </>
  );
}
export default HomePage;
