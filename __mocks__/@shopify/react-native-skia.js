/* eslint-disable react/function-component-definition */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */

const MockSKPath = {
  moveTo: () => MockSKPath,
  lineTo: () => MockSKPath,
};

function Make() {
  return {
    moveTo: MockSKPath.moveTo,
    lineTo: MockSKPath.lineTo,
    getPoint: () => {
      return { y: 0 };
    },
  };
}

function MakeFromSVGString() {
  return null;
}

const Skia = {
  Path: { Make, MakeFromSVGString },
};

module.exports = { Skia };
