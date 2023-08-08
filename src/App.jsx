import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Index";
import Home from "./components/Home";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
