import { useNavigate } from "react-router-dom";

function Folder({ item, setInFolder }) {
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem("currentUser")).name;
  return (
    <>
      <div className="item" style={{ backgroundColor: "red" }}>
        {item.name}

        <button>info</button>
        <button>view</button>
        <button
          onClick={() => {
            setInFolder(true);
            navigate(`/${username}/${item.name}`);
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
