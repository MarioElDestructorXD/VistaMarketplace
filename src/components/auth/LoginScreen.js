import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import axios from "../../shared/plugins/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Row, Col, Container, Form, Figure } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import img from "../../assets/img/marketplace.png";
import Alert from "../../shared/plugins/alert";

export const LoginScreen = () => {
  const navigation = useNavigate();
  const { dispath } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required("Campo Obligatorio")
        .min(4, "Minimo cuatro caracteres"),
    }),
    onSubmit: (values) => {
      axios({
        url: "/auth/login",
        method: "POST",
        data: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.error) {
            const action = {
              type: "LOGIN",
              payload: response.data,
            };
            dispath(action);
            navigation("/products", { replace: true });
          }
        })
        .catch((error) => {
          Alert.fire({
            title: "Verifique los datos",
            text: "Usuario y/o contraseña incorrectos",
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3005d6",
          });
        });
    },
  });

  const hundleCancel = () => {
    navigation("/");
  };

  useEffect(() => {
    document.title = "MP | Login";
  }, []);

  return (
    <>
      <section
        className="h-100 grandient-form"
        style={{ backgroundColor: "eee" }}
      />
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col className="col-xl-10">
            <div className="card rounded-3 text-black">
              <Row className="g-0">
                <Col className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <Figure>
                        <Figure.Image
                          width={125}
                          height={110}
                          alt="Markeplace"
                          src="img"
                        />
                      </Figure>
                      <h4 className="mt-1 mb-5 pb-1">Markeplace</h4>
                    </div>
                    <Form onSubmit={formik.handleSubmit}>
                      <Form.Group>
                        <Form.Label htmlFor="user">Usuario</Form.Label>
                        <Form.Control
                          placeholder="Usuario"
                          id="user"
                          autoComplete="off"
                          name="username"
                          value={formik.values.username}
                          onChange={formik.hundleChange}
                        />
                        {formik.errors.username ? (
                          <span>{formik.errors.username}</span>
                        ) : null}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="password">Contraseña</Form.Label>
                        <Form.Control
                          placeholder="*************"
                          id="password"
                          autoComplete="off"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.hundleChange}
                        />
                        {formik.errors.password ? (
                          <span>{formik.errors.password}</span>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="form-outline mb-5">
                        <div className="text-end pt-1 pb-1">
                          <a href="#" className="text-muted">
                            ¿Olvidaste tu Contraseña?
                          </a>
                        </div>
                      </Form.Group>
                      <Form.Group>
                        <div className="text-center pt-1 pb-1">
                          <Button
                            variant="secondary"
                            className="btn-hover gradient-custom-2"
                            type="submit"
                            disabled={!(formik.isValid && formik.dirty)}
                          >
                            <FeatherIcon icon="log-in" />
                            Iniciar Sesión
                          </Button>
                        </div>
                      </Form.Group>
                    </Form>
                  </div>
                </Col>
                <Col className="col-lg-6">
                  <div>
                    <h4></h4>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
