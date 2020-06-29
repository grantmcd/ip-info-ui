import React, { useState, useEffect } from "react";
import ReactGlobe from "react-globe";
import PropTypes from "prop-types";
import { Card, ListGroup, Alert } from "react-bootstrap";

const GeoIp = (props) => {
  const [hasError, setErrors] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [geoData, setGeoData] = useState(null);
  useEffect(() => {
    async function fetchData(ipAddress) {
      const geoIpRes = await fetch(
        "https://hu8qooiisa.execute-api.us-east-2.amazonaws.com/dev/geo-ip/" +
          props.ipAddress
      );

      geoIpRes
        .json()
        .then((res) => {
          setGeoData(res);
          setMarkers([
            {
              id: 1,
              city: res.city.names.en,
              color: "red",
              coordinates: [res.location.latitude, res.location.longitude],
              value: 50,
            },
          ]);
        })
        .catch((err) => setErrors(err));
    }

    if (props.ipAddress) {
      fetchData(props.ipAddress);
    }
  }, [props.ipAddress]);

  return (
    <Card className="mb-3">
      <Card.Header>GeoIP</Card.Header>
      <Card.Body>
        {hasError && (
          <Alert variant="warning">Something went wrong: {hasError}</Alert>
        )}

        <ReactGlobe
          markers={markers}
          markerOptions={{
            activeScale: 1.1,
            enableTooltip: true,
            enterAnimationDuration: 3000,
            enterEasingFunction: ["Bounce", "InOut"],
            exitAnimationDuration: 3000,
            exitEasingFunction: ["Cubic", "Out"],
            radiusScaleRange: [0.01, 0.05],
          }}
        />
      </Card.Body>

      {geoData && (
        <ListGroup variant="flush">
          <ListGroup.Item>Country: {geoData.country.names.en}</ListGroup.Item>
          <ListGroup.Item>City: {geoData.city.names.en}</ListGroup.Item>
          <ListGroup.Item>Latitude: {geoData.location.latitude}</ListGroup.Item>
          <ListGroup.Item>
            Longitude: {geoData.location.longitude}
          </ListGroup.Item>
        </ListGroup>
      )}
    </Card>
  );
};

GeoIp.propTypes = {
  // ipAddress: PropTypes.string.isRequired,
  ipAddress: PropTypes.string.isRequired,
};

export default GeoIp;
