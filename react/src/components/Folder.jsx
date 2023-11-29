function Folder({ item, handleDelete }) {
  return (
    <div key={item.id} className="item" style={{ backgroundColor: "red" }}>
      {item.name}

      <button>view</button>
      <button>open</button>
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
