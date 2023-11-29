import { useEffect, useState } from "react";
function HomePage() {
  const [hi, setHi] = useState("");
  let user;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/hi");
        const data = await response.json();
        setHi(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log("user : ", user);
  return <div>{hi}</div>;
}
export default HomePage;
