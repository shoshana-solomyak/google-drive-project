import { useState } from "react";
import { useNavigate } from "react-router-dom";

function File({ item, handleDelete }) {
  const navigate = useNavigate();
  const splitName = item.name.split(".");
  const [showInfo, setShowInfo] = useState(false);

  function openFile() {
    navigate(`./file/${splitName[0]}?type=${splitName[1]}`);
  }

  function handleInfo() {
    setShowInfo((info) => !info);
  }

  return (
    <div key={item.id} className="item" style={{ backgroundColor: "blue" }}>
      {item.name}

      <button onClick={openFile}>open</button>
      <button onClick={handleInfo}>info</button>
      <button
        onClick={() => handleDelete({ itemName: item.name, isFolder: false })}
      >
        🗑️
      </button>
      <button>✏️</button>
      {showInfo ? (
        <span>
          size: {item.size}, birthday: {item.birthday}
        </span>
      ) : null}
    </div>
  );
}

export default File;
