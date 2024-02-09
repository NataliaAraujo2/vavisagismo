import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//firebase
import { onAuthStateChanged } from "firebase/auth";
//hooks
import { useState, useEffect } from "react";
//hooks
import { useAuthentication } from "./hooks/useAuthentication";
//context
import { AuthProvider } from "./context/AuthContext";
//pages
import Form from "./pages/Form/Form";
import Admin from "./pages/Admin/Admin";
//components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import History from "./pages/History/History";
import About from "./pages/About/About";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/form"
                element={user ? <Form /> : <Navigate to="/login" />}
              />
              <Route
                path="/history"
                element={user ? <History /> : <Navigate to="/login" />}
              />
              <Route
                path="/admin"
                element={user ? <Admin /> : <Navigate to="/login" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/"
                element={user ? <Admin /> : <Navigate to="/login" />}
              />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
