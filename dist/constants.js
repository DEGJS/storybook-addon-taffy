"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _addons = require("@storybook/addons");

var addonId = 'taffy';
var _default = {
  title: 'Taffy',
  addonId: addonId,
  paramKey: addonId,
  panelId: "".concat(addonId, "/panel"),
  viewModes: ['story', 'docs'],
  type: _addons.types.TOOL,
  presets: [{
    id: 'small',
    title: 'Small',
    label: 'S',
    min: 320,
    max: 767
  }, {
    id: 'medium',
    title: 'Medium',
    label: 'M',
    min: 768,
    max: 1023
  }, {
    id: 'large',
    title: 'Large',
    label: 'L',
    min: 1024,
    max: 1920
  }],
  minWrapperWidth: 320,
  resizeHandleWidth: '14px',
  wrapperWidthChangeEvent: "".concat(addonId, "/wrapperWidthChangeEvent"),
  wrapperMaxWidthChangeEvent: "".concat(addonId, "/wrapperMaxWidthChangeEvent"),
  toolWidthChangeEvent: "".concat(addonId, "/toolWidthChangeEvent")
};
exports["default"] = _default;