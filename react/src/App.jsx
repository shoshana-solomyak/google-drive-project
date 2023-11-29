import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

function App() {
  <BrowserRouter>
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="/:username" element={<HomePage />} />
    </Route>
  </BrowserRouter>;
}

export default App;
