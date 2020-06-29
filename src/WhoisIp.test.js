import React from "react";
import WhoisIp from "./WhoisIp";
import renderer from "react-test-renderer";

test("GeoIp when Ip Address is set", () => {
  const component = renderer.create(<WhoisIp ipAddress="75.34.225.8" />);
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
