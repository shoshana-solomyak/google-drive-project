import { useNavigate } from "react-router-dom";

function Folder({ item, setInFolder }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="item" style={{ backgroundColor: "red" }}>
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
        <button>🗑️</button>
        <button>✏️</button>
      </div>
    </>
  );
}

export default Folder;
