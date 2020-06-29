import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, ListGroup, Alert, Accordion, Button } from "react-bootstrap";

const WhoisIp = (props) => {
  const [hasError, setErrors] = useState(false);
  const [whoisData, setWhoisData] = useState(null);

  useEffect(() => {
    async function fetchData(ipAddress) {
      const geoIpRes = await fetch(
        "https://hu8qooiisa.execute-api.us-east-2.amazonaws.com/dev/whois-ip/" +
          props.ipAddress
      );

      geoIpRes
        .json()
        .then((res) => {
          setWhoisData(res);
        })
        .catch((err) => setErrors(err));
    }

    if (props.ipAddress) {
      fetchData(props.ipAddress);
    }
  }, [props.ipAddress]);

  return (
    <Card className="mb-3">
      <Card.Header>Whois</Card.Header>
      {hasError && (
        <Card.Body>
          <Alert variant="warning">Something went wrong: {hasError}</Alert>
        </Card.Body>
      )}

      {whoisData && (
        <ListGroup variant="flush">
          <ListGroup.Item>
            Organization: {whoisData.Organization}
          </ListGroup.Item>
          <ListGroup.Item>
            Registration Date: {whoisData.RegDate}
          </ListGroup.Item>

          {/* <ListGroup.Item>City: {geoData.city.names.en}</ListGroup.Item>
          <ListGroup.Item>Latitude: {geoData.location.latitude}</ListGroup.Item>
          <ListGroup.Item>
            Longitude: {geoData.location.longitude}
          </ListGroup.Item> */}
        </ListGroup>
      )}
    </Card>
  );
};

WhoisIp.propTypes = {
  ipAddress: PropTypes.string.isRequired,
};

export default WhoisIp;
