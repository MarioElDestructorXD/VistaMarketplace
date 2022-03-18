import React, { useEffect } from 'react'
import { Form, Row, Col, Button, FormLabel } from 'react-bootstrap'
import FeatherIcon from "feather-icons-react"
import "../../assets/css/main.css"
import "../../assets/css/util.css"
import "bootstrap/dist/css/bootstrap.min.css"
import img from "../../assets/img/river.jpg"
import { useFormik } from 'formik'
import * as yup from "yup"

export const ContactScreen = () => {
  const bg = {
    backgroundImage: `url(${img})`,
  }

  useEffect(() => {
    document.title = "MP | Contacto"
  }, [])

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comments: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Campo Obligatorio").min(4, "Minimo cuatro caracteres"),
      email: yup.string().email("Ingresa un correo correcto").required("Campo Obligatorio"),
      comments: yup.string().required("Campo Obligatorio").min(4, "Minimo cuatro caracteres")
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className='container-contact100'>
      <div className='wrap-contact100'>
        <Form className='contact100-form' onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-4'>
            <FormLabel className=''>
              Nombre Completo
            </FormLabel>
            <Form.Control name='name' placeholder='Mario Rodriguez' value={formik.values.name} onChange = {formik.handleChange}/>
            {formik.errors.name ? <span className='error-text'>{formik.errors.name}</span> : null}
          </Form.Group>
          <Form.Group className='mb-4'>
            <FormLabel className=''>
              Correo ELectrinico
            </FormLabel>
            <Form.Control name='email' placeholder='mario@gmail.com' value={formik.values.email} onChange = {formik.handleChange}/>
            {formik.errors.email ? <span className='error-text'>{formik.errors.email}</span> : null}
          </Form.Group>
          <Form.Group className='mb-4'>
            <FormLabel className=''>
              Comentarios
            </FormLabel>
            <Form.Control as="textarea" rows={3} name="comments" placeholder='Comentarios' value={formik.values.comments} onChange = {formik.handleChange}></Form.Control>
            {formik.errors.comments ? <span className='error-text'>{formik.errors.comments}</span> : null}
          </Form.Group>
          
          <Form.Group className='mb-4'>
            <Row>
              <Col className='text-end'>
                <Button variant='outline-success'>
                  <FeatherIcon icon="send" /> Enviar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <div className='contact100-more flex-col-c-m' style={bg}>
          <div className='flex-w size1 p-b-47'>
            <div className='txt1 p-r-25'>
              <span className='1nr 1nr-map-marker'></span>
            </div>
            <div className='flex-col size2'>
              <span className='txt1 p-b-20'>Dirección</span>
              <span className='txt2'> {" "} Av. Universidad Tecnológica 1, Palo Escrito, 62765 Emiliano Zapata, Mor. México</span>
            </div>
          </div>
          <div className='flex-w size1 p-b-47'>
            <div className='txt1 p-r-25'>
              <span className='1nr 1nr-phone-handset'></span>
            </div>
            <div className='flex-col size2'>
              <span className='txt1 p-b-20'>Telefono</span>
              <span className='txt2'> {" "} +52 777 3681165</span>
            </div>
          </div>
          <div className='flex-w size1 p-b-47'>
            <div className='txt1 p-r-25'>
              <span className='1nr 1nr-envelope'></span>
            </div>
            <div className='flex-col size2'>
              <span className='txt1 p-b-20'>Correo ELectrinico</span>
              <span className='txt2'> {" "} utez@utez.edu.mx</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
