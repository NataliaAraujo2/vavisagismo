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
import Form from "./pages/System/Form/Form";

//components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import History from "./pages/System/History/History";
import About from "./pages/About/About";

import HomeSystem from "./pages/System/Home/HomeSystem";


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
              <Route path="/about" element={<About />} />
              <Route
                path="/register"
                element={
                  !user ? <Register /> : <Navigate to="/system/homesystem" />
                }
              />
              <Route
                path="/login"
                element={
                  !user ? <Login /> : <Navigate to="/system/homesystem" />
                }
              />
            
            
              <Route
                path="/system/homesystem"
                element={user ? <HomeSystem /> : <Navigate to="/login" />}
              />

              <Route
                path="/system/form"
                element={user ? <Form /> : <Navigate to="/login" />}
              />
              <Route
                path="/system/history/:id"
                element={user ? <History /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
