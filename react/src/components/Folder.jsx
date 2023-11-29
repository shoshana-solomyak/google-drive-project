function Folder({ item }) {
  return (
    <>
      <div className="item" style={{ backgroundColor: "red" }}>
        {item.name}

        <button>view</button>
        <button>open</button>
        <button>🗑️</button>
        <button>✏️</button>
      </div>
    </>
  );
}

export default Folder;
