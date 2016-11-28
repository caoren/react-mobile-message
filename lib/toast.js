'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = toast;

require('../assets/toast.less');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ENTERTIME = 300;
var LEAVETIME = 300;

var Toast = function (_Component) {
    _inherits(Toast, _Component);

    function Toast(props) {
        _classCallCheck(this, Toast);

        var _this = _possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).call(this, props));

        _this.state = {
            show: true
        };
        return _this;
    }

    _createClass(Toast, [{
        key: 'close',
        value: function close() {
            var _this2 = this;

            window.setTimeout(function () {
                _this2.setState({
                    show: false
                });
                window.setTimeout(function () {
                    _this2.teardown();
                }, LEAVETIME);
            }, this.props.timeout);
        }
    }, {
        key: 'teardown',
        value: function teardown() {
            var container = this.props.container;
            _reactDom2.default.unmountComponentAtNode(container);
            container.parentNode.removeChild(container);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.close();
        }
    }, {
        key: 'render',
        value: function render() {
            var show = this.state.show;
            var text = this.props.text;

            var toastNode;
            if (show) {
                toastNode = _react2.default.createElement(
                    'div',
                    { className: 'c-toast' },
                    text
                );
            }
            return _react2.default.createElement(
                _reactAddonsCssTransitionGroup2.default,
                { component: 'div', transitionName: 'toastmask', transitionEnterTimeout: ENTERTIME, transitionAppear: true, transitionAppearTimeout: ENTERTIME, transitionLeaveTimeout: LEAVETIME },
                toastNode
            );
        }
    }]);

    return Toast;
}(_react.Component);

Toast.propTypes = {
    container: _react.PropTypes.object.isRequired,
    text: _react.PropTypes.string.isRequired,
    timeout: _react.PropTypes.number
};
Toast.defaultProps = {
    timeout: 2000
};
function toast(text, timeout) {
    var tempDiv = document.createElement('div');
    document.body.appendChild(tempDiv);
    var props = {
        container: tempDiv,
        text: text
    };
    if (timeout) {
        props.timeout = timeout;
    }
    _reactDom2.default.render(_react2.default.createElement(Toast, props), tempDiv);
}