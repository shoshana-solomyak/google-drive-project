import { useNavigate } from "react-router-dom";

function Folder({ item, setInFolder, handleDelete }) {
  const navigate = useNavigate();
  return (
    <div key={item.id} className="item" style={{ backgroundColor: "red" }}>
      {item.name}

      <button>info</button>
      <button>view</button>
      <button
        onClick={() => {
          setInFolder(true);
          navigate(`./folder/${item.name}`);
        }}
      >
        open
      </button>
      <button
        onClick={() => handleDelete({ itemName: item.name, isFolder: true })}
      >
        🗑️
      </button>
      <button>✏️</button>
    </div>
  );
}

export default Folder;
