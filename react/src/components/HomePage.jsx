import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Folder from "./Folder";
import File from "./File";
function HomePage() {
  const params = useParams();
  const user = params.username;
  const [items, setItems] = useState([]);

  function handleDelete(currItem) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:3007/${user}/${currItem.itemName}?isFolder=${currItem.isFolder}`,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to delete item");
        }
      })
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => item.name !== currItem.itemName)
        );
        console.log("deleted");
      })

      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  }

  useEffect(() => {
    fetch(`http://localhost:3007/${user}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("res:", res);
        setItems((prev) => [...prev, ...res]);
        console.log("items after setting:", items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  return (
    <div>
      {items.map((item) => {
        return item.isDir ? (
          <Folder key={item.id} item={item} handleDelete={handleDelete} />
        ) : (
          <File key={item.id} item={item} handleDelete={handleDelete} />
        );
      })}
    </div>
  );
}
export default HomePage;
