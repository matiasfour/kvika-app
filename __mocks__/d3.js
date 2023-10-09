/* eslint-disable react/display-name */
/* eslint-disable no-undef */
const d3 = jest.createMockFromModule('d3');

function range() {
  return {
    paddingInner: jest.fn(),
  };
}

function domain() {
  return {
    range,
  };
}

function x() {
  return {
    y: () => () => null,
  };
}

function scaleLinear() {
  return {
    domain,
  };
}

function scaleTime() {
  return {
    domain,
  };
}

function scaleBand() {
  return {
    domain,
  };
}

function line() {
  return {
    x,
  };
}

d3.scaleLinear = scaleLinear;
d3.scaleTime = scaleTime;
d3.scaleBand = scaleBand;
d3.line = line;

module.exports = d3;
