import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Container, Nav, Navbar } from "react-bootstrap";
import { CategoryScreen } from "../category/CategoryScreen";
import { SubcategoryScreen } from "../subcategory/SubcategoryScreen";
import { AuthContext } from "../auth/authContext";
import { LoginScreen } from "../auth/LoginScreen";
import HomeScreen from "../home/HomeScreen";
import { PublicNavBar } from "../../shared/components/PublicNavBar";
import { ContactScreen } from "../contact/ContactScreen";
import { PrivateNavBar } from "../../shared/components/PrivateNavBar";
import { ProductScreen } from "../product/ProductScreen";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginScreen />} />
        <Route
          path="*"
          element={
            !user.logged ? (
              <>
                {/*NavBar publico */}
                <PublicNavBar />
                <Container>
                  <Routes>
                    <Route path={"/home"} element={<HomeScreen />} />
                    <Route path="/contacto" element={<ContactScreen />} />
                    <Route path={"/"} element={<HomeScreen />} />
                    <Route path="*" element={<div>ERROR 404</div>} />
                  </Routes>

                </Container>
              </>
            ) : (
              <>
              <PrivateNavBar />
                <Container>
                  <Routes>
                    <Route path={"/category"} element={<CategoryScreen />} />
                    <Route path="/subcategory" element={<SubcategoryScreen />} />
                  </Routes>
                  <Route path={"/"} element={<ProductScreen/>} />
                  <Route path={"*"} element={<div>ERROR 404</div>} />
                </Container>
              </>
            )
          }
        />
      </Routes>
    </Router>
  );
};
