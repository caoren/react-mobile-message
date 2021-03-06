'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = alert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var empty = undefined;
var DefaultOptions = {
    title: empty,
    content: empty,
    animation: empty,
    btons: []
};
function alert() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var tempDiv = document.createElement('div');
    document.body.appendChild(tempDiv);
    var tobj = {};
    for (var p in DefaultOptions) {
        if (p != 'btons') {
            tobj[p] = option[p] || DefaultOptions[p];
        } else {
            tobj[p] = [{
                label: option.doneLabel || '确定',
                func: option.done
            }];
        }
    }
    var props = _extends({}, tobj, {
        container: tempDiv
    });
    _reactDom2.default.render(_react2.default.createElement(_modal2.default, props), tempDiv);
}
module.exports = exports['default'];