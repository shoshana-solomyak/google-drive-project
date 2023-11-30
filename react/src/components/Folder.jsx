import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function Folder({
  item,
  setInFolder,
  handleDelete,
  submitNewName,
  copyInProgress,
  handleMoveOrCopy,
  moveInProgress,
}) {
  const navigate = useNavigate();
  const params = useParams();
  const username = params.username;
  const [view, setView] = useState([]);
  const [showView, setShowView] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [newName, setNewName] = useState("");
  const [showRename, setShowRename] = useState(false);
  function handleRename(itemName) {
    setShowRename(!showRename);

    console.log("item name:", itemName);
  }
  function handleInfo() {
    setShowInfo((info) => !info);
  }
  function handleView() {
    fetch(`http://localhost:3007/${username}/${item.name}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((res) => {
        console.log("Fetched data:", res);
        setView(res);
        setShowView(!showView);

        console.log("showView: ", showView);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
      });
  }

  return (
    <div key={item.id} className="item" style={{ backgroundColor: "red" }}>
      {item.name}
      <button
        onClick={() => {
          setInFolder(true);
          navigate(`./folder/${item.name}`);
        }}
      >
        open
      </button>
      <button onClick={handleInfo}>info</button>
      {showInfo ? (
        <span>
          size: {item.size}, birthday: {item.birthday}
        </span>
      ) : null}
      <button onClick={handleView}>view</button>
      {showView ? (
        view.length === 0 ? (
          <p>folder is emtpy</p>
        ) : (
          <ul>
            {view.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        )
      ) : null}

      <button
        onClick={() => handleDelete({ itemName: item.name, isFolder: true })}
      >
        🗑️
      </button>
      <button onClick={() => handleRename(item.name)}>✏️</button>
      {showRename && (
        <>
          <input
            onChange={(e) => setNewName(e.target.value)}
            placeholder="enter new name"
          ></input>
          <button
            onClick={() => {
              submitNewName(item.name, newName);
              console.log("newName: ", newName);
              console.log("item.name:", item.name);
            }}
          >
            change
          </button>
        </>
      )}
      {copyInProgress || moveInProgress ? (
        <button onClick={handleMoveOrCopy}>select</button>
      ) : null}
    </div>
  );
}

export default Folder;
