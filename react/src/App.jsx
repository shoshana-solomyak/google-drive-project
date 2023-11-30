import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import FilePage from "./components/FilePage";
import Error from "./components/Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path=":username" element={<HomePage />} />
            <Route path=":username/folder/:foldername" element={<HomePage />} />
            <Route path=":username/file/:filename" element={<FilePage />} />
            <Route
              path=":username/folder/:foldername/file/:filename"
              element={<FilePage />}
            />
          </Route>
          <Route path="*" element={<Error message={"404 page not found"} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
