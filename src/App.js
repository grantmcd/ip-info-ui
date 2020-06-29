import React, { useState } from "react";
import { Formik } from "formik";
import GeoIp from "./GeoIp";
import WhoisIp from "./WhoisIp";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Alert,
} from "react-bootstrap";
import * as Yup from "yup";

const App = () => {
  const initialIpAddress = "75.34.225.8";

  const [ipAddress, setIpAddress] = useState(initialIpAddress);
  const FormSchema = Yup.object().shape({
    ipAddress: Yup.string()
      .matches(
        /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/
      )
      .required("Required"),
  });

  const onSubmit = async (values) => {
    // alert(JSON.stringify(values.A));
    setIpAddress(values.ipAddress);
  };

  return (
    <div>
      <Navbar bg="dark" expand="lg" className="mb-3">
        <Navbar.Brand href="#home">IP Info</Navbar.Brand>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md="4">
            <Formik
              initialValues={{ ipAddress: "" }}
              onSubmit={onSubmit}
              validationSchema={FormSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form className="mb-3 mx-auto" onSubmit={handleSubmit}>
                  <Form.Group controlId="formIp">
                    <Form.Label>IP Address:</Form.Label>
                    <Form.Control
                      type="text"
                      name="ipAddress"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ipAddress}
                      placeholder={initialIpAddress}
                    />
                  </Form.Group>
                  {errors.ipAddress && touched.ipAddress ? (
                    <Alert variant="warning">
                      IP Address must be a valid IPv4 or IPv6 Address
                    </Alert>
                  ) : null}

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
          <Col md="8">
            <GeoIp ipAddress={ipAddress} />
            <WhoisIp ipAddress={ipAddress} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
