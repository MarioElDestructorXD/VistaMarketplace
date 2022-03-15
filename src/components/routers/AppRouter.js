import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Route, Router, Routes } from "react-router-dom";
import { AuthContext } from "../auth/authContext";
import { LoginScreen } from "../auth/LoginScreen";
import { CategoryScreen } from "../category/CategoryScreen";
import { ContactScreen } from "../contact/ContactScreen";
import { HomeScreen } from "../home/HomeScreen";

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
              {/** NavBar Publico */}
                <Navbar bg="dark" variant="dark">
                  <Container fluid>
                    <Navbar.Brand href="#">
                      <FeatherIcon icon="home" />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                      <Link to={"/"} className="nav-link">
                        Productos
                      </Link>
                      <Link to={"/contact"} className="nav-link">
                        Contactos
                      </Link>
                    </Nav>
                  </Container>
                </Navbar>
                <Container>
                <Route path={"/home"} element={<HomeScreen/>} />
                  <Route path="/contact" element={<ContactScreen/>} />
                  <Route path={"/"} element={<HomeScreen/>} />
                  <Route path="*" element = {<div>ERROR 404</div>}/>
                </Container>
              </>
            ) : (
              <>
                <Navbar bg="dark" variant="dark">
                  <Container fluid>
                    <Navbar.Brand href="#">
                      <FeatherIcon icon="home" />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                      <Link to={"/"} className="nav-link">
                        Categorías
                      </Link>
                      <Link to={"/subcategory"} className="nav-link">
                        Subcategorías
                      </Link>
                    </Nav>
                  </Container>
                </Navbar>
                <Container>
                  <Route path={"/"} element={<CategoryScreen />} />
                  <Route path="/subcategory" element={<SubcategoryScreen />} />
                </Container>
              </>
            )
          }
        />
      </Routes>
    </Router>
  );
};
