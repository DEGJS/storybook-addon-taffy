"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArrayItemByValue = exports.getRandomVal = exports.getPxFromEm = exports.getEmFromPx = void 0;

var getEmFromPx = function getEmFromPx(px) {
  var baseSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
  return (px / baseSize).toString();
};

exports.getEmFromPx = getEmFromPx;

var getPxFromEm = function getPxFromEm(em) {
  var baseSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
  return (em * baseSize).toString();
};

exports.getPxFromEm = getPxFromEm;

var getRandomVal = function getRandomVal(min, max) {
  var roundedMin = Math.ceil(min);
  var roundedMax = Math.floor(max);
  return Math.floor(Math.random() * (roundedMax - roundedMin + 1)) + roundedMin;
};

exports.getRandomVal = getRandomVal;

var getArrayItemByValue = function getArrayItemByValue() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var prop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';
  return arr.find(function (item) {
    return item[prop] === val;
  });
};

exports.getArrayItemByValue = getArrayItemByValue;