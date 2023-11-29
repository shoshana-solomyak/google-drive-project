import { Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";

function App() {
  <BrowserRouter>
    <Route path="/">
      <Route index element={<Login />} />
      {/* <Route path="/:username" element={} />  page element */}
    </Route>
  </BrowserRouter>;
}

export default App;
