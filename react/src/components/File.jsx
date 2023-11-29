import { useNavigate } from "react-router-dom";

function File({ item, handleDelete }) {
  const navigate = useNavigate();

  function openFile() {
    navigate(`./file/${item.name}`);
  }
  return (
    <div key={item.id} className="item" style={{ backgroundColor: "blue" }}>
      {item.name}

      <button onClick={openFile}>open</button>
      <button>info</button>
      <button
        onClick={() => handleDelete({ itemName: item.name, isFolder: false })}
      >
        🗑️
      </button>
      <button>✏️</button>
    </div>
  );
}

export default File;
