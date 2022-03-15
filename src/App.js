import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { CategoryScreen } from "./components/category/CategoryScreen";
import { SubcategoryScreen } from "./components/subcategory/SubcategoryScreen";
import { useReducer } from "react/cjs/react.production.min";
import { AuthContext } from "./components/auth/authContext";
import { AppRouter } from "./components/routers/AppRouter";

const init = () => {
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};

const App = () => {
  const [state, dispath] = useReducer(authReducer, {}, init);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value = {{ dispath, user}}>
      <AppRouter/>
    </AuthContext.Provider>
  );
};

export default App;
