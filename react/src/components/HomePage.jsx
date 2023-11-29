import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Folder from "./Folder";
import File from "./File";
function HomePage() {
  const params = useParams();
  const user = params.username;
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/${user}`)
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
          <Folder key={item.name} item={item} />
        ) : (
          <File key={item.name} item={item} />
        );
      })}
    </div>
  );
}
export default HomePage;
