import { useEffect } from "react";
function HomePage() {
  let user;
  useEffect(() => {
    func();
  }, []);

  const func = async () => {
    fetch("http://localhost:3000/hi")
      .then((res) => res.json())
      .then((res) => {
        user = res;
        console.log("res:", res);
      });
  };

  console.log("user : ", user);
  return <div>{user}</div>;
}
export default HomePage;
