import { useEffect } from "react";
let user;
function HomePage() {
  useEffect(() => {
    fetch("http://localhost:3000/hi")
      .then((res) => res.json())
      .then((res) => (user = res));
  });

  console.log("user : ", user);
  return <div>{user}</div>;
}
export default HomePage;
