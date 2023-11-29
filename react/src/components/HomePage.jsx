import { useEffect } from "react";
import { useParams } from "react-router-dom";
function HomePage() {
  const params = useParams();
  const user = params.username;

  useEffect(() => {
    fetch(`http://localhost:3000/${user}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("res:", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return <div>{user}</div>;
}
export default HomePage;
