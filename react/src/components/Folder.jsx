// import { useNavigate, useParams } from "react-router-dom";
// import { useState } from "react";
// function Folder({ item, setInFolder, handleDelete }) {
//   const navigate = useNavigate();
//   const params = useParams();
//   const username = params.username;
//   const [view, setView] = useState("");
//   // function handleView() {
//   //   fetch(`http://localhost:3007/${username}/${item.name}`)
//   //     .then((res) => res.json())
//   //     .then((res) => {
//   //       console.log("item.name: ", item.name);
//   //       console.log("res:", res);
//   //       setView(res);
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // }

//   let folderContent;
//   function handleView() {
//     console.log("viewing");
//     fetch(`http://localhost:3007/${username}/${item.name}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((res) => {
//         console.log("item.name: ", item.name);
//         console.log("Fetched data:", res); // Log fetched data to check its format
//         setView(res);
//       })
//       .then(() => {
//         folderContent = view.map((item, index) => (
//           <li key={index}>{item.name}</li>
//         ));
//       })
//       .catch((err) => {
//         console.log("Fetch error:", err);
//       });
//   }
//   console.log(view);
//   return (
//     <div key={item.id} className="item" style={{ backgroundColor: "red" }}>
//       {item.name}

//       <button>info</button>
//       <button onClick={handleView}>view</button>
//       <ul>{folderContent}</ul>
//       <button
//         onClick={() => {
//           setInFolder(true);
//           navigate(`./folder/${item.name}`);
//         }}
//       >
//         open
//       </button>
//       <button
//         onClick={() => handleDelete({ itemName: item.name, isFolder: true })}
//       >
//         🗑️
//       </button>
//       <button>✏️</button>
//     </div>
//   );
// }

// export default Folder;
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function Folder({ item, setInFolder, handleDelete }) {
  const navigate = useNavigate();
  const params = useParams();
  const username = params.username;
  const [view, setView] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  function handleInfo() {
    setShowInfo((info) => !info);
  }

  function handleView() {
    fetch(`http://localhost:3007/${username}/${item.name}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((res) => {
        console.log("Fetched data:", res); // Log fetched data to check its format
        setView(res);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
      });
  }

  return (
    <div key={item.id} className="item" style={{ backgroundColor: "red" }}>
      {item.name}

      <button onClick={handleInfo}>info</button>
      <button onClick={handleView}>view</button>
      <ul>
        {view.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          setInFolder(true);
          navigate(`./folder/${item.name}`);
        }}
      >
        open
      </button>
      <button
        onClick={() => handleDelete({ itemName: item.name, isFolder: true })}
      >
        🗑️
      </button>
      <button>✏️</button>
      {showInfo ? (
        <span>
          size: {item.size}, birthday: {item.birthday}
        </span>
      ) : null}
    </div>
  );
}

export default Folder;
