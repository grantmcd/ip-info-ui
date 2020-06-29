import React from "react";
import GeoIp from "./GeoIp";
import renderer from "react-test-renderer";

test("GeoIp", () => {
  const component = renderer.create(<GeoIp ipAddress="75.34.225.8" />);
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
