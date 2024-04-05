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
import Admin from "./pages/Admin/Admin";
//components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import History from "./pages/System/History/History";
import About from "./pages/About/About";
import AuthUsers from "./pages/Admin/AuthUsers";
import EditAuth from "./pages/Admin/EditAuth";
import HomeSystem from "./pages/System/Home/HomeSystem";
import Users from "./pages/Admin/Users";
import UserData from "./pages/Admin/UserData";
import ResumeData from "./components/Data/ResumeData";

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
          <Navbar key={user} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/login"
                element={
                  !user ? <Login /> : <Navigate to="/system/homesystem" />
                }
              />
              <Route
                path="/admin"
                element={user ? <Admin /> : <Navigate to="/login" />}
              />

              <Route
                path="/admin/authusers"
                element={user ? <AuthUsers /> : <Navigate to="/login" />}
              />
              <Route
                path="/admin/editAuth/:id"
                element={user ? <EditAuth /> : <Navigate to="/login" />}
              />
              <Route
                path="/admin/userData/:id"
                element={user ? <UserData /> : <Navigate to="/login" />}
              />

              <Route
                path="/admin/users"
                element={user ? <Users /> : <Navigate to="/login" />}
              />

              <Route
                path="/system/homesystem"
                element={user ? <HomeSystem /> : <Navigate to="/login" />}
              />

              <Route
                path="/system/form/:id"
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
