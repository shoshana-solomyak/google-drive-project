import { useState } from "react";
import { useNavigate } from "react-router-dom";

function File({
  item,
  handleDelete,
  handleCopy,
  handleMove,

  submitNewName,
}) {
  const navigate = useNavigate();
  const splitName = item.name.split(".");
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

  function openFile() {
    navigate(`./file/${splitName[0]}?type=${splitName[1]}`);
  }

  return (
    <div key={item.id} className="item" style={{ backgroundColor: "blue" }}>
      {item.name}

      <button onClick={openFile}>open</button>
      <button onClick={handleInfo}>info</button>
      {showInfo ? (
        <span>
          size: {item.size}, birthday: {item.birthday}
        </span>
      ) : null}
      <button
        onClick={() => handleDelete({ itemName: item.name, isFolder: false })}
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
      <button onClick={handleCopy}>copy</button>
      <button onClick={handleMove}>move</button>
    </div>
  );
}

export default File;
