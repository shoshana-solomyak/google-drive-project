function File({ item }) {
  return (
    <>
      {" "}
      <div className="item" style={{ backgroundColor: "blue" }}>
        {item.name}

        <button>🗑️</button>
        <button>✏️</button>
      </div>
    </>
  );
}

export default File;
