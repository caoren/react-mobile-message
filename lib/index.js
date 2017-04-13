'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _toast = require('./toast');

var _toast2 = _interopRequireDefault(_toast);

var _alert = require('./alert');

var _alert2 = _interopRequireDefault(_alert);

var _confirm = require('./confirm');

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { toast: _toast2.default, alert: _alert2.default, confirm: _confirm2.default };
//components

module.exports = exports['default'];