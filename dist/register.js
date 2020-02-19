"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

var _addons = require("@storybook/addons");

var _api = require("@storybook/api");

var _components = require("@storybook/components");

var _utils = require("./utils");

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var addonId = _constants["default"].addonId,
    panelId = _constants["default"].panelId,
    viewModes = _constants["default"].viewModes,
    presets = _constants["default"].presets,
    wrapperWidthChangeEvent = _constants["default"].wrapperWidthChangeEvent,
    wrapperMaxWidthChangeEvent = _constants["default"].wrapperMaxWidthChangeEvent,
    toolWidthChangeEvent = _constants["default"].toolWidthChangeEvent;

var TaffyTool = function TaffyTool() {
  var _useChannel;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      toolPxWidth = _useState2[0],
      setToolPxWidth = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      maxWidth = _useState4[0],
      setmaxWidth = _useState4[1];

  var _useState5 = (0, _react.useState)(presets),
      _useState6 = _slicedToArray(_useState5, 2),
      presetWidths = _useState6[0],
      setPresetWidths = _useState6[1];

  var handleWrapperWidthChange = function handleWrapperWidthChange(width) {
    setToolPxWidthAsString(width);
  };

  var handleMaxWidthChange = function handleMaxWidthChange(width) {
    var largePreset = (0, _utils.getArrayItemByValue)(presetWidths, 'large');

    if (largePreset) {
      var modifiedLargePreset = _objectSpread({}, largePreset, {
        max: width
      });

      var newPresetWidths = presetWidths.map(function (obj) {
        return modifiedLargePreset.id === obj.id ? modifiedLargePreset : obj;
      });
      setPresetWidths(newPresetWidths);
      setmaxWidth(width);
    }
  };

  var handleInputChange = function handleInputChange(width) {
    setToolPxWidth(width);
  };

  var handleInputBlur = function handleInputBlur(width) {
    setToolPxWidth(width);
    emit(toolWidthChangeEvent, width);
  };

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    setToolPxWidthAsString(toolPxWidth);
    emit(toolWidthChangeEvent, toolPxWidth);
  };

  var handlePresetClick = function handlePresetClick(presetId) {
    var preset = (0, _utils.getArrayItemByValue)(presetWidths, presetId);
    var randomWidthWithinRange = (0, _utils.getRandomVal)(preset.min, preset.max);
    setToolPxWidthAsString(randomWidthWithinRange);
    emit(toolWidthChangeEvent, randomWidthWithinRange);
  };

  var handleFullClick = function handleFullClick() {
    setToolPxWidthAsString(maxWidth);
    emit(toolWidthChangeEvent, maxWidth);
  };

  var emit = (0, _api.useChannel)((_useChannel = {}, _defineProperty(_useChannel, wrapperWidthChangeEvent, handleWrapperWidthChange), _defineProperty(_useChannel, wrapperMaxWidthChangeEvent, handleMaxWidthChange), _useChannel));

  var setToolPxWidthAsString = function setToolPxWidthAsString(width) {
    return setToolPxWidth(width.toString());
  };

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_components.Separator, null), _react["default"].createElement("form", {
    onSubmit: handleSubmit,
    style: {
      alignItems: 'center',
      display: 'flex'
    }
  }, _react["default"].createElement("div", {
    className: "taffy-field"
  }, _react["default"].createElement("input", {
    id: "px-input",
    onChange: function onChange(e) {
      return handleInputChange(e.target.value);
    },
    onBlur: function onBlur(e) {
      return handleInputBlur(e.target.value);
    },
    value: toolPxWidth,
    autoComplete: "off",
    maxLength: "5",
    style: {
      fontSize: '0.75rem',
      height: '1.375rem',
      width: '3.125rem'
    }
  }), _react["default"].createElement("label", {
    htmlFor: "px-input",
    style: {
      fontSize: '12px'
    }
  }, "PX")), _react["default"].createElement("div", {
    className: "taffy-field",
    style: {
      marginLeft: '0.75rem'
    }
  }, _react["default"].createElement("input", {
    id: "em-input",
    onChange: function onChange(e) {
      return handleInputChange((0, _utils.getPxFromEm)(e.target.value));
    },
    onBlur: function onBlur(e) {
      return handleInputBlur((0, _utils.getPxFromEm)(e.target.value));
    },
    value: (0, _utils.getEmFromPx)(toolPxWidth),
    autoComplete: "off",
    maxLength: "5",
    style: {
      fontSize: '0.75rem',
      height: '1.375rem',
      width: '3.125rem'
    }
  }), _react["default"].createElement("label", {
    htmlFor: "em-input",
    style: {
      fontSize: '12px'
    }
  }, "EM")), _react["default"].createElement("button", {
    type: "submit",
    style: {
      clip: 'rect(1px, 1px, 1px, 1px)',
      height: '1px',
      overflow: 'hidden',
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: '1px'
    }
  }, "Submit")), presetWidths.map(function (_ref) {
    var id = _ref.id,
        title = _ref.title,
        label = _ref.label;
    return _react["default"].createElement(_components.Button, {
      key: id,
      title: title,
      onClick: function onClick() {
        return handlePresetClick(id);
      },
      type: "button",
      style: {
        color: '#999',
        paddingLeft: '15px',
        paddingRight: 0
      }
    }, label);
  }), _react["default"].createElement(_components.Button, {
    onClick: handleFullClick,
    title: "Full",
    type: "button",
    style: {
      color: '#999',
      paddingLeft: '15px',
      paddingRight: 0
    }
  }, "Full"));
};

var addChannel = function addChannel(api) {
  _addons.addons.add(panelId, _objectSpread({}, _constants["default"], {
    match: function match(_ref2) {
      var viewMode = _ref2.viewMode;
      return viewModes.includes(viewMode);
    },
    render: function render() {
      return _react["default"].createElement(TaffyTool, null);
    }
  }));
};

_addons.addons.register(addonId, addChannel);