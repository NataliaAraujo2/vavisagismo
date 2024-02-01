import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Form from "./pages/Form/Form";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Form />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
