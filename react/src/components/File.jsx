function File({ item }) {
  return (
    <>
      <div className="item" style={{ backgroundColor: "blue" }}>
        {item.name}

        <button>open</button>
        <button>info</button>
        <button>🗑️</button>
        <button>✏️</button>
      </div>
    </>
  );
}

export default File;
