import { useNavigate } from "react-router-dom";

function File({ item }) {
  const navigate = useNavigate();

  function openFile() {
    navigate(`./file/${item.name}`);
  }
  return (
    <>
      <div className="item" style={{ backgroundColor: "blue" }}>
        {item.name}

        <button onClick={openFile}>open</button>
        <button>info</button>
        <button>🗑️</button>
        <button>✏️</button>
      </div>
    </>
  );
}

export default File;
