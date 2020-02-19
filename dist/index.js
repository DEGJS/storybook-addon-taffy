"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTaffy = void 0;

var _react = _interopRequireWildcard(require("react"));

var _addons = require("@storybook/addons");

var _reResizable = require("re-resizable");

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var minWrapperWidth = _constants["default"].minWrapperWidth,
    resizeHandleWidth = _constants["default"].resizeHandleWidth,
    wrapperWidthChangeEvent = _constants["default"].wrapperWidthChangeEvent,
    wrapperMaxWidthChangeEvent = _constants["default"].wrapperMaxWidthChangeEvent,
    toolWidthChangeEvent = _constants["default"].toolWidthChangeEvent;

var TaffyWrapper = function TaffyWrapper(_ref) {
  var children = _ref.children;
  var isMounted = false;

  var channel = _addons.addons.getChannel();

  var wrapperEl = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)('100%'),
      _useState2 = _slicedToArray(_useState, 2),
      wrapperWidth = _useState2[0],
      setWrapperWidth = _useState2[1];

  (0, _react.useLayoutEffect)(function () {
    isMounted = true;

    if (wrapperEl) {
      var maxWidth = wrapperEl.current.getBoundingClientRect().toJSON().width;
      channel.emit(wrapperMaxWidthChangeEvent, maxWidth);
      setWrapperWidth(wrapperEl.current.getBoundingClientRect().toJSON().width);
    }

    channel.on(toolWidthChangeEvent, handleToolWidthChange);
    channel.emit(wrapperWidthChangeEvent, wrapperWidth);
    return function () {
      channel.off(toolWidthChangeEvent);
      isMounted = false;
    };
  }, [wrapperEl.current]);

  var handleResize = function handleResize(width) {
    channel.emit(wrapperWidthChangeEvent, width);
  };

  var handleResizeStop = function handleResizeStop(width) {
    if (width < minWrapperWidth) {
      width = minWrapperWidth;
    }

    channel.emit(wrapperWidthChangeEvent, width);
    setWrapperWidth(width);
  };

  var handleToolWidthChange = function handleToolWidthChange(width) {
    if (isMounted) {
      setWrapperWidth(parseInt(width));
    }
  };

  return _react["default"].createElement("div", {
    style: {
      paddingRight: resizeHandleWidth
    }
  }, _react["default"].createElement(_reResizable.Resizable, {
    onResize: function onResize(e, direction, ref, d) {
      return handleResize(wrapperWidth + d.width);
    },
    onResizeStop: function onResizeStop(e, direction, ref, d) {
      return handleResizeStop(wrapperWidth + d.width);
    },
    size: {
      width: wrapperWidth,
      height: '100%'
    },
    style: {
      backgroundColor: '#fff',
      position: 'relative',
      left: '50%',
      height: '100%',
      transform: 'translateX(-50%)'
    },
    handleStyles: {
      right: {
        backgroundColor: '#ccc',
        display: 'block',
        height: '100%',
        position: 'absolute',
        right: "-".concat(resizeHandleWidth),
        top: 0,
        width: resizeHandleWidth
      }
    },
    enable: {
      top: false,
      right: true,
      bottom: false,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false
    }
  }, _react["default"].createElement("div", {
    ref: wrapperEl
  }, children)));
};

var withTaffy = (0, _addons.makeDecorator)({
  name: 'withSitecoreProps',
  allowDeprecatedUsage: false,
  wrapper: function wrapper(getStory, context) {
    var story = getStory(context);
    return _react["default"].createElement(TaffyWrapper, null, story);
  }
});
exports.withTaffy = withTaffy;